export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  difficulty: string;
}

export interface DietOption {
  value: string;
  label: string;
}
