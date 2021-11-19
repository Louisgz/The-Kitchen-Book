export interface NewItemsProps {
  title: string;
  introduction?: string;
  filters: string[];
  cookingTime?: number;
  preparationTime?: number;
  difficulty?: number;
  portions: string[];
  ingredients?: any;
  recipe?: string[];
  image: string;
  dateString: string;
  date: Date;
  id: string;
}
