export interface RecipeProps {
    id: number;
    name: string;
    cuisine: string;
    image: string;
    caloriesPerServing: number;
    difficulty: string;
    cookTimeMinutes: string;
    ingredients: string[];
    instructions: string[];
    mealType: string[];
    rating: number;
    reviewCount: number;
    servings: number;
    tags: string[];
    prepTimeMinutes: number;
  }