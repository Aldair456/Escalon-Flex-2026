import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';
import { radii } from '@/theme/radii';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const WEEKDAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const CELL_SIZE = 38;

type CalendarProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
};

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Calendar({ value, onChange, minDate }: CalendarProps) {
  const earliestDate = startOfDay(minDate ?? new Date());

  const [viewDate, setViewDate] = useState(() => {
    const base = value ?? earliestDate;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;

  const canGoPrev =
    new Date(year, month, 1) > new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    setViewDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goPrevMonth} hitSlop={8} disabled={!canGoPrev}>
          <Ionicons name="chevron-back" size={20} color={canGoPrev ? colors.primary : colors.border} />
        </Pressable>

        <Text style={styles.monthLabel}>
          {MONTH_NAMES[month]} {year}
        </Text>

        <Pressable onPress={goNextMonth} hitSlop={8}>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAY_LABELS.map((label, index) => (
          <Text key={`${label}-${index}`} style={styles.weekdayLabel}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.cell} />;
          }

          const cellDate = new Date(year, month, day);
          const isPast = cellDate < earliestDate;
          const isSelected = value ? isSameDay(cellDate, value) : false;

          return (
            <Pressable
              key={day}
              style={[styles.cell, isSelected && styles.cellSelected]}
              disabled={isPast}
              onPress={() => onChange(cellDate)}>
              <Text
                style={[
                  styles.dayLabel,
                  isPast && styles.dayLabelDisabled,
                  isSelected && styles.dayLabelSelected,
                ]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    textTransform: 'capitalize',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayLabel: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CELL_SIZE / 2,
  },
  cellSelected: {
    backgroundColor: colors.primary,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  dayLabelDisabled: {
    color: colors.dot,
  },
  dayLabelSelected: {
    color: colors.white,
    fontWeight: '800',
  },
});
