import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "pylib"))
import fitz

src = sys.argv[1]
out = sys.argv[2]
pages = [int(p) for p in sys.argv[3].split(",")] if len(sys.argv) > 3 else None
doc = fitz.open(src)
print("pages:", doc.page_count, "meta:", doc.metadata)
for i in range(doc.page_count):
    if pages and (i + 1) not in pages:
        continue
    pix = doc[i].get_pixmap(dpi=110)
    pix.save(os.path.join(out, f"{os.path.basename(src)[:-4]}-p{i+1}.png"))
