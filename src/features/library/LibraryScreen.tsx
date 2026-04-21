import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { useAppState } from '@/app/state';
import { colors, spacing } from '@/theme/tokens';

export function LibraryScreen() {
  const { categories, products, recipes } = useAppState();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!activeCategory || p.categoryId === activeCategory) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [activeCategory, products, query],
  );

  if (selectedProduct) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable onPress={() => setSelectedProductId(null)}><Text style={styles.back}>← Back to Library</Text></Pressable>
        <Text style={styles.detailTitle}>{selectedProduct.name}</Text>
        <Text style={styles.muted}>{selectedProduct.shortDescription}</Text>
        <Section title="Flavor Notes"><Card><Text>{selectedProduct.flavorNotes.join(' • ')}</Text></Card></Section>
        <Section title="Prep Notes"><Card><Text>{selectedProduct.prepNotes.join('\n')}</Text></Card></Section>
        <Section title="Storage Notes"><Card><Text>{selectedProduct.storageNotes}</Text></Card></Section>
        <Section title="Pairings"><Card><Text>{selectedProduct.pairings.join(', ')}</Text></Card></Section>
        <Section title="Nutrition Highlights"><Card><Text>{selectedProduct.nutritionHighlights.join(', ')}</Text></Card></Section>
        <Section title="Seasonality"><Card><Text>{selectedProduct.seasonalityNote}</Text></Card></Section>
        <Section title="Linked Recipes">
          {recipes.filter((r) => selectedProduct.linkedRecipeIds.includes(r.id)).map((r) => <Card key={r.id}><Text>{r.title}</Text></Card>)}
        </Section>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Section title="Category Index">
        <View style={styles.chips}>
          <Chip label="All" active={!activeCategory} onPress={() => setActiveCategory(null)} />
          {categories.map((c) => <Chip key={c.id} label={`${c.emoji} ${c.name}`} active={activeCategory === c.id} onPress={() => setActiveCategory(c.id)} />)}
        </View>
      </Section>
      <TextInput placeholder="Search produce" value={query} onChangeText={setQuery} style={styles.input} />
      {filtered.map((product) => (
        <Pressable key={product.id} onPress={() => setSelectedProductId(product.id)}>
          <Card><Text style={styles.title}>{product.name}</Text><Text style={styles.muted}>{product.shortDescription}</Text></Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: spacing.sm, marginBottom: spacing.md },
  title: { fontWeight: '700', marginBottom: 4 },
  detailTitle: { fontWeight: '700', fontSize: 24 },
  muted: { color: colors.muted },
  back: { color: colors.primary, fontWeight: '700', marginBottom: spacing.sm },
});
