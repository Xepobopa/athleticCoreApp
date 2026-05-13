import { ThemedText } from "@/components/themed-text";
import { Calories } from "@/services/MacroService";
import React from "react";
import { StyleSheet, View } from "react-native";

export interface MacroStatsProps {
    value: Calories,
    target: Calories,
}

export default function MacroStats({ value, target }: MacroStatsProps) {
    return (
        <View style={styles.container}>
            <View style={styles.circleChartPlaceholder}>
                <ThemedText type='subtitle'>{value.kcal}</ThemedText>
                <ThemedText type='small'>/ {target.kcal} kcal</ThemedText>
            </View>

            <View style={styles.macrosContainer}>
                <MacroRow label="Protein" current={value.protein} max={target.protein} color="#0070EB" />
                <MacroRow label="Carbs" current={value.carb} max={target.carb} color="#009DE4" />
                <MacroRow label="Fat" current={value.fat} max={target.fat} color="#FFB59C" />
            </View>
        </View>
    )
}

const MacroRow = ({ label, current, max, color }: { label: string, current: number, max: number, color: string }) => {
    const progress = Math.min(100, (current / max) * 100) || 0;
    console.log("progress: ", progress)

    return (
      <View style={styles.macroRow}>
        <View style={styles.macroTextRow}>
          <ThemedText type="defaultSemiBold" style={styles.macroLabel}>{label}</ThemedText>
          <ThemedText style={styles.macroValue}>{current.toFixed(2)} / {max}g</ThemedText>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    circleChartPlaceholder: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        borderWidth: 12,
        borderColor: '#FF5F1F',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFF5F2',
    },
    macrosContainer: {
        gap: 12,
    },
    macroRow: {
    gap: 6,
  },
  macroTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 14,
    color: '#333',
  },
  macroValue: {
    fontSize: 14,
    color: '#888',
  },
  progressBarBackground: {
    height: 9,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
})
