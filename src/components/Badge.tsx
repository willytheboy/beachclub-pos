import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: colors.primarySoft, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  text: { color: colors.primary, fontWeight: '600', fontSize: typography.caption },
});
