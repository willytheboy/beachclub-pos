import { categories, journal, orderHistory, products, recipes } from '@/data/seeds/catalog';
import { storageKeys, getStoredJson, setStoredJson } from '@/lib/storage';
import { CartItem, Preferences } from '@/types/models';
import { CatalogRepository, UserStateRepository } from './types';

const defaultPreferences: Preferences = {
  favoriteCategories: ['leafy'],
  dietaryFocus: ['Vegetarian'],
  newsletterOptIn: true,
};

export const mockCatalogRepository: CatalogRepository = {
  async getCategories() {
    return categories;
  },
  async getProducts() {
    return products;
  },
  async getProductById(id) {
    return products.find((p) => p.id === id);
  },
  async getRecipes() {
    return recipes;
  },
  async getRecipeById(id) {
    return recipes.find((r) => r.id === id);
  },
  async getJournalEntries() {
    return journal;
  },
  async getOrderHistory() {
    return orderHistory;
  },
};

export const mockUserStateRepository: UserStateRepository = {
  async getPreferences() {
    return getStoredJson(storageKeys.preferences, defaultPreferences);
  },
  async savePreferences(next) {
    return setStoredJson(storageKeys.preferences, next);
  },
  async getSavedRecipeIds() {
    return getStoredJson<string[]>(storageKeys.savedRecipes, []);
  },
  async saveSavedRecipeIds(ids) {
    return setStoredJson(storageKeys.savedRecipes, ids);
  },
  async getCartItems() {
    return getStoredJson<CartItem[]>(storageKeys.cart, []);
  },
  async saveCartItems(items) {
    return setStoredJson(storageKeys.cart, items);
  },
};

// TODO(phase2): Add supabaseCatalogRepository implementing CatalogRepository.
// TODO(phase2): Add supabaseUserStateRepository for synced user profile data.
