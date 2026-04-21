import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockCatalogRepository, mockUserStateRepository } from '@/data/repositories/mockRepositories';
import { CartItem, JournalEntry, OrderHistoryItem, Preferences, Product, Recipe, RootsCategory } from '@/types/models';

type AppState = {
  categories: RootsCategory[];
  products: Product[];
  recipes: Recipe[];
  journal: JournalEntry[];
  history: OrderHistoryItem[];
  preferences: Preferences | null;
  savedRecipeIds: string[];
  cartItems: CartItem[];
  toggleSavedRecipe: (id: string) => Promise<void>;
  setPreferences: (next: Preferences) => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<RootsCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [history, setHistory] = useState<OrderHistoryItem[]>([]);
  const [preferences, setPrefs] = useState<Preferences | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    (async () => {
      const [c, p, r, j, h, prefs, saved, cart] = await Promise.all([
        mockCatalogRepository.getCategories(),
        mockCatalogRepository.getProducts(),
        mockCatalogRepository.getRecipes(),
        mockCatalogRepository.getJournalEntries(),
        mockCatalogRepository.getOrderHistory(),
        mockUserStateRepository.getPreferences(),
        mockUserStateRepository.getSavedRecipeIds(),
        mockUserStateRepository.getCartItems(),
      ]);
      setCategories(c);
      setProducts(p);
      setRecipes(r);
      setJournal(j);
      setHistory(h);
      setPrefs(prefs);
      setSavedRecipeIds(saved);
      setCartItems(cart);
    })();
  }, []);

  const value = useMemo<AppState>(
    () => ({
      categories,
      products,
      recipes,
      journal,
      history,
      preferences,
      savedRecipeIds,
      cartItems,
      async toggleSavedRecipe(id) {
        const next = savedRecipeIds.includes(id) ? savedRecipeIds.filter((x) => x !== id) : [...savedRecipeIds, id];
        setSavedRecipeIds(next);
        await mockUserStateRepository.saveSavedRecipeIds(next);
      },
      async setPreferences(next) {
        setPrefs(next);
        await mockUserStateRepository.savePreferences(next);
      },
      async addToCart(productId) {
        const found = cartItems.find((item) => item.productId === productId);
        const next = found
          ? cartItems.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
          : [...cartItems, { productId, quantity: 1 }];
        setCartItems(next);
        await mockUserStateRepository.saveCartItems(next);
      },
      async clearCart() {
        setCartItems([]);
        await mockUserStateRepository.saveCartItems([]);
      },
    }),
    [cartItems, categories, history, journal, preferences, products, recipes, savedRecipeIds],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used under AppStateProvider');
  return ctx;
}
