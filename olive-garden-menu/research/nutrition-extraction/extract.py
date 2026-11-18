"""Extract every row of the official Olive Garden U.S. nutrition guide and
allergen guide into JSON, using word positions (PyMuPDF). Research tool only."""
import sys, os, json, re
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "pylib"))
import pymupdf as fitz

SRC = sys.argv[1]  # folder with the PDFs
OUT = sys.argv[2]  # output folder

NUT_COLS = ["calories", "caloriesFromFat", "totalFat", "saturatedFat", "transFat", "cholesterol", "sodium",
            "totalCarbohydrates", "dietaryFiber", "sugars", "protein"]
NUT_HEAD = ["Calorie", "Cal.", "Total", "Sat", "Trans", "Cholester", "Sodium", "Total", "Dietary", "Sugars", "Protein"]
ALG_COLS = ["friedInSoyOil", "grilled", "dairy", "eggs", "fish", "crustacean", "mollusk", "treeNuts", "peanuts",
            "wheat", "gluten", "soy", "sesame", "sulfites"]
ALG_HEAD = ["Fried", "Grilled", "Dairy", "Eggs", "Fish", "Crustacean", "Mollusk", "Tree", "Peanuts", "Wheat",
            "Gluten", "Soy", "Sesame", "Sulfites"]
VALUE_TOKENS = re.compile("^(\d+(\.\d+)?|less|than|g|1g|Y|●|•|)$")


def lines_of(words, tol=3.0):
    """Group words into lines by their vertical center."""
    words = sorted(words, key=lambda w: ((w[1] + w[3]) / 2, w[0]))
    lines = []
    for w in words:
        yc = (w[1] + w[3]) / 2
        if lines and abs(lines[-1]["y"] - yc) <= tol:
            lines[-1]["words"].append(w)
        else:
            lines.append({"y": yc, "words": [w]})
    for ln in lines:
        ln["words"].sort(key=lambda w: w[0])
        ln["text"] = " ".join(w[4] for w in ln["words"])
    return lines


def column_centers(page_words, heads, y_max):
    """x centers of the header labels (first occurrence of each label, left to right)."""
    hdr = [w for w in page_words if w[1] < y_max]
    centers, used = [], set()
    for h in heads:
        cands = [w for w in hdr if w[4] == h and id(w) not in used]
        cands.sort(key=lambda w: w[0])
        # choose the leftmost unused candidate right of the previous column
        prev = centers[-1] if centers else -1
        cands = [w for w in cands if (w[0] + w[2]) / 2 > prev + 2]
        if not cands:
            return None
        c = cands[0]
        used.add(id(c))
        centers.append((c[0] + c[2]) / 2)
    return centers


def nearest(centers, x):
    return min(range(len(centers)), key=lambda i: abs(centers[i] - x))


def is_value_line(ln):
    return all(VALUE_TOKENS.match(w[4]) for w in ln["words"])


def is_section(ln):
    t = ln["text"]
    letters = re.sub(r"[^A-Za-z]", "", t)
    return len(letters) >= 3 and letters.isupper() and not is_value_line(ln) and t not in ("Y",)


