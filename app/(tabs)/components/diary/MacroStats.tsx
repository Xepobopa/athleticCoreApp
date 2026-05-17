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
                <ThemedText type='title' style={{fontSize: 40}}>{value.kcal}</ThemedText>
                <ThemedText type='subtitle'>/ {target.kcal} ккал</ThemedText>
            </View>

            <View style={styles.macrosContainer}>
              <View style={styles.row}>
                <MacroRow label="Білки" current={value.protein} max={target.protein} color="#0070EB" />
                <MacroRow label="Вуг." current={value.carb} max={target.carb} color="#009DE4" />
                <MacroRow label="Жири" current={value.fat} max={target.fat} color="#FFB59C" />
              </View>
              <View style={styles.row}>
                <MacroRow label="Cіль" current={value.salt} max={target.salt} color="#bad5f1" />
                <MacroRow label="Волокна" current={value.fiber} max={target.fiber} color="#a8ff9c" />
                <MacroRow 
                  label="Вода" 
                  current={value.water}
                  curStr={(value.water / 1000).toFixed(1)} 
                  max={target.water}
                  maxStr={(target.water / 1000).toFixed(1)} 
                  unit="л" 
                  color="#00b3e4" />
              </View>
            </View>
        </View>
    )
}

const MacroRow = ({ label, current, max, color, unit = "г", curStr, maxStr }: { 
  label: string, current: number, max: number, color: string, unit?: string, curStr?: string, maxStr?: string
}) => {
    const progress = Math.min(100, (current / max) * 100) || 0;
    console.log("progress: ", progress)

    return (
      <View style={styles.macroRow}>
        <View style={styles.macroTextCol}>
          <ThemedText type="defaultSemiBold" style={styles.macroLabel}>{label}</ThemedText>
          <ThemedText style={styles.macroValue}>
            {curStr || current.toFixed(0)} / {maxStr || max.toFixed(0)}{unit}
            </ThemedText>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        gap: 28
    },
    circleChartPlaceholder: {
        width: '100%',
        aspectRatio: 1,
        // height: 300,
        borderRadius: '50%',
        borderWidth: 16,
        borderColor: '#FF5F1F',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFF5F2',
    },
    macrosContainer: {
        gap: 12,
    },
  macroRow: {
    width: '30%',
    gap: 6,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  macroTextCol: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
})
