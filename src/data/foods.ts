interface Nutrients {
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  sugar: string;
}

export interface Food {
  id: number;
  name: string;
  foodGroup: string;
  composition: string;
  description: string;
  calories: number;
  nutrients: Nutrients;
  imageUrl: string;
}

export const foods: Food[] = [
  {
    id: 1,
    name: "Plov",
    foodGroup: "Grains",
    composition: "Rice, Lamb or Beef, Carrots, Onions, Spices",
    description:
      "The national dish of Uzbekistan, a flavorful rice pilaf cooked with chunks of meat, carrots, onions, and spices in a large cauldron called a kazan.",
    calories: 550,
    nutrients: {
      protein: "25g",
      fat: "20g",
      carbs: "70g",
      fiber: "5g",
      sugar: "4g",
    },
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfNtSbTso4EgzjVPYkicc96MXKyF0k_pu9lg&s",
  },
  {
    id: 2,
    name: "Shashlik",
    foodGroup: "Protein Foods",
    composition: "Marinated Lamb or Beef, Spices, Skewers",
    description:
      "Skewered and grilled marinated meat, often served with raw onions and Uzbek bread.",
    calories: 350,
    nutrients: {
      protein: "30g",
      fat: "25g",
      carbs: "2g",
      fiber: "0g",
      sugar: "0g",
    },
    imageUrl: "https://media.express24.uz/r/848/1500/e08thRaik8j8nzW2QKY-R.jpg",
  },
  {
    id: 3,
    name: "Lagman",
    foodGroup: "Grains",
    composition: "Hand-pulled Noodles, Beef or Lamb, Vegetables, Broth",
    description:
      "Hand-pulled noodles served in a hearty broth with meat and vegetables.",
    calories: 450,
    nutrients: {
      protein: "22g",
      fat: "15g",
      carbs: "55g",
      fiber: "6g",
      sugar: "7g",
    },
    imageUrl:
      "https://cdn.lifehacker.ru/wp-content/uploads/2018/07/shutterstock_1937651824_1650492351-scaled-e1650492384721-630x315.jpeg",
  },
  {
    id: 4,
    name: "Manti",
    foodGroup: "Protein Foods",
    composition: "Dough, Minced Meat, Onions, Spices",
    description:
      "Large steamed dumplings filled with minced meat and onions, served with sour cream or yogurt sauce.",
    calories: 300,
    nutrients: {
      protein: "15g",
      fat: "10g",
      carbs: "35g",
      fiber: "2g",
      sugar: "2g",
    },
    imageUrl:
      "https://eda.ru/images/RecipeOpenGraph/1200x630/manti-po-russki_17693_ogimage.jpg",
  },
  {
    id: 5,
    name: "Samsa",
    foodGroup: "Grains",
    composition: "Pastry Dough, Meat or Pumpkin Filling, Onions, Spices",
    description:
      "Oven-baked pastries stuffed with meat, onions, or pumpkin, resembling samosas.",
    calories: 250,
    nutrients: {
      protein: "10g",
      fat: "12g",
      carbs: "28g",
      fiber: "3g",
      sugar: "1g",
    },
    imageUrl:
      "https://images.gastronom.ru/pPZD9HypkdcJ3Jhayp0--TVhDx6HvaFdbe1mgr8afYM/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzhmNmY1ODI1LThkYzctNDczYS04NWJiLTUyNDQyMjU1YWMyZC5qcGc.webp",
  },
  {
    id: 6,
    name: "Chuchvara",
    foodGroup: "Protein Foods",
    composition: "Small Dumplings, Meat Filling, Broth or Sour Cream",
    description:
      "Small boiled dumplings filled with meat, served in a light broth or with sour cream.",
    calories: 280,
    nutrients: {
      protein: "12g",
      fat: "8g",
      carbs: "35g",
      fiber: "2g",
      sugar: "2g",
    },
    imageUrl:
      "https://images.gastronom.ru/RLEm6RZuU56XayHXB7v0WXlnd3aH15oHr-D8nAnL4zA/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2FkYmQzNGIxLTk3ODgtNDEyNS05OGYyLWI0NWI4NDk2YjhlYy5qcGc.webp",
  },
  {
    id: 7,
    name: "Shurpa",
    foodGroup: "Vegetables",
    composition: "Lamb or Beef, Potatoes, Carrots, Onions, Herbs",
    description:
      "A rich and aromatic soup made with meat and various vegetables.",
    calories: 220,
    nutrients: {
      protein: "15g",
      fat: "10g",
      carbs: "18g",
      fiber: "3g",
      sugar: "4g",
    },
    imageUrl:
      "https://img.iamcook.ru/2023/upl/recipes/cat/u-033c4d9fea92aff22acc34fa7f52a9f9.jpg",
  },
  {
    id: 8,
    name: "Dimlama",
    foodGroup: "Vegetables",
    composition: "Meat, Potatoes, Cabbage, Peppers, Onions, Spices",
    description:
      "A slow-cooked stew of layered meat and vegetables, rich in flavor.",
    calories: 400,
    nutrients: {
      protein: "18g",
      fat: "18g",
      carbs: "40g",
      fiber: "7g",
      sugar: "6g",
    },
    imageUrl: "https://i.ytimg.com/vi/wltrOi1WbTY/maxresdefault.jpg",
  },
  {
    id: 9,
    name: "Naryn",
    foodGroup: "Grains",
    composition: "Thin Noodles, Boiled Meat, Onions, Spices",
    description:
      "A cold dish featuring thinly sliced boiled meat mixed with hand-cut noodles.",
    calories: 350,
    nutrients: {
      protein: "20g",
      fat: "12g",
      carbs: "40g",
      fiber: "3g",
      sugar: "2g",
    },
    imageUrl:
      "https://www.anitasfeast.com/blog/wp-content/uploads/2021/01/7007070.jpg",
  },
  {
    id: 10,
    name: "Non (Tandoor Bread)",
    foodGroup: "Grains",
    composition: "Flour, Water, Yeast, Salt",
    description:
      "Traditional round bread baked in a clay oven called a tandoor.",
    calories: 200,
    nutrients: {
      protein: "6g",
      fat: "1g",
      carbs: "42g",
      fiber: "2g",
      sugar: "1g",
    },
    imageUrl:
      "https://cdn.trt.net.tr/images/xlarge/rectangle/7e35/1ad8/741d/6060da5b5ca20.jpg?time=1732088472",
  },
  {
    id: 11,
    name: "Qazi",
    foodGroup: "Protein Foods",
    composition: "Horse Meat Sausage, Spices",
    description:
      "A seasoned sausage made from horse meat, typically served during special occasions.",
    calories: 300,
    nutrients: {
      protein: "25g",
      fat: "22g",
      carbs: "0g",
      fiber: "0g",
      sugar: "0g",
    },
    imageUrl: "https://media.express24.uz/r/:w/:h/XVpE-hVQXbO5SX6sIOrFt.jpg",
  },
  {
    id: 12,
    name: "Mastava",
    foodGroup: "Vegetables",
    composition: "Rice, Meat, Tomatoes, Carrots, Spices",
    description:
      "A comforting rice soup with meat and vegetables, lighter than plov.",
    calories: 250,
    nutrients: {
      protein: "15g",
      fat: "8g",
      carbs: "30g",
      fiber: "4g",
      sugar: "5g",
    },
    imageUrl:
      "https://cdn.lifehacker.ru/wp-content/uploads/2022/08/115_1659695526-scaled-e1675945916880-1280x640.jpg",
  },
  {
    id: 13,
    name: "Beshbarmak",
    foodGroup: "Protein Foods",
    composition: "Boiled Meat, Flat Noodles, Onions, Broth",
    description:
      "Boiled meat served over flat noodles, often topped with onions and broth.",
    calories: 500,
    nutrients: {
      protein: "30g",
      fat: "20g",
      carbs: "50g",
      fiber: "3g",
      sugar: "2g",
    },
    imageUrl:
      "https://blog.remitly.com/wp-content/uploads/2023/09/kyrgyzstan-beshbarmak-scaled.jpg",
  },
  {
    id: 14,
    name: "Chalop",
    foodGroup: "Dairy",
    composition: "Sour Milk or Yogurt, Cucumbers, Herbs, Radishes",
    description:
      "A refreshing cold soup made from sour milk or yogurt and fresh vegetables.",
    calories: 100,
    nutrients: {
      protein: "5g",
      fat: "3g",
      carbs: "12g",
      fiber: "2g",
      sugar: "6g",
    },
    imageUrl:
      "https://static.1000.menu/img/content-v2/b3/39/49582/chalop-uzbekskaya-okroshka_1597141170_11_max.jpg",
  },
  {
    id: 15,
    name: "Chakka",
    foodGroup: "Dairy",
    composition: "Strained Yogurt, Herbs",
    description:
      "Thick, strained yogurt often mixed with herbs and used as a dip or spread.",
    calories: 120,
    nutrients: {
      protein: "8g",
      fat: "5g",
      carbs: "9g",
      fiber: "0g",
      sugar: "7g",
    },
    imageUrl:
      "https://i.ytimg.com/vi/elhyrXBPK3w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDnbr7t3FhbF9aif1VyvfKknbEIDQ",
  },
  {
    id: 16,
    name: "Kebab",
    foodGroup: "Protein Foods",
    composition: "Grilled Meat Skewers, Lamb or Beef, Spices",
    description:
      "Various grilled meat skewers seasoned and cooked over charcoal.",
    calories: 320,
    nutrients: {
      protein: "28g",
      fat: "22g",
      carbs: "1g",
      fiber: "0g",
      sugar: "0g",
    },
    imageUrl:
      "https://cookingorgeous.com/wp-content/uploads/2021/06/lamb-shish-kebab-20.jpg",
  },
  {
    id: 17,
    name: "Khonum",
    foodGroup: "Grains",
    composition: "Dough Rolls, Minced Meat, Vegetables, Spices",
    description:
      "Steamed dough rolls filled with minced meat and vegetables, sliced and served with sauce.",
    calories: 280,
    nutrients: {
      protein: "14g",
      fat: "8g",
      carbs: "35g",
      fiber: "3g",
      sugar: "2g",
    },
    imageUrl:
      "https://7ladies.uz/wp-content/uploads/2023/08/photo_4_2023-09-13_15-00-24.jpg",
  },
  {
    id: 18,
    name: "Norin",
    foodGroup: "Grains",
    composition: "Thin Noodles, Finely Chopped Boiled Meat, Spices",
    description:
      "Thin noodles mixed with finely chopped boiled meat, usually served cold.",
    calories: 340,
    nutrients: {
      protein: "18g",
      fat: "10g",
      carbs: "45g",
      fiber: "2g",
      sugar: "1g",
    },
    imageUrl:
      "https://www.anitasfeast.com/blog/wp-content/uploads/2021/01/7007070.jpg",
  },
  {
    id: 19,
    name: "Halvaitar",
    foodGroup: "Sweets",
    composition: "Toasted Flour, Butter, Sugar",
    description:
      "A sweet treat made from toasted flour, butter, and sugar, similar to halva.",
    calories: 250,
    nutrients: {
      protein: "3g",
      fat: "10g",
      carbs: "38g",
      fiber: "1g",
      sugar: "25g",
    },
    imageUrl:
      "https://www.open.kg/uploads/posts/2020-09/1600081605_screenshot_8.png",
  },
  {
    id: 20,
    name: "Achichuk Salad",
    foodGroup: "Vegetables",
    composition: "Tomatoes, Onions, Herbs",
    description:
      "A simple yet flavorful salad of thinly sliced tomatoes and onions, seasoned with herbs.",
    calories: 80,
    nutrients: {
      protein: "2g",
      fat: "0g",
      carbs: "18g",
      fiber: "4g",
      sugar: "10g",
    },
    imageUrl:
      "https://static.1000.menu/img/content-v2/e4/ba/36347/salat-achichuk_1653203990_4_max.jpg",
  },
  {
    id: 21,
    name: "Tuhum Barak",
    foodGroup: "Grains",
    composition: "Dough, Egg Filling, Butter or Yogurt",
    description:
      "Boiled dumplings filled with a beaten egg mixture, served with melted butter or yogurt.",
    calories: 260,
    nutrients: {
      protein: "10g",
      fat: "8g",
      carbs: "35g",
      fiber: "1g",
      sugar: "2g",
    },
    imageUrl:
      "https://img.iamcook.ru/old/upl/recipes/cat/u-06ffb70fc44eb993a925c6a0e39783b1.jpg",
  },
  {
    id: 22,
    name: "Kurt",
    foodGroup: "Dairy",
    composition: "Dried Salted Cheese or Yogurt Balls",
    description:
      "Small, hard balls made from dried salted cheese or yogurt, often eaten as a snack.",
    calories: 150,
    nutrients: {
      protein: "12g",
      fat: "6g",
      carbs: "5g",
      fiber: "0g",
      sugar: "3g",
    },
    imageUrl: "https://exportal.io/files/images/items/0/158vcf54f5a3.jpg",
  },
];
