import { CartItem, JournalEntry, OrderHistoryItem, Preferences, Product, Recipe, RootsCategory } from '@/types/models';

export interface CatalogRepository {
  getCategories(): Promise<RootsCategory[]>;
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getRecipes(): Promise<Recipe[]>;
  getRecipeById(id: string): Promise<Recipe | undefined>;
  getJournalEntries(): Promise<JournalEntry[]>;
  getOrderHistory(): Promise<OrderHistoryItem[]>;
}

export interface UserStateRepository {
  getPreferences(): Promise<Preferences>;
  savePreferences(next: Preferences): Promise<void>;
  getSavedRecipeIds(): Promise<string[]>;
  saveSavedRecipeIds(ids: string[]): Promise<void>;
  getCartItems(): Promise<CartItem[]>;
  saveCartItems(items: CartItem[]): Promise<void>;
}
