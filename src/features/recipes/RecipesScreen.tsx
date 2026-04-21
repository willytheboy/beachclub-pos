import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { useAppState } from '@/app/state';
import { colors, spacing } from '@/theme/tokens';

export function RecipesScreen() {
  const { recipes, products, savedRecipeIds, toggleSavedRecipe } = useAppState();
  const [query, setQuery] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId);
  const filtered = useMemo(() => recipes.filter((r) => r.title.toLowerCase().includes(query.trim().toLowerCase())), [query, recipes]);

  if (selectedRecipe) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => setSelectedRecipeId(null)}><Text style={styles.back}>← Back to Recipes</Text></Pressable>
        <Text style={styles.title}>{selectedRecipe.title}</Text>
        <Text style={styles.muted}>{selectedRecipe.summary}</Text>
        <View style={styles.row}>{selectedRecipe.dietaryTags.map((tag) => <Badge key={tag} label={tag} />)}</View>
        <Card><Text>{`Prep ${selectedRecipe.prepMinutes}m • Cook ${selectedRecipe.cookMinutes}m • Serves ${selectedRecipe.servings} • ${selectedRecipe.difficulty}`}</Text></Card>
        <Section title="Ingredients"><Card><Text>{selectedRecipe.ingredients.join('\n')}</Text></Card></Section>
        <Section title="Steps"><Card><Text>{selectedRecipe.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}</Text></Card></Section>
        <Section title="Linked Products">
          {products.filter((p) => selectedRecipe.linkedProductIds.includes(p.id)).map((p) => <Card key={p.id}><Text>{p.name}</Text></Card>)}
        </Section>
        <Pressable style={styles.button} onPress={() => toggleSavedRecipe(selectedRecipe.id)}>
          <Text style={styles.buttonText}>{savedRecipeIds.includes(selectedRecipe.id) ? 'Remove from Saved' : 'Save Recipe'}</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TextInput value={query} onChangeText={setQuery} placeholder="Search recipes" style={styles.input} />
      {filtered.map((recipe) => (
        <Pressable key={recipe.id} onPress={() => setSelectedRecipeId(recipe.id)}>
          <Card>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.muted}>{recipe.summary}</Text>
            <View style={styles.row}>{recipe.dietaryTags.map((tag) => <Badge key={tag} label={tag} />)}</View>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: spacing.sm, marginBottom: spacing.md },
  title: { fontWeight: '700' },
  muted: { color: colors.muted, marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap', marginBottom: spacing.sm },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: spacing.md, marginBottom: spacing.xl },
  buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  back: { color: colors.primary, fontWeight: '700', marginBottom: spacing.sm },
});
