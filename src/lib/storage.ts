import * as SecureStore from 'expo-secure-store';

export const storageKeys = {
  preferences: 'roots.preferences',
  savedRecipes: 'roots.savedRecipes',
  cart: 'roots.cart',
};

export async function getStoredJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await SecureStore.getItemAsync(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setStoredJson<T>(key: string, value: T): Promise<void> {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}
