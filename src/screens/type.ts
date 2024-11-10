export interface Meal {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  recipe: string;
  ingredients: string;
  category_id: null | number;
  mode: null | string;
  meal_type: null | string;
}
