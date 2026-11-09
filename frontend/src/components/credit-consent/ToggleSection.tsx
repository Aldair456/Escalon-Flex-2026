import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

import { ToggleRow } from './ToggleRow';

type ToggleSectionItem = {
  id: string;
  title: string;
  description: string;
  locked?: boolean;
};

type ToggleSectionProps = {
  title: string;
  items: ToggleSectionItem[];
  values: Record<string, boolean>;
  onToggle: (id: string, value: boolean) => void;
};

export function ToggleSection({ title, items, values, onToggle }: ToggleSectionProps) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.card}>
        {items.map((item, index) => (
          <ToggleRow
            key={item.id}
            title={item.title}
            description={item.description}
            value={values[item.id]}
            onValueChange={(value) => onToggle(item.id, value)}
            disabled={item.locked}
            showBorder={index < items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
});
