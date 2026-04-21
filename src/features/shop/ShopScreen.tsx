import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { useAppState } from '@/app/state';
import { colors, spacing } from '@/theme/tokens';

export function ShopScreen() {
  const { products, addToCart, cartItems, clearCart, history } = useAppState();
  const [mode, setMode] = useState<'inventory' | 'cart' | 'orders'>('inventory');
  const rows = useMemo(
    () => cartItems.map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) })).filter((r) => r.product),
    [cartItems, products],
  );

  const total = rows.reduce((sum, row) => sum + (row.product?.price ?? 0) * row.quantity, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.actions}>
        <Pressable onPress={() => setMode('inventory')} style={styles.tab}><Text>Inventory</Text></Pressable>
        <Pressable onPress={() => setMode('cart')} style={styles.tab}><Text>{`Cart (${cartItems.reduce((a, c) => a + c.quantity, 0)})`}</Text></Pressable>
        <Pressable onPress={() => setMode('orders')} style={styles.tab}><Text>Order History</Text></Pressable>
      </View>

      {mode === 'inventory' && products.map((product) => (
        <Card key={product.id}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.muted}>{`$${product.price.toFixed(2)} • ${product.inStock ? 'In stock' : 'Out of stock'}`}</Text>
          <Pressable disabled={!product.inStock} onPress={() => addToCart(product.id)} style={[styles.add, !product.inStock && styles.disabled]}>
            <Text style={styles.ctaText}>Add to Cart</Text>
          </Pressable>
        </Card>
      ))}

      {mode === 'cart' && (
        <>
          {rows.map((row) => <Card key={row.productId}><Text>{`${row.product?.name} x${row.quantity}`}</Text></Card>)}
          <Card><Text>{`Total: $${total.toFixed(2)}`}</Text></Card>
          <Pressable onPress={clearCart} style={styles.add}><Text style={styles.ctaText}>Clear Cart</Text></Pressable>
        </>
      )}

      {mode === 'orders' && history.map((order) => (
        <Card key={order.id}>
          <Text style={styles.title}>{`Order ${order.id}`}</Text>
          <Text style={styles.muted}>{`${order.placedAt} • $${order.total.toFixed(2)}`}</Text>
          <Text style={styles.muted}>{order.itemNames.join(', ')}</Text>
          <Pressable style={styles.reorder}><Text style={styles.reorderText}>Reorder</Text></Pressable>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  actions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md, flexWrap: 'wrap' },
  tab: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: spacing.sm },
  ctaText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  add: { backgroundColor: colors.primary, borderRadius: 8, padding: spacing.sm, marginTop: spacing.sm },
  disabled: { opacity: 0.5 },
  reorder: { marginTop: spacing.sm, backgroundColor: colors.primarySoft, borderRadius: 8, padding: spacing.sm },
  reorderText: { color: colors.primary, fontWeight: '700' },
  title: { fontWeight: '700' },
  muted: { color: colors.muted },
});
