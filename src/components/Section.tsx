import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme/tokens';

export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  title: { fontSize: typography.subtitle, color: colors.text, fontWeight: '700', marginBottom: spacing.sm },
});
