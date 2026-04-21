export type RootsCategory = {
  id: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  flavorNotes: string[];
  prepNotes: string[];
  storageNotes: string;
  pairings: string[];
  nutritionHighlights: string[];
  seasonalityNote: string;
  linkedRecipeIds: string[];
  imageUrl: string;
  inStock: boolean;
  price: number;
};

export type Recipe = {
  id: string;
  title: string;
  summary: string;
  ingredients: string[];
  steps: string[];
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  linkedProductIds: string[];
  dietaryTags: string[];
  imageUrl: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
};

export type OrderHistoryItem = {
  id: string;
  placedAt: string;
  total: number;
  itemNames: string[];
};

export type Preferences = {
  favoriteCategories: string[];
  dietaryFocus: string[];
  newsletterOptIn: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
