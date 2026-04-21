import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text } from 'react-native';
import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { useAppState } from '@/app/state';
import { colors, spacing } from '@/theme/tokens';

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free'];

export function ProfileScreen() {
  const { categories, preferences, setPreferences, savedRecipeIds, recipes } = useAppState();
  const [editing, setEditing] = useState(false);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>(preferences?.favoriteCategories ?? []);
  const [dietaryFocus, setDietaryFocus] = useState<string[]>(preferences?.dietaryFocus ?? []);
  const [newsletterOptIn, setNewsletterOptIn] = useState(preferences?.newsletterOptIn ?? false);
  const toggle = (items: string[], value: string) => (items.includes(value) ? items.filter((i) => i !== value) : [...items, value]);

  if (editing) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => setEditing(false)}><Text style={styles.back}>← Back to Profile</Text></Pressable>
        <Text style={styles.title}>Favorite Categories</Text>
        {categories.map((c) => <Chip key={c.id} label={`${c.emoji} ${c.name}`} active={favoriteCategories.includes(c.id)} onPress={() => setFavoriteCategories(toggle(favoriteCategories, c.id))} />)}
        <Text style={styles.title}>Dietary Focus</Text>
        {dietaryOptions.map((option) => <Chip key={option} label={option} active={dietaryFocus.includes(option)} onPress={() => setDietaryFocus(toggle(dietaryFocus, option))} />)}
        <Text style={styles.title}>Newsletter</Text>
        <Switch value={newsletterOptIn} onValueChange={setNewsletterOptIn} />
        <Pressable onPress={async () => { await setPreferences({ favoriteCategories, dietaryFocus, newsletterOptIn }); setEditing(false); }} style={styles.button}><Text style={styles.buttonText}>Save Preferences</Text></Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.title}>Preferences</Text>
        <Text>{`Favorite categories: ${preferences?.favoriteCategories.join(', ') ?? '-'}`}</Text>
        <Text>{`Dietary focus: ${preferences?.dietaryFocus.join(', ') ?? '-'}`}</Text>
        <Text>{`Newsletter: ${preferences?.newsletterOptIn ? 'On' : 'Off'}`}</Text>
        <Pressable onPress={() => setEditing(true)} style={styles.button}><Text style={styles.buttonText}>Edit Preferences</Text></Pressable>
      </Card>
      <Card>
        <Text style={styles.title}>Saved Recipes</Text>
        {recipes.filter((r) => savedRecipeIds.includes(r.id)).map((r) => <Text key={r.id}>{r.title}</Text>)}
      </Card>
      <Card>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.muted}>Settings placeholder for notification + account controls.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.sm },
  button: { marginTop: spacing.sm, backgroundColor: colors.primary, borderRadius: 8, padding: spacing.sm },
  buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  muted: { color: colors.muted },
  back: { color: colors.primary, fontWeight: '700', marginBottom: spacing.sm },
});
