# Missing Food Images

**Audit date:** 2026-11-13 (Lesson 7.3 final, after the owner's AI images in `image-staging/missing-images/`)
**Scope:** every card on the homepage `/` (all 17 categories + Popular Menu Items). Live list of all image files: `IMAGE_MANIFEST.md`.

## Summary

| Measure | Count |
|---|---:|
| AI images supplied by the owner (`image-staging/missing-images/`) | 25 |
| Integrated | **24** of the first 25 (Homemade Soups trio retired) + 4 soup photos and 1 composite (2026-11-14) |
| Of these, match the official dish | 14 |
| Of these, differ from the official dish (used by owner decision, 2026-11-13) | 10 in use (section A; item 5 removed) |
| Products still without an image | **4** (incorrect images removed 2026-11-14, section 00) |
| "Photo coming soon" placeholders on the homepage | **6** (section 00; the 5 Homemade Soups placeholders were replaced on 2026-11-14) |
| Broken images on the homepage | 0 |

**Owner decision (2026-11-13):** "use the images I supplied". The 11 images in section A are used although they differ from the official dish. The "AI image" card label was removed by owner decision; since 2026-11-14 the public site does not mention AI at all (owner decision); the homepage only says the photos are supplied by the site owner and are not official Olive Garden photos. A corrected image can replace any of them later under the same file name; the prompts below are kept for that.

**Hero image (checked):** `public/images/home/olive-garden-menu-spread.webp`, 1200 × 800 WebP, 98 KB, owner photo, HTTP 200, preloaded, alt text set. No action needed.

## Requirements for every image

| Item | Requirement |
|---|---|
| Delivered size | At least **1200 × 900 px** (4:3 landscape); 1600 × 1200 preferred |
| Website file | **600 × 450 px WebP**, 30–80 KB (optimized by us, one compression pass) |
| File name / folder | Exactly as listed per item (`public/images/<folder>/<file>.webp`) |
| Content | Only the official dish and portion described; no extra dishes, no extra pieces, no different side pasta |
| Not allowed | Text, logos, watermarks, menus, people's faces, Olive Garden branding |
| Background | Clean pure white (#FFFFFF) preferred |
| AI-generated images | Allowed by the owner. Listed in `IMAGE_MANIFEST.md`; no card label (owner decision) |

### Shared style text (add to every prompt)

> Photorealistic professional food photography, 4:3 landscape, 45-degree angle, soft natural daylight, sharp focus on the food, appetizing realistic colors, served on plain white restaurant dinnerware, clean pure white background (#FFFFFF), no text, no logo, no watermark, no people, no extra food items.

The prompts below are updated with what went wrong in the supplied AI image ("Avoid").

## 00. Incorrect images removed (owner decision 2026-11-14): replacements needed

Found in the Batch 4 image audit. The image mapping was removed in `content/menu/products.ts` (`image: null`, reason in `imageIssue`), so every card shows the "Photo coming soon" placeholder with the same size; prices, calories, descriptions, and ratings are unchanged. The old files stay in `public/` (unused) until the owner approves deleting them. **The owner supplies the replacements.** Save each new photo under the recommended filename, set `image` again in `products.ts` (and `imageIssue: null`), then update this file and `IMAGE_MANIFEST.md`.

| # | Product (ID) | Current incorrect image | Why it must be replaced | Correct image needed | Recommended filename | Affected pages |
|---:|---|---|---|---|---|---|
| 1 | Grilled Chicken Parmigiana, gluten-sensitive (`grilled-chicken-parmigiana`) | `/images/gluten-sensitive/grilled-chicken-parmigiana.webp` | Shows fettuccine in a cream sauce. The gluten-sensitive dish comes with gluten-free rotini in marinara; the photo could mislead guests avoiding gluten. **Highest priority.** | Two grilled (not breaded) chicken breasts topped with marinara and melted Italian cheeses, with spiral gluten-free rotini in marinara on the side. No fettuccine, no cream sauce, no bread. | `public/images/gluten-sensitive/grilled-chicken-parmigiana.webp` | Homepage (Gluten Sensitive section, 1 card); `/gluten-sensitive` (price table row) |
| 2 | 6 oz. Sirloin (`6-oz-sirloin`, shared by the classic and gluten-sensitive plates) | `/images/classic-entrees/6-oz-sirloin.webp` | Shows broccoli and mashed potatoes. The classic plate comes with fettuccine alfredo and the gluten-sensitive plate with parmesan garlic broccoli; mashed potatoes come with neither. | A grilled 6 oz sirloin with garlic herb butter and a side of parmesan garlic broccoli (matches the gluten-sensitive plate; a separate photo with fettuccine alfredo could be added later for the classic plate). No mashed potatoes. | `public/images/classic-entrees/6-oz-sirloin.webp` | Homepage (Classic Entrees and Gluten Sensitive sections, 2 cards); `/classic-entrees` and `/gluten-sensitive` (price table rows) |
| 3 | Herb-Grilled Salmon (`herb-grilled-salmon`, shared by the classic and gluten-sensitive menus) | `/images/classic-entrees/herb-grilled-salmon.webp` | Shows mashed potatoes; the official plate comes with parmesan garlic broccoli only. | A grilled salmon fillet topped with garlic herb butter, with parmesan garlic broccoli on the side. No mashed potatoes, no pasta. | `public/images/classic-entrees/herb-grilled-salmon.webp` | Homepage (Classic Entrees and Gluten Sensitive sections, 2 cards); `/classic-entrees` (was a photo card, now replaced by Shrimp Scampi) and `/gluten-sensitive` (price table rows) |
| 4 | Lasagna Combination, catering (`lasagna-combination`) | `/images/catering/lasagna-combination.webp` | Shows chicken parmigiana, which is not part of this package. | A catering spread with a pan of Lasagna Classico, a pan of Five Cheese Ziti al Forno or Fettuccine Alfredo, two jumbo house salads, breadsticks, a gallon of iced tea, and a whole cake. No chicken parmigiana. | `public/images/catering/lasagna-combination.webp` | Homepage (Catering section, 1 card); `/catering` (price table row) |

Placeholders now on the homepage: **6** cards (1 + 2 + 2 + 1).

**Reviewed and kept (minor differences, optional replacement):** most kids meal photos show carrots next to the side (official kids sides: grapes, broccoli, spaghetti with tomato sauce, mashed potatoes, french fries); the main dishes are correct. Kids Chicken Fingers also shows vegetable sticks. Earlier optional notes (Side of Meatballs, 2-Liter Soda, Warm Italian Doughnuts, Cappuccino) are in `CATEGORY_DEVELOPMENT_CHECKLIST.md` (Batch 3).

## 0. Homemade Soups replacement: done (2026-11-14)

- **2026-11-13 (Option B):** the old AI image showed a cheese soup with bacon that is not on the menu; it was removed from every card and replaced by the "Photo coming soon" placeholder.
- **2026-11-14:** the owner supplied one photo per soup (Minestrone, Pasta e Fagioli, Zuppa Toscana, Chicken & Gnocchi; originals in `image-staging/Soups, salad and breadsticks/four-soups-2026-11-14/`). They were converted to WebP (600 × 450, 51-53 KB each) and combined into a 2×2 composite, `homemade-soups-four.webp` (800 × 600, 101 KB), now used on all 5 Homemade Soups cards. The four single photos are shown as a soup gallery on `/soups-salad-and-breadsticks`, and the Homemade Soups photo card is back on that page.
- **Placeholders left:** 0.
- **Notes for the owner (optional replacement):** the Zuppa Toscana photo shows bacon pieces, and the Chicken & Gnocchi photo looks like a thick dish with sliced chicken on top; neither detail is in our verified descriptions. The alt text describes what each photo actually shows.
- **Old file:** `homemade-soups.webp` is no longer used and stays in `public/` until the owner approves deleting it.

## A. Integrated, but different from the official dish (11 products, optional replacement)

### 1. Chicken Parmigiana
- **Categories:** Classic Entrees, Popular Menu Items, Lighter Portions, Lunch Menu, Buy One Take One (reference entry), Family-Style Meals (pan), Catering (pan). 6 menu cards + 1 Popular card.
- **File:** `chicken-parmigiana.webp` → `public/images/classic-entrees/`
- **Correct appearance:** **two** parmesan-breaded chicken breasts topped with marinara and melted Italian cheeses, with a **side of spaghetti** in marinara.
- **AI image used (differs):** `Golden Chicken Parmigiana with Creamy Fettuccine.png`: one breast, with fettuccine alfredo.
- **Prompt:** "Two parmesan-breaded fried chicken breasts topped with marinara sauce and bubbly melted mozzarella, with a side of spaghetti in red marinara sauce, on a white dinner plate." + shared style. **Avoid:** fettuccine, alfredo or white cream sauce, only one chicken breast.

### 2. Family-Style Chicken Parmigiana Bundle
- **Category:** Family-Style Meals (1 card)
- **File:** `family-style-chicken-parmigiana-bundle.webp` → `public/images/family-style-meals/`
- **Correct appearance (serves 4–6):** a pan of breaded chicken parmigiana with marinara and melted cheese, a pan of **spaghetti with marinara**, a jumbo house salad, 12 breadsticks.
- **AI image used (differs):** `Family Chicken Parmesan Feast.png`: shows fettuccine alfredo instead of spaghetti with marinara.
- **Prompt:** "A family-style take-home dinner: a rectangular pan of breaded chicken parmigiana cutlets topped with marinara and melted mozzarella, a second pan of spaghetti in red marinara sauce, a large bowl of Italian house salad with croutons, black olives, tomatoes and pepperoncini, and a basket of twelve garlic breadsticks." + shared style. **Avoid:** fettuccine, alfredo sauce.

### 3. Family-Style Five Cheese Ziti al Forno Bundle
- **Category:** Family-Style Meals (1 card)
- **File:** `family-style-five-cheese-ziti-al-forno-bundle.webp` → `public/images/family-style-meals/`
- **Correct appearance (serves 4–6):** a pan of baked ziti in five cheese marinara with a browned cheese crust, a jumbo house salad, 12 breadsticks. Nothing else.
- **AI image used (differs):** `Baked Ziti Feast with Classic Sides.png`: has an extra bowl of fettuccine alfredo that is not part of this bundle.
- **Prompt:** "A family-style take-home dinner with exactly three parts: a large rectangular pan of baked ziti pasta in five cheese marinara with a golden browned melted cheese top, a large bowl of Italian house salad with croutons, black olives, tomatoes and pepperoncini, and a basket of twelve garlic breadsticks." + shared style. **Avoid:** any other pasta dish, fettuccine, alfredo.

### 4. Grilled Chicken Parmigiana (gluten-sensitive) (REMOVED 2026-11-14: see section 00)
- **Category:** Gluten Sensitive (1 card)
- **File:** `grilled-chicken-parmigiana.webp` → `public/images/gluten-sensitive/`
- **Correct appearance:** grilled (not breaded) chicken breasts topped with marinara and melted Italian cheeses, with **gluten-free rotini** in marinara.
- **AI image used (differs):** `Grilled Chicken Parmigiana with Alfredo Fettuccine.png`: fettuccine alfredo (wrong pasta for a gluten-sensitive dish).
- **Prompt:** "Two grilled chicken breasts with grill marks, not breaded, topped with marinara sauce and melted mozzarella, served with spiral rotini pasta in red marinara sauce on a white dinner plate." + shared style. **Avoid:** fettuccine, spaghetti, alfredo, breading.

### 5. Homemade Soups (REPLACED 2026-11-14 with owner photos: see section 0)
- **Categories:** Soups, Salad and Breadsticks (one serving); Family-Style Meals and Catering (half gallon and gallon). 5 cards.
- **File:** `homemade-soups.webp` → `public/images/soups-salad-and-breadsticks/`
- **Correct appearance:** the **four** official soups in four bowls: Pasta e Fagioli, Zuppa Toscana, Minestrone, Chicken & Gnocchi.
- **AI image used (differs):** `Trio of Homemade Soups with Garnishes.png`: three soups; one is a loaded potato soup (not on the menu); Pasta e Fagioli and Zuppa Toscana are missing.
- **Prompt:** "Four white soup bowls in a row: Pasta e Fagioli with white and red beans, small tubetti pasta, ground beef and tomatoes in broth; Zuppa Toscana with spicy Italian sausage, russet potatoes and kale in a creamy broth; Minestrone with vegetables, beans and pasta in tomato broth; Chicken and Gnocchi soup with roasted chicken, gnocchi and spinach in a creamy broth." + shared style. **Avoid:** cheddar, bacon, loaded potato soup, fewer than four bowls.

### 6. Italian Grilled Chicken Sandwich
- **Category:** Lunch Menu (1 card)
- **File:** `italian-grilled-chicken-sandwich.webp` → `public/images/lunch-menu/`
- **Correct appearance:** **garlic knot bun** with a grilled chicken breast, mozzarella, sliced tomatoes, pepperoncini, lettuce and dressing; **french fries** on the side.
- **AI image used (differs):** `Italian Grilled Chicken Sandwich.png`: ciabatta with arugula and roasted red peppers, no fries.
- **Prompt:** "An Italian grilled chicken sandwich on a round, toasted garlic knot bun with herbs, filled with a grilled chicken breast, melted mozzarella, fresh tomato slices, pepperoncini, crisp green lettuce and a light Italian dressing, with a side of golden french fries on a white plate." + shared style. **Avoid:** ciabatta, arugula, roasted red peppers, a plate without fries.

### 7. Italian Meatballs (catering)
- **Category:** Catering (1 card)
- **File:** `italian-meatballs.webp` → `public/images/catering/`
- **Correct appearance:** a catering tray with **10** Italian meatballs.
- **AI image used (differs):** `Rustic Italian Meatballs with Parmesan.png`: five meatballs in a bowl.
- **Prompt:** "A rectangular aluminum catering tray holding exactly ten Italian meatballs in two rows of five, in marinara sauce, lightly sprinkled with grated parmesan and parsley." + shared style. **Avoid:** a bowl, fewer than ten meatballs.

### 8. Meatballs Parmigiana
- **Category:** Appetizers (1 card)
- **File:** `meatballs-parmigiana.webp` → `public/images/appetizers/` (the current file there is the old, incorrect photo; replace it)
- **Correct appearance:** **five** meatballs baked in marinara, topped with melted Italian cheeses and toasted breadcrumbs.
- **AI image used (differs):** `Golden Meatball Parmigiana Bake.png`: four meatballs.
- **Prompt:** "Exactly five meatballs (four around one in the center) baked in marinara sauce in a white oval baking dish, topped with melted mozzarella and a crunchy layer of toasted breadcrumbs." + shared style. **Avoid:** four or six meatballs.

### 9. Shrimp Fritto Misto
- **Category:** Appetizers (1 card)
- **File:** `shrimp-fritto-misto.webp` → `public/images/appetizers/` (replace the old file)
- **Correct appearance:** hand-breaded fried shrimp with fried **onion and bell pepper strips**; cups of **marinara** and **spicy ranch**.
- **AI image used (differs):** `Golden Shrimp Fritto Misto Feast.png`: calamari rings and zucchini, one creamy sauce.
- **Prompt:** "A generous pile of lightly breaded fried shrimp mixed with fried onion strips and red and green bell pepper strips, with one small cup of red marinara and one small cup of orange spicy ranch dipping sauce on a white plate." + shared style. **Avoid:** calamari rings, zucchini, lemon-only garnish.

### 10. Side of Meatballs
- **Category:** Sides, Sauces and Extras (1 card)
- **File:** `side-of-meatballs.webp` → `public/images/sides-sauces-and-extras/`
- **Correct appearance:** **three** meatballs in marinara in a small side dish.
- **AI image used (differs):** `Parmesan Meatballs in Marinara Sauce.png`: four meatballs.
- **Prompt:** "Exactly three Italian meatballs in marinara sauce in a small white side dish, sprinkled with grated parmesan." + shared style. **Avoid:** four or more meatballs, pasta.

### 11. Spicy Alfredo Fettuccine
- **Categories:** Classic Entrees, Lighter Portions, Lunch Menu (3 cards)
- **File:** `spicy-alfredo-fettuccine.webp` → `public/images/classic-entrees/`
- **Correct appearance:** fettuccine in alfredo sauce with visible red Calabrian pepper flakes (slightly orange-tinted sauce). No chicken.
- **AI image used (differs):** `Spicy Chicken Alfredo Fettuccine.png`: sliced chicken on top.
- **Prompt:** "Fettuccine in a creamy alfredo sauce with a light orange tint from Calabrian chili peppers, visible red pepper flakes and a sprinkle of parmesan, in a white pasta bowl, pasta only." + shared style. **Avoid:** chicken, shrimp or any meat.

## B. AI images that match the official dish (14 products)

All are 600 × 450 WebP. Details and alt text: `IMAGE_MANIFEST.md`.

| Product | File | Cards | Owner review note |
|---|---|---:|---|
| Chicken Alfredo Flatbread | `lunch-menu/chicken-alfredo-flatbread.webp` | 1 | |
| Chicken Parmigiana Sandwich | `lunch-menu/chicken-parmigiana-sandwich.webp` | 1 | |
| Classic Pepperoni Flatbread | `lunch-menu/classic-pepperoni-flatbread.webp` | 1 | |
| Eggplant Parmigiana Sandwich | `lunch-menu/eggplant-parmigiana-sandwich.webp` | 1 | |
| Five Cheese Flatbread | `lunch-menu/five-cheese-flatbread.webp` | 1 | |
| Spaghetti & Meatballs (lunch, lighter) | `lunch-menu/spaghetti-and-meatballs-two-meatballs.webp` | 2 | Table scene, not white. The entrée card keeps the 3-meatball photo |
| Family-Style Chicken Alfredo Bundle | `family-style-meals/family-style-chicken-alfredo-bundle.webp` | 1 | About 6 breadsticks visible (bundle has 12); extra alfredo sauce container not shown |
| Seafood Alfredo | `classic-entrees/seafood-alfredo.webp` | 2 | Table scene, not white |
| Pumpkin Cookie Butter Cheesecake | `desserts/pumpkin-cookie-butter-cheesecake.webp` | 2 | Slice; also shown for the catering whole/half cake |
| Half Iced Tea + Half Lemonade | `drink-menu/half-iced-tea-and-half-lemonade.webp` | 2 | |
| Heineken 0.0 Non-Alcoholic | `wine-and-beer-to-go/heineken-0-0-non-alcoholic.webp` | 1 | Shows the Heineken brand label (the product sold) |
| Italian Sausage | `sides-sauces-and-extras/italian-sausage.webp` | 2 | 2 links (side); also shown for the catering tray of 8 sliced; marinara not shown |
| Side of Crispy Chicken Fritta | `sides-sauces-and-extras/side-of-crispy-chicken-fritta.webp` | 1 | Looks like more than one piece |
| Side of Crispy Shrimp Fritta | `sides-sauces-and-extras/side-of-crispy-shrimp-fritta.webp` | 1 | Shown with a cup of marinara and a lemon wedge |

## C. Damaged or incorrect supplied files (first batch)

| Supplied file (`image-staging/`) | Problem | Status |
|---|---|---|
| `Classic Entrees/Spaghetti & Meatballs.jpg` | Black damaged edges and four meatballs | Not used; no replacement needed |
| `Appetizers/Meatballs Parmigiana.webp` | Six meatballs (dish has five) | Replaced by the AI image (item 8) |
| `Appetizers/Shrimp Fritto Misto.webp` | Appears to include calamari | Replaced by the AI image (item 9) |
| `Classic Entrees/Chicken Parmigiana.webp` (same file in 6 folders) | One breast with fettuccine | AI image used (item 1) |
| `Gluten sensitive/Grilled Chicken Parmigiana.webp` | Spaghetti instead of gluten-free rotini | AI image used (item 4) |
| `Catering/Homemade Soups.webp`, `Homemade soups large.webp` | Six soups, two not on the menu | AI image used (item 5) |
| `Catering/Italian Meatballs.webp` | Six meatballs (order is ten) | AI image used (item 7) |
| `Sides, sauces and extras/Side of Meatballs.webp` | Five meatballs (side is three) | AI image used (item 10) |
| `Amazing Alfredos/Seafood Alfredo.jpg` | Includes mussels | Resolved by the AI image |
| `Sides, sauces and extras/Side of alfredo sauce (large).webp` | Shows pasta, not sauce | No action: the identical catering Alfredo sauce photo is used (alias A14) |
| `Catering/Rotini with Meat Sauce.webp` | No catering item with this name | No action unless the owner says where it belongs |

## D. Waiting for owner confirmation (in use, not missing)

- The 11 AI images in section A (differ from the official dish) and the notes in section B.
- `public/images/appetizers/calamari.webp`: fake checkerboard background was replaced with white.
- `public/images/drink-menu/2-liter-soda.webp`, `to-go-fountain-drinks.webp`, `wine-and-beer-to-go/heineken-0-0-non-alcoholic.webp`: show third-party drink brand labels.
- Backgrounds: the 15 white-background AI images have a pure #FFFFFF background. The 10 AI scene images and 110 of the earlier owner photos are table scenes (owner decision: used as they are); 8 earlier photos (including calamari) are white or near-white, not all exactly #FFFFFF.

## After new images arrive

1. Put the originals in `image-staging/missing-images/` (or `image-staging/<category>/`).
2. We check each one against the "Correct appearance" above, then optimize it to 600 × 450 WebP.
3. Set `image` on the product in `content/menu/products.ts` (with `aiGenerated: true` for AI images), clear `imageIssue`, and update `IMAGE_MANIFEST.md`.
