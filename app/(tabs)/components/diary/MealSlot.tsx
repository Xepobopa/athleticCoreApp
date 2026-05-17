import Button from '@/components/Button';
import { ThemedText } from '@/components/themed-text';
import ViewHighlighter from '@/components/view-highlighter';
import { Meal } from '@/services/MacroService';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Define the props for the component
type MealSlotProps = {
  title: string;
  icon: React.ReactNode,
  items: Meal[];
  isEditable: boolean
  onAddPress?: () => void;
};

export default function MealSlot({ title, icon, items, isEditable, onAddPress }: MealSlotProps) {
  return (
    <ViewHighlighter style={styles.mealCard}>
      <View style={styles.mealHeader}>
        {icon}
        <ThemedText type="defaultSemiBold" style={styles.mealTitle}>
          {title}
        </ThemedText>
        {/* <TouchableOpacity 
          activeOpacity={0.7} 
          style={styles.addButton}
          onPress={onAddPress}
        >
          <IconSymbol name="plus" size={20} color="#FF5F1F" />
        </TouchableOpacity> */}
      </View>
      
      {items.length > 0 ? (
        <View style={styles.mealItems}>
          {items.map((item, idx) => (
            <View style={styles.mealItemRow} key={"food_id_" + idx}>
                <View key={item.name + item.kcal.kcal}>
                    <ThemedText type='defaultSemiBold' style={{ fontSize: 14 }}>{item.name}</ThemedText>
                    {/* <ThemedText ={'small'}></ThemedText> */}
                    <ThemedText type='small' style={{ color: '#888' }}>
                        Б: {item.kcal.protein} • В: {item.kcal.carb} • Ж: {item.kcal.fat}
                    </ThemedText>
                </View>
                <ThemedText style={styles.mealItemKcal}>{item.kcal.kcal} ккал</ThemedText>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyMeal}>
          <ThemedText style={styles.emptyMealText}>Їжа ще не додана</ThemedText>
        </View>
      )}

        {
            isEditable && (
                <Button 
                  text='Додати' 
                  style={styles.addButton}
                  onClick={onAddPress}
                  IconLeft={<SymbolView name='plus' tintColor={'black'} size={20}/>}/>
            )
        }
    </ViewHighlighter>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: '100%',
    backgroundColor: "#D8E2FF",
    marginTop: 16
  },
  mealCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16, // Added to provide spacing between multiple meal slots
  },
  mealHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
  },
  mealItems: {
    marginTop: 16,
    gap: 12,
  },
  mealItemRow: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 8,
  },
  mealItemName: {
    fontSize: 16,
    color: '#444',
  },
  mealItemKcal: {
    fontSize: 15,
    color: '#888',
  },
  emptyMeal: {
    marginTop: 16,
    paddingVertical: 8,
  },
  emptyMealText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
  }
});