def parse(path, kind):
    doc = fitz.open(path)
    rows = []
    section = None
    pending_name = []
    pending_page = None
    for pno in range(doc.page_count):
        page = doc[pno]
        words = [w[:5] for w in page.get_text("words")]
        if kind == "nutrition":
            head_line = [w for w in words if w[4] in ("Calorie",)]
            if not head_line:
                continue
            y_head = max(w[3] for w in words if w[4] in ("Protein",) and w[1] < head_line[0][3] + 40) + 30
            centers = column_centers(words, NUT_HEAD, y_head)
            cols, heads = NUT_COLS, NUT_HEAD
        else:
            sul = [w for w in words if w[4] == "Sulfites"]
            if not sul:
                continue
            y_head = max(w[3] for w in sul) + 2
            centers = column_centers(words, ALG_HEAD, y_head)
            cols = ALG_COLS
        if centers is None:
            print("no header on page", pno + 1, kind, file=sys.stderr)
            continue
        body = [w for w in words if w[1] > y_head]
        lines = lines_of(body)
        last_name_y = None
        cur = None
        first_body_line = True
        for ln in lines:
            t = ln["text"]
            if re.fullmatch(r"US_\d+", t) or re.fullmatch(r"\d+", t) and ln["words"][0][0] > 250 and len(ln["words"]) == 1 and kind == "x":
                continue
            if re.fullmatch(r"US_\d+", t):
                continue
            if first_body_line:
                first_body_line = False
                if pending_name and not is_value_line(ln):
                    rows.append({"page": pending_page, "section": section, "label": " ".join(pending_name), "cells": {}, "emptyRow": True})
                    pending_name = []
            if is_value_line(ln):
                if cur is None and pending_name:
                    cur = {"page": pending_page, "section": section, "label": " ".join(pending_name), "cells": {}}
                    rows.append(cur)
                    pending_name = []
                if cur is None:
                    continue
                for w in ln["words"]:
                    ci = nearest(centers, (w[0] + w[2]) / 2)
                    cur["cells"].setdefault(cols[ci], []).append(w[4])
                continue
            # text line: section header or (part of) an item name
            cur = None
            if is_section(ln) and ln["words"][0][0] < 200:
                if pending_name:
                    rows.append({"page": pending_page, "section": section, "label": " ".join(pending_name), "cells": {}, "emptyRow": True})
                section = t
                pending_name = []
                last_name_y = None
            else:
                # A big gap since the previous name line = that item had an empty
                # value/mark row (e.g. no allergens): close it as its own row.
                if pending_name and last_name_y is not None and ln["y"] - last_name_y > 28:
                    rows.append({"page": pending_page, "section": section, "label": " ".join(pending_name), "cells": {}, "emptyRow": True})
                    pending_name = []
                if not pending_name:
                    pending_page = pno + 1
                pending_name.append(t)
                last_name_y = ln["y"]
    if pending_name:
        rows.append({"page": pending_page, "section": section, "label": " ".join(pending_name), "cells": {}, "emptyRow": True})
    return rows


SUBHEAD = "Lunch Sandwiches & Flatbreads (where available) "


def strip_subhead(rows):
    for r in rows:
        if r["label"].startswith(SUBHEAD):
            r["label"] = r["label"][len(SUBHEAD):]
            r["subheading"] = SUBHEAD.strip()
    return rows


def clean_nutrition(rows):
    out = []
    for r in strip_subhead(rows):
        vals = {}
        for c in NUT_COLS:
            toks = r["cells"].get(c)
            if not toks:
                vals[c] = None
                continue
            s = " ".join(toks)
            m = re.fullmatch(r"less than (\d+(?:\.\d+)?) ?(?:g|mg)?", s)
            if m:
                vals[c] = {"lessThan": float(m.group(1)) if "." in m.group(1) else int(m.group(1))}
            elif re.fullmatch(r"\d+(\.\d+)?", s):
                vals[c] = float(s) if "." in s else int(s)
            else:
                vals[c] = {"raw": s}
        if r.get("emptyRow"):
            print("nutrition empty row (subheading?):", r["page"], r["label"], file=sys.stderr)
            continue
        out.append({"page": r["page"], "section": r["section"], "label": r["label"], "values": vals})
    return out


def clean_allergen(rows):
    out = []
    for r in strip_subhead(rows):
        marks = {c: bool(r["cells"].get(c)) for c in ALG_COLS}
        raw = {c: r["cells"][c] for c in r["cells"]}
        out.append({"page": r["page"], "section": r["section"], "label": r["label"], "marks": marks, "raw": raw, "emptyRow": bool(r.get("emptyRow"))})
    return out


nut = clean_nutrition(parse(os.path.join(SRC, "olive_garden_nutrition.pdf"), "nutrition"))
alg = clean_allergen(parse(os.path.join(SRC, "allergen_guide.pdf"), "allergen"))
json.dump(nut, open(os.path.join(OUT, "nutrition_rows.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
json.dump(alg, open(os.path.join(OUT, "allergen_rows.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("nutrition rows:", len(nut), "allergen rows:", len(alg))
