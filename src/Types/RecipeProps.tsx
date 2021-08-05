export interface RecipeProps {
  objectID: string;
  cookingTime: number;
  image: string;
  date: number;
  dateString?: string;
  difficulty: number;
  filters: string[];
  ingredients: [];
  introduction: string;
  portions: [];
  preparationTime: number;
  recipe: string[];
  title: string;
}
