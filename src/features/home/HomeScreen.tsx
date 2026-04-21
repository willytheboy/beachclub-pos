import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { useAppState } from '@/app/state';
import { colors, spacing, typography } from '@/theme/tokens';

export function HomeScreen() {
  const { products, journal, recipes, categories } = useAppState();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image style={styles.heroImage} source={{ uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6' }} />
      <Text style={styles.heroTitle}>ROOTS</Text>
      <Text style={styles.heroCopy}>Farm-picked produce, stories, and recipes from growers you can trust.</Text>

      <Section title="Featured Harvest">
        {products.slice(0, 2).map((p) => (
          <Card key={p.id}>
            <Text style={styles.itemTitle}>{p.name}</Text>
            <Text style={styles.muted}>{p.shortDescription}</Text>
          </Card>
        ))}
      </Section>

      <Section title="Latest Journal">
        {journal.slice(0, 2).map((entry) => (
          <Card key={entry.id}>
            <Text style={styles.itemTitle}>{entry.title}</Text>
            <Text style={styles.muted}>{entry.excerpt}</Text>
          </Card>
        ))}
      </Section>

      <Section title="Featured Recipes">
        {recipes.slice(0, 2).map((recipe) => (
          <Card key={recipe.id}>
            <Text style={styles.itemTitle}>{recipe.title}</Text>
            <Text style={styles.muted}>{recipe.summary}</Text>
          </Card>
        ))}
      </Section>

      <Section title="Quick Categories">
        <View style={styles.row}>
          {categories.map((c) => (
            <Card key={c.id}>
              <Text>{`${c.emoji} ${c.name}`}</Text>
            </Card>
          ))}
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  heroImage: { width: '100%', height: 190, borderRadius: 16, marginBottom: spacing.md },
  heroTitle: { fontSize: typography.title, fontWeight: '700', color: colors.text },
  heroCopy: { color: colors.muted, marginBottom: spacing.lg },
  itemTitle: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  muted: { color: colors.muted },
  row: { gap: spacing.sm },
});
