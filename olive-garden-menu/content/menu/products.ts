import type { MenuProduct } from "@/lib/types";

/**
 * Canonical products (one per dish/drink), shared by offerings in several
 * categories (146 = 130 inventory products + 16 new official items).
 * Imported from research/menu/menu-research.json (2026-11-12).
 *
 * `image`: owner photos integrated in Lesson 7.3 (2026-11-13), optimized to
 * 600 x 450 WebP from image-staging/ (docs/IMAGE_MANIFEST.md). Photos that
 * do not match the official dish are NOT used; the reason is in
 * `imageIssue` and the card shows a placeholder. `plannedImageSrc` is the
 * file path to use when a photo is added later.
 * Shared photos (alias decisions) point to the same file.
 * `aiGenerated: true` = AI-generated illustration supplied by the owner
 * (2026-11-13); recorded in the image manifest, no label on the card.
 */
export const menuProducts: MenuProduct[] = [
  {
    id: "family-style-lasagna-bundle",
    name: "Family-Style Lasagna Bundle",
    description: null,
    image: {
      src: "/images/classic-entrees/family-style-lasagna-bundle.webp",
      alt: "A pan of baked lasagna with bowls of salad and a basket of breadsticks on a table",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/family-style-lasagna-bundle.webp",
    imageIssue: null
  },
  {
    id: "famous-house-salad",
    name: "Our Famous Jumbo House Salad",
    description: null,
    image: {
      src: "/images/soups-salad-and-breadsticks/famous-house-salad.webp",
      alt: "A glass bowl of house salad with tomatoes, black olives, red onion, croutons, and pepperoncini",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/soups-salad-and-breadsticks/famous-house-salad.webp",
    imageIssue: null
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/chicken-alfredo.webp",
      alt: "Fettuccine in creamy alfredo sauce topped with sliced grilled chicken in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/chicken-alfredo.webp",
    imageIssue: null
  },
  {
    id: "chicken-parmigiana",
    name: "Chicken Parmigiana",
    description: null,
    image: {
      src: "/images/classic-entrees/chicken-parmigiana.webp",
      alt: "Breaded chicken parmigiana topped with marinara and melted mozzarella, served with fettuccine alfredo on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/classic-entrees/chicken-parmigiana.webp",
    imageIssue: null
  },
  {
    id: "fettuccine-alfredo",
    name: "Fettuccine Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/fettuccine-alfredo.webp",
      alt: "Fettuccine in creamy alfredo sauce sprinkled with parsley in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/fettuccine-alfredo.webp",
    imageIssue: null
  },
  {
    id: "shrimp-alfredo",
    name: "Shrimp Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/shrimp-alfredo.webp",
      alt: "Fettuccine in creamy alfredo sauce topped with sautéed shrimp in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/shrimp-alfredo.webp",
    imageIssue: null
  },
  {
    id: "five-cheese-ziti-al-forno",
    name: "Five Cheese Ziti al Forno",
    description: null,
    image: {
      src: "/images/classic-entrees/five-cheese-ziti-al-forno.webp",
      alt: "Baked ziti in marinara sauce topped with browned melted cheese in a white dish",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/five-cheese-ziti-al-forno.webp",
    imageIssue: null
  },
  {
    id: "spaghetti-with-meat-sauce",
    name: "Spaghetti with Meat Sauce",
    description: null,
    image: {
      src: "/images/classic-entrees/spaghetti-with-meat-sauce.webp",
      alt: "Spaghetti topped with meat sauce and grated cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/spaghetti-with-meat-sauce.webp",
    imageIssue: null
  },
  {
    id: "spaghetti-with-marinara-sauce",
    name: "Spaghetti with Marinara Sauce",
    description: null,
    image: {
      src: "/images/family-style-meals/spaghetti-with-marinara-sauce.webp",
      alt: "A large white bowl of spaghetti in marinara sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/family-style-meals/spaghetti-with-marinara-sauce.webp",
    imageIssue: null
  },
  {
    id: "chicken-tortelloni-alfredo",
    name: "Chicken Tortelloni Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/chicken-tortelloni-alfredo.webp",
      alt: "Tortelloni in alfredo sauce topped with sliced grilled chicken in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/chicken-tortelloni-alfredo.webp",
    imageIssue: null
  },
  {
    id: "lasagna-classico",
    name: "Lasagna Classico",
    description: null,
    image: {
      src: "/images/classic-entrees/lasagna-classico.webp",
      alt: "Baked lasagna with melted cheese in a white casserole dish, with one portion taken out",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/lasagna-classico.webp",
    imageIssue: null
  },
  {
    id: "chicken-scampi",
    name: "Chicken Scampi",
    description: null,
    image: {
      src: "/images/classic-entrees/chicken-scampi.webp",
      alt: "Thin pasta in a light garlic sauce topped with sliced chicken",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/chicken-scampi.webp",
    imageIssue: null
  },
  {
    id: "chicken-and-shrimp-carbonara",
    name: "Chicken and Shrimp Carbonara",
    description: null,
    image: {
      src: "/images/classic-entrees/chicken-and-shrimp-carbonara.webp",
      alt: "Creamy carbonara pasta with shrimp in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/chicken-and-shrimp-carbonara.webp",
    imageIssue: null
  },
  {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    description: null,
    image: {
      src: "/images/classic-entrees/shrimp-scampi.webp",
      alt: "Thin pasta with garlic shrimp and lemon slices in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/shrimp-scampi.webp",
    imageIssue: null
  },
  {
    id: "cheese-ravioli-with-meat-or-marinara-sauce",
    name: "Cheese Ravioli with Meat or Marinara Sauce",
    description: null,
    image: {
      src: "/images/family-style-meals/cheese-ravioli-with-meat-or-marinara-sauce.webp",
      alt: "A large dish of cheese ravioli in meat sauce topped with melted cheese",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/family-style-meals/cheese-ravioli-with-meat-or-marinara-sauce.webp",
    imageIssue: null
  },
  {
    id: "homemade-soups",
    name: "Homemade Soups",
    description: null,
    image: {
      src: "/images/soups-salad-and-breadsticks/homemade-soups.webp",
      alt: "Three bowls of soup: chicken and gnocchi, minestrone, and a creamy cheese soup with bacon and green onions",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/soups-salad-and-breadsticks/homemade-soups.webp",
    imageIssue: null
  },
  {
    id: "breadsticks",
    name: "Breadsticks",
    description: null,
    image: {
      src: "/images/appetizers/breadsticks.webp",
      alt: "Golden breadsticks with a garlic and herb topping in a wicker basket lined with a white napkin",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/breadsticks.webp",
    imageIssue: null
  },
  {
    id: "large-salad",
    name: "Large Salad",
    description: null,
    image: {
      src: "/images/family-style-meals/large-salad.webp",
      alt: "A large white bowl of garden salad with tomatoes, cucumbers, olives, red onion, and croutons",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/family-style-meals/large-salad.webp",
    imageIssue: null
  },
  {
    id: "fried-mozzarella",
    name: "Fried Mozzarella",
    description: null,
    image: {
      src: "/images/appetizers/fried-mozzarella.webp",
      alt: "Breaded fried mozzarella sticks on a white plate, one pulled apart to show melted cheese, with a cup of red dipping sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/fried-mozzarella.webp",
    imageIssue: null
  },
  {
    id: "stuffed-ziti-fritta",
    name: "Stuffed Ziti Fritta",
    description: null,
    image: {
      src: "/images/appetizers/stuffed-ziti-fritta.webp",
      alt: "Breaded fried ziti sticks, two broken open to show pasta and melted cheese, beside a cup of marinara sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/stuffed-ziti-fritta.webp",
    imageIssue: null
  },
  {
    id: "dipping-sauces-with-breadsticks",
    name: "Dipping Sauces with Breadsticks",
    description: null,
    image: {
      src: "/images/appetizers/dipping-sauces-with-breadsticks.webp",
      alt: "Breadsticks in a napkin-lined basket beside three cups of dipping sauce: red marinara, white alfredo, and a yellow cheese sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/dipping-sauces-with-breadsticks.webp",
    imageIssue: null
  },
  {
    id: "calamari",
    name: "Calamari",
    description: null,
    image: {
      src: "/images/appetizers/calamari.webp",
      alt: "Fried calamari rings and tentacles with a cup of marinara sauce and a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/calamari.webp",
    imageIssue: null
  },
  {
    id: "meatballs-parmigiana",
    name: "Meatballs Parmigiana",
    description: null,
    image: {
      src: "/images/appetizers/meatballs-parmigiana.webp",
      alt: "Meatballs baked in marinara and topped with melted mozzarella, parmesan and parsley in a white dish",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/appetizers/meatballs-parmigiana.webp",
    imageIssue: null
  },
  {
    id: "spinach-artichoke-dip",
    name: "Spinach-Artichoke Dip",
    description: null,
    image: {
      src: "/images/appetizers/spinach-artichoke-dip.webp",
      alt: "Baked spinach and artichoke dip with browned cheese in a white dish, surrounded by toasted flatbread triangles and bread slices",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/spinach-artichoke-dip.webp",
    imageIssue: null
  },
  {
    id: "lasagna-fritta",
    name: "Lasagna Fritta",
    description: null,
    image: {
      src: "/images/appetizers/lasagna-fritta.webp",
      alt: "Fried breaded lasagna pieces topped with red sauce, white sauce drizzle, and grated cheese, one cut open to show the cheese filling",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/lasagna-fritta.webp",
    imageIssue: null
  },
  {
    id: "shrimp-fritto-misto",
    name: "Shrimp Fritto Misto",
    description: null,
    image: {
      src: "/images/appetizers/shrimp-fritto-misto.webp",
      alt: "Fried shrimp, calamari rings and zucchini slices on a white plate with a creamy dipping sauce and a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/appetizers/shrimp-fritto-misto.webp",
    imageIssue: null
  },
  {
    id: "toasted-ravioli",
    name: "Toasted Ravioli",
    description: null,
    image: {
      src: "/images/appetizers/toasted-ravioli.webp",
      alt: "Golden breaded toasted ravioli sprinkled with grated cheese and parsley around a cup of red dipping sauce, one cut open",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/appetizers/toasted-ravioli.webp",
    imageIssue: null
  },
  {
    id: "calabrian-steak-and-shrimp-bucatini",
    name: "Calabrian Steak & Shrimp Bucatini",
    description: null,
    image: {
      src: "/images/classic-entrees/calabrian-steak-and-shrimp-bucatini.webp",
      alt: "Bucatini pasta with seared steak pieces and shrimp in a creamy, red-flecked spicy sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/calabrian-steak-and-shrimp-bucatini.webp",
    imageIssue: null
  },
  {
    id: "shrimp-carbonara",
    name: "Shrimp Carbonara",
    description: null,
    image: {
      src: "/images/classic-entrees/shrimp-carbonara.webp",
      alt: "Fettuccine carbonara with shrimp and crispy bacon pieces in a creamy sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/shrimp-carbonara.webp",
    imageIssue: null
  },
  {
    id: "tour-of-italy",
    name: "Tour of Italy",
    description: null,
    image: {
      src: "/images/classic-entrees/tour-of-italy.webp",
      alt: "Tour of Italy plate with chicken parmigiana, lasagna, and fettuccine alfredo, with breadsticks and salad behind it",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/tour-of-italy.webp",
    imageIssue: null
  },
  {
    id: "ravioli-carbonara",
    name: "Ravioli Carbonara",
    description: null,
    image: {
      src: "/images/classic-entrees/ravioli-carbonara.webp",
      alt: "Ravioli in a creamy carbonara sauce topped with crispy bacon pieces and grated cheese",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/ravioli-carbonara.webp",
    imageIssue: null
  },
  {
    id: "spaghetti-and-meatballs",
    name: "Spaghetti & Meatballs",
    description: null,
    image: {
      src: "/images/lunch-menu/spaghetti-and-meatballs-two-meatballs.webp",
      alt: "Spaghetti in marinara topped with two meatballs, grated parmesan and parsley in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/spaghetti-and-meatballs-two-meatballs.webp",
    imageIssue: null
  },
  {
    id: "spaghetti-with-marinara",
    name: "Spaghetti with Marinara",
    description: null,
    image: {
      src: "/images/classic-entrees/spaghetti-with-marinara.webp",
      alt: "Spaghetti in marinara sauce topped with grated cheese and a basil leaf",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/spaghetti-with-marinara.webp",
    imageIssue: null
  },
  {
    id: "stuffed-chicken-marsala",
    name: "Stuffed Chicken Marsala",
    description: null,
    image: {
      src: "/images/classic-entrees/stuffed-chicken-marsala.webp",
      alt: "Stuffed chicken breasts in a mushroom marsala sauce with mashed potatoes and broccoli",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/stuffed-chicken-marsala.webp",
    imageIssue: null
  },
  {
    id: "steak-gorgonzola-alfredo",
    name: "Steak Gorgonzola Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/steak-gorgonzola-alfredo.webp",
      alt: "Sliced grilled steak over fettuccine alfredo with gorgonzola cheese, with broccoli on the side",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/steak-gorgonzola-alfredo.webp",
    imageIssue: null
  },
  {
    id: "seafood-alfredo",
    name: "Seafood Alfredo",
    description: null,
    image: {
      src: "/images/classic-entrees/seafood-alfredo.webp",
      alt: "Fettuccine alfredo topped with seared shrimp, scallops and grated parmesan in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/classic-entrees/seafood-alfredo.webp",
    imageIssue: null
  },
  {
    id: "cheese-ravioli",
    name: "Cheese Ravioli",
    description: null,
    image: {
      src: "/images/classic-entrees/cheese-ravioli.webp",
      alt: "Cheese ravioli in marinara sauce topped with melted cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/cheese-ravioli.webp",
    imageIssue: null
  },
  {
    id: "eggplant-parmigiana",
    name: "Eggplant Parmigiana",
    description: null,
    image: {
      src: "/images/classic-entrees/eggplant-parmigiana.webp",
      alt: "Layered breaded eggplant with marinara sauce and melted cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/eggplant-parmigiana.webp",
    imageIssue: null
  },
  {
    id: "grilled-chicken-margherita",
    name: "Grilled Chicken Margherita",
    description: null,
    image: {
      src: "/images/classic-entrees/grilled-chicken-margherita.webp",
      alt: "Grilled chicken breast topped with tomatoes and melted cheese, with pasta and broccoli on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/grilled-chicken-margherita.webp",
    imageIssue: null
  },
  {
    id: "herb-grilled-salmon",
    name: "Herb-Grilled Salmon",
    description: null,
    image: {
      src: "/images/classic-entrees/herb-grilled-salmon.webp",
      alt: "A herb-grilled salmon fillet with broccoli, mashed potatoes, and a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/herb-grilled-salmon.webp",
    imageIssue: null
  },
  {
    id: "6-oz-sirloin",
    name: "6 oz. Sirloin",
    description: null,
    image: {
      src: "/images/classic-entrees/6-oz-sirloin.webp",
      alt: "A grilled sirloin steak with broccoli and mashed potatoes on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/6-oz-sirloin.webp",
    imageIssue: null
  },
  {
    id: "create-your-own-pasta",
    name: "Create Your Own Pasta",
    description: null,
    image: {
      src: "/images/classic-entrees/create-your-own-pasta.webp",
      alt: "A bowl of pasta surrounded by small bowls of sauces and toppings, with breadsticks, salad, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/create-your-own-pasta.webp",
    imageIssue: null
  },
  {
    id: "rigatoni-alla-vodka",
    name: "Rigatoni alla Vodka",
    description: null,
    image: {
      src: "/images/buy-one-take-one/rigatoni-alla-vodka.webp",
      alt: "Rigatoni in a creamy pink vodka sauce in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/buy-one-take-one/rigatoni-alla-vodka.webp",
    imageIssue: null
  },
  {
    id: "four-cheese-manicotti-with-marinara",
    name: "Four-Cheese Manicotti with Marinara",
    description: null,
    image: {
      src: "/images/buy-one-take-one/four-cheese-manicotti-with-marinara.webp",
      alt: "Baked manicotti in marinara sauce covered with melted cheese in a white oval dish",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/buy-one-take-one/four-cheese-manicotti-with-marinara.webp",
    imageIssue: null
  },
  {
    id: "weekday-lunch-special",
    name: "Weekday Lunch Special",
    description: null,
    image: {
      src: "/images/soups-salad-and-breadsticks/weekday-lunch-special.webp",
      alt: "A bowl of creamy soup with a house salad, a basket of breadsticks, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/soups-salad-and-breadsticks/weekday-lunch-special.webp",
    imageIssue: null
  },
  {
    id: "soup-salad-and-breadsticks",
    name: "Soup, Salad & Breadsticks",
    description: null,
    image: {
      src: "/images/soups-salad-and-breadsticks/soup-salad-and-breadsticks.webp",
      alt: "A bowl of soup with a house salad, a basket of breadsticks, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/soups-salad-and-breadsticks/soup-salad-and-breadsticks.webp",
    imageIssue: null
  },
  {
    id: "spaghetti",
    name: "Spaghetti",
    description: null,
    image: {
      src: "/images/lunch-menu/spaghetti.webp",
      alt: "Spaghetti in marinara sauce with grated cheese, with breadsticks, salad, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/lunch-menu/spaghetti.webp",
    imageIssue: null
  },
  {
    id: "soup-salad-and-breadsticks-lunch",
    name: "Soup, Salad and Breadsticks (Lunch)",
    description: null,
    image: {
      src: "/images/soups-salad-and-breadsticks/soup-salad-and-breadsticks.webp",
      alt: "A bowl of soup with a house salad, a basket of breadsticks, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/soups-salad-and-breadsticks/soup-salad-and-breadsticks.webp",
    imageIssue: null
  },
  {
    id: "chocolate-lasagna",
    name: "Chocolate Lasagna",
    description: null,
    image: {
      src: "/images/desserts/chocolate-lasagna.webp",
      alt: "A slice of layered chocolate cake with cream filling and chocolate shavings",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/chocolate-lasagna.webp",
    imageIssue: null
  },
  {
    id: "black-tie-mousse-cake",
    name: "Black Tie Mousse Cake",
    description: null,
    image: {
      src: "/images/desserts/black-tie-mousse-cake.webp",
      alt: "A slice of layered chocolate mousse cake topped with whipped cream, with the rest of the cake behind it",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/black-tie-mousse-cake.webp",
    imageIssue: null
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: null,
    image: {
      src: "/images/desserts/tiramisu.webp",
      alt: "A square of tiramisu dusted with cocoa, with an espresso cup and coffee beans",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/tiramisu.webp",
    imageIssue: null
  },
  {
    id: "strawberry-cream-cake",
    name: "Strawberry Cream Cake",
    description: null,
    image: {
      src: "/images/desserts/strawberry-cream-cake.webp",
      alt: "A slice of layered strawberry cream cake with fresh strawberries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/strawberry-cream-cake.webp",
    imageIssue: null
  },
  {
    id: "warm-italian-doughnuts",
    name: "Warm Italian Doughnuts",
    description: null,
    image: {
      src: "/images/desserts/warm-italian-doughnuts.webp",
      alt: "Sugar-coated Italian doughnuts on a plate with cups of chocolate and cream dipping sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/warm-italian-doughnuts.webp",
    imageIssue: null
  },
  {
    id: "sicilian-cheesecake-with-strawberry-topping",
    name: "Sicilian Cheesecake with Strawberry Topping",
    description: null,
    image: {
      src: "/images/desserts/sicilian-cheesecake-with-strawberry-topping.webp",
      alt: "A slice of cheesecake topped with strawberry sauce and fresh strawberries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/desserts/sicilian-cheesecake-with-strawberry-topping.webp",
    imageIssue: null
  },
  {
    id: "gallon-iced-teas-and-raspberry-lemonade",
    name: "Gallon Iced Teas & Raspberry Lemonade",
    description: null,
    image: {
      src: "/images/drink-menu/gallon-iced-teas-and-raspberry-lemonade.webp",
      alt: "Gallon jugs of iced tea and raspberry lemonade with filled glasses, lemons, and raspberries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/gallon-iced-teas-and-raspberry-lemonade.webp",
    imageIssue: null
  },
  {
    id: "2-liter-soda",
    name: "2-Liter Soda",
    description: null,
    image: {
      src: "/images/drink-menu/2-liter-soda.webp",
      alt: "A row of five 2-liter soda bottles in different flavors",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/2-liter-soda.webp",
    imageIssue: null
  },
  {
    id: "to-go-fountain-drinks",
    name: "To-Go Fountain Drinks",
    description: null,
    image: {
      src: "/images/drink-menu/to-go-fountain-drinks.webp",
      alt: "A soda fountain filling a to-go cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/to-go-fountain-drinks.webp",
    imageIssue: null
  },
  {
    id: "raspberry-lemonade",
    name: "Raspberry Lemonade",
    description: null,
    image: {
      src: "/images/drink-menu/raspberry-lemonade.webp",
      alt: "A glass and a pitcher of pink raspberry lemonade with raspberries and lemon",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/raspberry-lemonade.webp",
    imageIssue: null
  },
  {
    id: "classic-lemonade",
    name: "Classic Lemonade",
    description: null,
    image: {
      src: "/images/drink-menu/classic-lemonade.webp",
      alt: "A glass and a pitcher of lemonade with lemon slices",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/classic-lemonade.webp",
    imageIssue: null
  },
  {
    id: "desert-pear-limonata",
    name: "Desert Pear Limonata",
    description: null,
    image: {
      src: "/images/drink-menu/desert-pear-limonata.webp",
      alt: "A glass and a pitcher of pear limonata with lemon slices and fresh pears",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/desert-pear-limonata.webp",
    imageIssue: null
  },
  {
    id: "strawberry-passion-fruit-limonata",
    name: "Strawberry-Passion Fruit Limonata",
    description: null,
    image: {
      src: "/images/drink-menu/strawberry-passion-fruit-limonata.webp",
      alt: "A glass and a pitcher of strawberry-passion fruit limonata with strawberries and passion fruit",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/strawberry-passion-fruit-limonata.webp",
    imageIssue: null
  },
  {
    id: "mango-passion-fruit-iced-tea",
    name: "Mango-Passion Fruit Iced Tea",
    description: null,
    image: {
      src: "/images/drink-menu/mango-passion-fruit-iced-tea.webp",
      alt: "A glass and a pitcher of mango-passion fruit iced tea with mango and passion fruit",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/mango-passion-fruit-iced-tea.webp",
    imageIssue: null
  },
  {
    id: "bellini-peach-raspberry-iced-tea",
    name: "Bellini Peach-Raspberry Iced Tea",
    description: null,
    image: {
      src: "/images/drink-menu/bellini-peach-raspberry-iced-tea.webp",
      alt: "A glass and a pitcher of peach-raspberry iced tea with fresh peaches and raspberries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/bellini-peach-raspberry-iced-tea.webp",
    imageIssue: null
  },
  {
    id: "fresh-brewed-sweet-iced-tea",
    name: "Fresh-Brewed Sweet Iced Tea",
    description: null,
    image: {
      src: "/images/drink-menu/fresh-brewed-sweet-iced-tea.webp",
      alt: "A glass and a pitcher of iced tea with lemon slices",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/fresh-brewed-sweet-iced-tea.webp",
    imageIssue: null
  },
  {
    id: "fresh-brewed-unsweet-iced-tea",
    name: "Fresh-Brewed Unsweet Iced Tea",
    description: null,
    image: {
      src: "/images/drink-menu/fresh-brewed-unsweet-iced-tea.webp",
      alt: "A glass and a pitcher of unsweetened iced tea with lemon slices",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/fresh-brewed-unsweet-iced-tea.webp",
    imageIssue: null
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: null,
    image: {
      src: "/images/drink-menu/cappuccino.webp",
      alt: "A cup of cappuccino with foam dusted with cocoa, beside coffee beans and cinnamon sticks",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/drink-menu/cappuccino.webp",
    imageIssue: null
  },
  {
    id: "cheese-grater",
    name: "Cheese Grater",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/cheese-grater.webp",
      alt: "A box cheese grater with a block of cheese and a pile of freshly grated cheese on a board",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/cheese-grater.webp",
    imageIssue: null
  },
  {
    id: "side-of-meatballs",
    name: "Side of Meatballs",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-meatballs.webp",
      alt: "Meatballs in marinara sauce topped with grated parmesan and parsley in a small white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-meatballs.webp",
    imageIssue: null
  },
  {
    id: "side-of-grilled-chicken",
    name: "Side of Grilled Chicken",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-grilled-chicken.webp",
      alt: "Herb-grilled chicken breast on a white plate with a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-grilled-chicken.webp",
    imageIssue: null
  },
  {
    id: "side-of-mashed-potatoes",
    name: "Side of Mashed Potatoes",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-mashed-potatoes.webp",
      alt: "A white bowl of mashed potatoes topped with butter and parsley",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-mashed-potatoes.webp",
    imageIssue: null
  },
  {
    id: "side-of-broccoli",
    name: "Side of Broccoli",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-broccoli.webp",
      alt: "A white bowl of roasted broccoli florets",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-broccoli.webp",
    imageIssue: null
  },
  {
    id: "side-of-alfredo-sauce",
    name: "Side of Alfredo Sauce",
    description: null,
    image: {
      src: "/images/catering/alfredo-dipping-sauce.webp",
      alt: "A white bowl of creamy alfredo sauce sprinkled with parsley",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/alfredo-dipping-sauce.webp",
    imageIssue: null
  },
  {
    id: "side-of-marinara-sauce",
    name: "Side of Marinara Sauce",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-marinara-sauce.webp",
      alt: "A white bowl of marinara sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-marinara-sauce.webp",
    imageIssue: null
  },
  {
    id: "side-of-meat-sauce",
    name: "Side of Meat Sauce",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-meat-sauce.webp",
      alt: "A white bowl of meat sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-meat-sauce.webp",
    imageIssue: null
  },
  {
    id: "side-of-five-cheese-marinara-sauce",
    name: "Side of Five Cheese Marinara Sauce",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-five-cheese-marinara-sauce.webp",
      alt: "A white bowl of five cheese marinara sauce topped with melted cheese",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-five-cheese-marinara-sauce.webp",
    imageIssue: null
  },
  {
    id: "lavazza-espresso",
    name: "Lavazza Espresso",
    description: null,
    image: {
      src: "/images/non-alcoholic-beverages/lavazza-espresso.webp",
      alt: "A cup of Lavazza espresso on a saucer beside coffee beans and a bag of espresso",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/non-alcoholic-beverages/lavazza-espresso.webp",
    imageIssue: null
  },
  {
    id: "moscato-primo-amore",
    name: "Moscato Primo Amore",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/moscato-primo-amore.webp",
      alt: "A bottle of Primo Amore Moscato beside a glass of white wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/moscato-primo-amore.webp",
    imageIssue: null
  },
  {
    id: "sweet-pink-moscato-blend-confetti",
    name: "Sweet Pink Moscato Blend Confetti",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/sweet-pink-moscato-blend-confetti.webp",
      alt: "A bottle of sweet pink moscato beside a glass of pink wine and strawberries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/sweet-pink-moscato-blend-confetti.webp",
    imageIssue: null
  },
  {
    id: "sweet-red-roscato-rosso-dolce",
    name: "Sweet Red Roscato Rosso Dolce",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/sweet-red-roscato-rosso-dolce.webp",
      alt: "A bottle of Roscato Rosso Dolce sweet red wine beside a glass of red wine and berries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/sweet-red-roscato-rosso-dolce.webp",
    imageIssue: null
  },
  {
    id: "red-blend-porta-vita",
    name: "Red Blend Porta Vita",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/red-blend-porta-vita.webp",
      alt: "A bottle of Porta Vita red blend beside a glass of red wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/red-blend-porta-vita.webp",
    imageIssue: null
  },
  {
    id: "moscato-castello-del-poggio",
    name: "Moscato Castello del Poggio",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/moscato-castello-del-poggio.webp",
      alt: "A bottle of Castello del Poggio Moscato beside a glass of white wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/moscato-castello-del-poggio.webp",
    imageIssue: null
  },
  {
    id: "white-zinfandel-sutter-home",
    name: "White Zinfandel Sutter Home",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/white-zinfandel-sutter-home.webp",
      alt: "A bottle of Sutter Home White Zinfandel beside a glass of pink wine",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/white-zinfandel-sutter-home.webp",
    imageIssue: null
  },
  {
    id: "riesling-chateau-ste-michelle",
    name: "Riesling Chateau Ste. Michelle",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/riesling-chateau-ste-michelle.webp",
      alt: "A bottle of Chateau Ste. Michelle Riesling beside a glass of white wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/riesling-chateau-ste-michelle.webp",
    imageIssue: null
  },
  {
    id: "pinot-grigio-cavit",
    name: "Pinot Grigio Cavit",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/pinot-grigio-cavit.webp",
      alt: "A bottle of Cavit Pinot Grigio beside a glass of white wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/pinot-grigio-cavit.webp",
    imageIssue: null
  },
  {
    id: "sauvignon-blanc-starborough",
    name: "Sauvignon Blanc Starborough",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/sauvignon-blanc-starborough.webp",
      alt: "A bottle of Starborough Sauvignon Blanc beside a glass of white wine",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/sauvignon-blanc-starborough.webp",
    imageIssue: null
  },
  {
    id: "chardonnay-chateau-ste-michelle",
    name: "Chardonnay Chateau Ste. Michelle",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/chardonnay-chateau-ste-michelle.webp",
      alt: "A bottle of Chateau Ste. Michelle Chardonnay beside a glass of white wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/chardonnay-chateau-ste-michelle.webp",
    imageIssue: null
  },
  {
    id: "pinot-noir-meiomi",
    name: "Pinot Noir Meiomi",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/pinot-noir-meiomi.webp",
      alt: "A bottle of Meiomi Pinot Noir beside a glass of red wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/pinot-noir-meiomi.webp",
    imageIssue: null
  },
  {
    id: "merlot-beringer",
    name: "Merlot Beringer",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/merlot-beringer.webp",
      alt: "A bottle of Beringer Merlot beside a glass of red wine and grapes",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/merlot-beringer.webp",
    imageIssue: null
  },
  {
    id: "chianti-classico-rocca-delle-macie",
    name: "Chianti Classico Rocca delle Macie",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/chianti-classico-rocca-delle-macie.webp",
      alt: "A bottle of Rocca delle Macie Chianti Classico beside a glass of red wine",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/chianti-classico-rocca-delle-macie.webp",
    imageIssue: null
  },
  {
    id: "cabernet-robert-mondavi-private-selection",
    name: "Cabernet Robert Mondavi Private Selection",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/cabernet-robert-mondavi-private-selection.webp",
      alt: "A bottle of Robert Mondavi Private Selection Cabernet Sauvignon beside a glass of red wine",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/cabernet-robert-mondavi-private-selection.webp",
    imageIssue: null
  },
  {
    id: "budweiser",
    name: "Budweiser",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/budweiser.webp",
      alt: "A bottle of Budweiser beside a full glass of beer and an ice bucket",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/budweiser.webp",
    imageIssue: null
  },
  {
    id: "bud-light",
    name: "Bud Light",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/bud-light.webp",
      alt: "Bud Light in a can and a bottle, with more bottles in an ice bucket",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/bud-light.webp",
    imageIssue: null
  },
  {
    id: "coors-light",
    name: "Coors Light",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/coors-light.webp",
      alt: "Coors Light in a can and a bottle, with more cans on ice",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/coors-light.webp",
    imageIssue: null
  },
  {
    id: "michelob-ultra",
    name: "Michelob Ultra",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/michelob-ultra.webp",
      alt: "Michelob Ultra in a bottle and a glass, with a carton of bottles",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/michelob-ultra.webp",
    imageIssue: null
  },
  {
    id: "miller-lite",
    name: "Miller Lite",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/miller-lite.webp",
      alt: "Miller Lite in a can and a bottle beside a full glass of beer and an ice bucket",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/miller-lite.webp",
    imageIssue: null
  },
  {
    id: "zuppa-toscana",
    name: "Zuppa Toscana",
    description: null,
    image: {
      src: "/images/gluten-sensitive/zuppa-toscana.webp",
      alt: "A bowl of creamy Zuppa Toscana soup with sausage, potatoes, and kale",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/zuppa-toscana.webp",
    imageIssue: null
  },
  {
    id: "famous-house-salad-without-croutons",
    name: "Famous House Salad without Croutons",
    description: null,
    image: {
      src: "/images/gluten-sensitive/famous-house-salad-without-croutons.webp",
      alt: "A bowl of salad with lettuce, tomatoes, cucumbers, red onion, and olives, without croutons",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/famous-house-salad-without-croutons.webp",
    imageIssue: null
  },
  {
    id: "grilled-chicken-parmigiana",
    name: "Grilled Chicken Parmigiana",
    description: null,
    image: {
      src: "/images/gluten-sensitive/grilled-chicken-parmigiana.webp",
      alt: "Grilled chicken breast topped with marinara and melted mozzarella, served with fettuccine in a cream sauce on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/gluten-sensitive/grilled-chicken-parmigiana.webp",
    imageIssue: null
  },
  {
    id: "rotini-pasta-with-marinara",
    name: "Rotini Pasta with Marinara",
    description: null,
    image: {
      src: "/images/gluten-sensitive/rotini-pasta-with-marinara.webp",
      alt: "Rotini pasta in marinara sauce topped with grated cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/rotini-pasta-with-marinara.webp",
    imageIssue: null
  },
  {
    id: "rotini-pasta-with-meat-sauce",
    name: "Rotini Pasta with Meat Sauce",
    description: null,
    image: {
      src: "/images/gluten-sensitive/rotini-pasta-with-meat-sauce.webp",
      alt: "Rotini pasta in meat sauce topped with grated cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/rotini-pasta-with-meat-sauce.webp",
    imageIssue: null
  },
  {
    id: "grilled-chicken-with-rotini-pasta-and-marinara",
    name: "Grilled Chicken with Rotini Pasta & Marinara",
    description: null,
    image: {
      src: "/images/gluten-sensitive/grilled-chicken-with-rotini-pasta-and-marinara.webp",
      alt: "A grilled chicken breast beside rotini pasta in marinara sauce on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/grilled-chicken-with-rotini-pasta-and-marinara.webp",
    imageIssue: null
  },
  {
    id: "rotini-with-marinara",
    name: "Rotini with Marinara",
    description: null,
    image: {
      src: "/images/gluten-sensitive/rotini-with-marinara.webp",
      alt: "Rotini in marinara sauce sprinkled with grated cheese in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/gluten-sensitive/rotini-with-marinara.webp",
    imageIssue: null
  },
  {
    id: "rotini-with-meat-sauce",
    name: "Rotini with Meat Sauce",
    description: null,
    image: {
      src: "/images/kids-meal/kids-rotini-with-meat-sauce.webp",
      alt: "Kids meal of rotini with meat sauce, with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-rotini-with-meat-sauce.webp",
    imageIssue: null
  },
  {
    id: "kids-alfredo-pasta",
    name: "Kids Alfredo Pasta",
    description: null,
    image: {
      src: "/images/kids-meal/kids-alfredo-pasta.webp",
      alt: "Kids meal of pasta in alfredo sauce with a side of broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-alfredo-pasta.webp",
    imageIssue: null
  },
  {
    id: "kids-pizza",
    name: "Kids Pizza",
    description: null,
    image: {
      src: "/images/kids-meal/kids-pizza.webp",
      alt: "Kids cheese pizza with a cup of fresh fruit and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-pizza.webp",
    imageIssue: null
  },
  {
    id: "kids-chicken-fingers",
    name: "Kids Chicken Fingers",
    description: null,
    image: {
      src: "/images/kids-meal/kids-chicken-fingers.webp",
      alt: "Kids meal of breaded chicken fingers with french fries, vegetable sticks, ketchup, and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-chicken-fingers.webp",
    imageIssue: null
  },
  {
    id: "kids-macaroni-and-cheese",
    name: "Kids Macaroni & Cheese",
    description: null,
    image: {
      src: "/images/kids-meal/kids-macaroni-and-cheese.webp",
      alt: "Kids meal of macaroni and cheese with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-macaroni-and-cheese.webp",
    imageIssue: null
  },
  {
    id: "kids-meat-sauce-pasta",
    name: "Kids Meat Sauce Pasta",
    description: null,
    image: {
      src: "/images/kids-meal/kids-meat-sauce-pasta.webp",
      alt: "Kids meal of pasta with meat sauce, with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-meat-sauce-pasta.webp",
    imageIssue: null
  },
  {
    id: "kids-tomato-sauce-pasta",
    name: "Kids Tomato Sauce Pasta",
    description: null,
    image: {
      src: "/images/kids-meal/kids-tomato-sauce-pasta.webp",
      alt: "Kids meal of pasta in tomato sauce with grated cheese, broccoli and carrots, and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-tomato-sauce-pasta.webp",
    imageIssue: null
  },
  {
    id: "kids-five-cheese-marinara-pasta",
    name: "Kids Five Cheese Marinara Pasta",
    description: null,
    image: {
      src: "/images/kids-meal/kids-five-cheese-marinara-pasta.webp",
      alt: "Kids meal of pasta in five cheese marinara sauce with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-five-cheese-marinara-pasta.webp",
    imageIssue: null
  },
  {
    id: "kids-cheese-ravioli",
    name: "Kids Cheese Ravioli",
    description: null,
    image: {
      src: "/images/kids-meal/kids-cheese-ravioli.webp",
      alt: "Kids meal of cheese ravioli in marinara sauce with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-cheese-ravioli.webp",
    imageIssue: null
  },
  {
    id: "kids-grilled-chicken-with-rotini-pasta-and-marinara",
    name: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    description: null,
    image: {
      src: "/images/kids-meal/kids-grilled-chicken-with-rotini-pasta-and-marinara.webp",
      alt: "Kids meal of rotini in marinara sauce topped with sliced grilled chicken, with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-grilled-chicken-with-rotini-pasta-and-marinara.webp",
    imageIssue: null
  },
  {
    id: "kids-rotini-with-marinara",
    name: "Kids Rotini with Marinara",
    description: null,
    image: {
      src: "/images/kids-meal/kids-rotini-with-marinara.webp",
      alt: "Kids meal of rotini in marinara sauce with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-rotini-with-marinara.webp",
    imageIssue: null
  },
  {
    id: "kids-rotini-with-meat-sauce",
    name: "Kids Rotini with Meat Sauce",
    description: null,
    image: {
      src: "/images/kids-meal/kids-rotini-with-meat-sauce.webp",
      alt: "Kids meal of rotini with meat sauce, with broccoli and carrots and a kids cup",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/kids-meal/kids-rotini-with-meat-sauce.webp",
    imageIssue: null
  },
  {
    id: "cheese-ravioli-with-marinara-or-meat-sauce",
    name: "Cheese Ravioli with Marinara or Meat Sauce",
    description: null,
    image: {
      src: "/images/family-style-meals/cheese-ravioli-with-meat-or-marinara-sauce.webp",
      alt: "A large dish of cheese ravioli in meat sauce topped with melted cheese",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/family-style-meals/cheese-ravioli-with-meat-or-marinara-sauce.webp",
    imageIssue: null
  },
  {
    id: "chicken-parmigiana-combination",
    name: "Chicken Parmigiana Combination",
    description: null,
    image: {
      src: "/images/catering/chicken-parmigiana-combination.webp",
      alt: "Catering tray with chicken parmigiana, spaghetti in marinara, fettuccine alfredo, and garlic bread",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/chicken-parmigiana-combination.webp",
    imageIssue: null
  },
  {
    id: "lasagna-combination",
    name: "Lasagna Combination",
    description: null,
    image: {
      src: "/images/catering/lasagna-combination.webp",
      alt: "Catering tray with lasagna, chicken parmigiana, and fettuccine alfredo, with garlic bread",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/lasagna-combination.webp",
    imageIssue: null
  },
  {
    id: "create-your-own-pasta-station",
    name: "Create Your Own Pasta Station",
    description: null,
    image: {
      src: "/images/classic-entrees/create-your-own-pasta.webp",
      alt: "A bowl of pasta surrounded by small bowls of sauces and toppings, with breadsticks, salad, and iced tea",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/classic-entrees/create-your-own-pasta.webp",
    imageIssue: null
  },
  {
    id: "toasted-beef-ravioli",
    name: "Toasted Beef Ravioli",
    description: null,
    image: {
      src: "/images/catering/toasted-beef-ravioli.webp",
      alt: "A platter of breaded toasted ravioli with a cup of marinara sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/toasted-beef-ravioli.webp",
    imageIssue: null
  },
  {
    id: "alfredo-dipping-sauce",
    name: "Alfredo Dipping Sauce",
    description: null,
    image: {
      src: "/images/catering/alfredo-dipping-sauce.webp",
      alt: "A white bowl of creamy alfredo sauce sprinkled with parsley",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/alfredo-dipping-sauce.webp",
    imageIssue: null
  },
  {
    id: "five-cheese-marinara-dipping-sauce",
    name: "Five Cheese Marinara Dipping Sauce",
    description: null,
    image: {
      src: "/images/catering/five-cheese-marinara-dipping-sauce.webp",
      alt: "A white bowl of five cheese marinara sauce topped with grated cheese",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/five-cheese-marinara-dipping-sauce.webp",
    imageIssue: null
  },
  {
    id: "marinara-dipping-sauce",
    name: "Marinara Dipping Sauce",
    description: null,
    image: {
      src: "/images/catering/marinara-dipping-sauce.webp",
      alt: "A white bowl of chunky marinara sauce",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/marinara-dipping-sauce.webp",
    imageIssue: null
  },
  {
    id: "meat-dipping-sauce",
    name: "Meat Dipping Sauce",
    description: null,
    image: {
      src: "/images/catering/meat-dipping-sauce.webp",
      alt: "A white bowl of meat sauce sprinkled with parsley",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/meat-dipping-sauce.webp",
    imageIssue: null
  },
  {
    id: "grilled-chicken-breasts",
    name: "Grilled Chicken Breasts",
    description: null,
    image: {
      src: "/images/catering/grilled-chicken-breasts.webp",
      alt: "Herb-grilled chicken breasts on a platter with lemon wedges",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/grilled-chicken-breasts.webp",
    imageIssue: null
  },
  {
    id: "chicken-fingers",
    name: "Chicken Fingers",
    description: null,
    image: {
      src: "/images/catering/chicken-fingers.webp",
      alt: "Breaded chicken tenders on a platter with a cup of creamy dip and celery sticks",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/chicken-fingers.webp",
    imageIssue: null
  },
  {
    id: "italian-meatballs",
    name: "Italian Meatballs",
    description: null,
    image: {
      src: "/images/catering/italian-meatballs.webp",
      alt: "Italian meatballs in marinara sauce topped with grated parmesan and parsley in a white bowl",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/catering/italian-meatballs.webp",
    imageIssue: null
  },
  {
    id: "broccoli",
    name: "Broccoli",
    description: null,
    image: {
      src: "/images/catering/broccoli.webp",
      alt: "A large white bowl of bright green broccoli florets",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/broccoli.webp",
    imageIssue: null
  },
  {
    id: "sicilian-cheesecake",
    name: "Sicilian Cheesecake",
    description: null,
    image: {
      src: "/images/catering/sicilian-cheesecake.webp",
      alt: "A slice of cheesecake topped with strawberry sauce, fresh strawberries, and whipped cream",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/sicilian-cheesecake.webp",
    imageIssue: null
  },
  {
    id: "san-pellegrino-sparkling-1-liter-bottle",
    name: "San Pellegrino Sparkling (1-Liter Bottle)",
    description: null,
    image: {
      src: "/images/catering/san-pellegrino-sparkling-1-liter-bottle.webp",
      alt: "A one-liter bottle of San Pellegrino sparkling water beside a glass with lemon",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/san-pellegrino-sparkling-1-liter-bottle.webp",
    imageIssue: null
  },
  {
    id: "acqua-panna-spring-1-liter-bottle",
    name: "Acqua Panna Spring (1-Liter Bottle)",
    description: null,
    image: {
      src: "/images/catering/acqua-panna-spring-1-liter-bottle.webp",
      alt: "A one-liter bottle of Acqua Panna spring water beside a glass of water",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "Owner-provided"
    },
    plannedImageSrc: "/images/catering/acqua-panna-spring-1-liter-bottle.webp",
    imageIssue: null
  },
  {
    id: "family-style-chicken-alfredo-bundle",
    name: "Family-Style Chicken Alfredo Bundle",
    description: null,
    image: {
      src: "/images/family-style-meals/family-style-chicken-alfredo-bundle.webp",
      alt: "Family-size pan of fettuccine alfredo topped with sliced grilled chicken, with a bowl of house salad and a basket of breadsticks",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/family-style-meals/family-style-chicken-alfredo-bundle.webp",
    imageIssue: null
  },
  {
    id: "family-style-chicken-parmigiana-bundle",
    name: "Family-Style Chicken Parmigiana Bundle",
    description: null,
    image: {
      src: "/images/family-style-meals/family-style-chicken-parmigiana-bundle.webp",
      alt: "Dish of chicken parmigiana with marinara and melted mozzarella, with a bowl of fettuccine alfredo, a bowl of house salad and a basket of breadsticks",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/family-style-meals/family-style-chicken-parmigiana-bundle.webp",
    imageIssue: null
  },
  {
    id: "family-style-five-cheese-ziti-al-forno-bundle",
    name: "Family-Style Five Cheese Ziti al Forno Bundle",
    description: null,
    image: {
      src: "/images/family-style-meals/family-style-five-cheese-ziti-al-forno-bundle.webp",
      alt: "Dish of baked ziti in tomato sauce under melted cheese, with a bowl of house salad, a basket of breadsticks and a bowl of fettuccine alfredo",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/family-style-meals/family-style-five-cheese-ziti-al-forno-bundle.webp",
    imageIssue: null
  },
  {
    id: "spicy-alfredo-fettuccine",
    name: "Spicy Alfredo Fettuccine",
    description: null,
    image: {
      src: "/images/classic-entrees/spicy-alfredo-fettuccine.webp",
      alt: "Fettuccine in an orange-tinted spicy alfredo sauce with red pepper flakes, topped with sliced grilled chicken",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/classic-entrees/spicy-alfredo-fettuccine.webp",
    imageIssue: null
  },
  {
    id: "chicken-parmigiana-sandwich",
    name: "Chicken Parmigiana Sandwich",
    description: null,
    image: {
      src: "/images/lunch-menu/chicken-parmigiana-sandwich.webp",
      alt: "Chicken parmigiana sandwich on a garlic knot bun with breaded chicken, marinara and melted mozzarella, served with french fries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/chicken-parmigiana-sandwich.webp",
    imageIssue: null
  },
  {
    id: "eggplant-parmigiana-sandwich",
    name: "Eggplant Parmigiana Sandwich",
    description: null,
    image: {
      src: "/images/lunch-menu/eggplant-parmigiana-sandwich.webp",
      alt: "Eggplant parmigiana sandwich on a garlic knot bun with breaded eggplant slices, marinara and melted mozzarella, served with french fries",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/eggplant-parmigiana-sandwich.webp",
    imageIssue: null
  },
  {
    id: "italian-grilled-chicken-sandwich",
    name: "Italian Grilled Chicken Sandwich",
    description: null,
    image: {
      src: "/images/lunch-menu/italian-grilled-chicken-sandwich.webp",
      alt: "Grilled chicken sandwich on a toasted roll with melted mozzarella, roasted red peppers and arugula",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/italian-grilled-chicken-sandwich.webp",
    imageIssue: null
  },
  {
    id: "chicken-alfredo-flatbread",
    name: "Chicken Alfredo Flatbread",
    description: null,
    image: {
      src: "/images/lunch-menu/chicken-alfredo-flatbread.webp",
      alt: "Rectangular chicken alfredo flatbread cut into six squares, topped with grilled chicken, roasted red pepper strips and melted mozzarella on a white platter",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/chicken-alfredo-flatbread.webp",
    imageIssue: null
  },
  {
    id: "five-cheese-flatbread",
    name: "Five Cheese Flatbread",
    description: null,
    image: {
      src: "/images/lunch-menu/five-cheese-flatbread.webp",
      alt: "Rectangular five cheese flatbread cut into six squares with golden melted cheese and herbs on a white platter",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/five-cheese-flatbread.webp",
    imageIssue: null
  },
  {
    id: "classic-pepperoni-flatbread",
    name: "Classic Pepperoni Flatbread",
    description: null,
    image: {
      src: "/images/lunch-menu/classic-pepperoni-flatbread.webp",
      alt: "Rectangular pepperoni flatbread cut into six squares with melted mozzarella and pepperoni slices on a white platter",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/lunch-menu/classic-pepperoni-flatbread.webp",
    imageIssue: null
  },
  {
    id: "pumpkin-cookie-butter-cheesecake",
    name: "Pumpkin Cookie Butter Cheesecake",
    description: null,
    image: {
      src: "/images/desserts/pumpkin-cookie-butter-cheesecake.webp",
      alt: "Slice of pumpkin cheesecake on a graham cracker crust with caramel drizzle, cookie butter crumbs and whipped cream",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/desserts/pumpkin-cookie-butter-cheesecake.webp",
    imageIssue: null
  },
  {
    id: "side-of-crispy-shrimp-fritta",
    name: "Side of Crispy Shrimp Fritta",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-crispy-shrimp-fritta.webp",
      alt: "Crispy breaded fried shrimp on a white plate with a cup of marinara and a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-crispy-shrimp-fritta.webp",
    imageIssue: null
  },
  {
    id: "side-of-crispy-chicken-fritta",
    name: "Side of Crispy Chicken Fritta",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/side-of-crispy-chicken-fritta.webp",
      alt: "Sliced crispy breaded fried chicken on a white plate",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/side-of-crispy-chicken-fritta.webp",
    imageIssue: null
  },
  {
    id: "italian-sausage",
    name: "Italian Sausage",
    description: null,
    image: {
      src: "/images/sides-sauces-and-extras/italian-sausage.webp",
      alt: "Two grilled Italian sausage links, one of them sliced, on a white plate with parsley",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/sides-sauces-and-extras/italian-sausage.webp",
    imageIssue: null
  },
  {
    id: "half-iced-tea-and-half-lemonade",
    name: "Half Iced Tea + Half Lemonade",
    description: null,
    image: {
      src: "/images/drink-menu/half-iced-tea-and-half-lemonade.webp",
      alt: "Tall glass of half iced tea and half lemonade with ice and a lemon wedge",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/drink-menu/half-iced-tea-and-half-lemonade.webp",
    imageIssue: null
  },
  {
    id: "heineken-0-0-non-alcoholic",
    name: "Heineken 0.0 Non-Alcoholic",
    description: null,
    image: {
      src: "/images/wine-and-beer-to-go/heineken-0-0-non-alcoholic.webp",
      alt: "Bottle of Heineken 0.0 non-alcoholic beer",
      width: 600,
      height: 450,
      credit: "Site owner",
      license: "AI-generated illustration supplied by the site owner",
      aiGenerated: true
    },
    plannedImageSrc: "/images/wine-and-beer-to-go/heineken-0-0-non-alcoholic.webp",
    imageIssue: null
  }
];
