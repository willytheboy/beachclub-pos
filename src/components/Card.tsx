import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
});
