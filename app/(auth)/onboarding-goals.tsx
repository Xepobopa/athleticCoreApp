import Button from '@/components/Button';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ViewHighlighter from '@/components/view-highlighter';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles as globalStyles } from './styles';
import { useAuth } from '@/hooks/use-auth';
import { GoalType, User } from '@/services/storageService';

const goalsOptions: { label: string; id: GoalType }[] = [
  { label: 'Схуднути', id: 'fat_loss' },
  { label: "Нарощування м'язів", id: 'muscle' },
  { label: 'Підтримувати форму', id: 'fit' },
];

export default function OnboardingGoalsScreen() {
  const router = useRouter();
  const { updateUser, user: loggedUser, login } = useAuth();
   
  const [goal, setGoal] = useState<string | null>(null);
  const [days, setDays] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<string | null>(null);

  const handleFinish = () => {
    if (!loggedUser) {
      return
    }

    // find selected goal id and update in user
    const selectedGoal = goalsOptions.find(opt => opt.label === goal);
    if (selectedGoal) {
      updateUser({ goal: selectedGoal.id, id: loggedUser.id } as User).then(() => {
        console.log(loggedUser);
        // relogin to update user data in context
        login(loggedUser.email, loggedUser.password)
      }).catch(e => {
        console.log('Error updating user goal', e);
      });
    };
    
    router.replace('/(tabs)/diary');
  }

  const SelectionBlock = ({ title, options, selectedValue, onSelect, iconName }: any) => (
    <View style={styles.block}>
      <View style={styles.blockHeader}>
        <IconSymbol name={iconName} size={20} color="#FF5F1F" />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((opt: string) => (
          <TouchableOpacity 
            key={opt} 
            style={styles.optionWrapper}
            activeOpacity={0.7}
            onPress={() => onSelect(opt)}
          >
            <ViewHighlighter 
              style={{
                ...styles.optionContainer,
                ...(selectedValue === opt ? styles.optionSelected : {}),
              }}
            >
              <ThemedText 
                style={selectedValue === opt ? styles.textSelected : styles.textUnselected}
              >
                {opt}
              </ThemedText>
            </ViewHighlighter>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Goals & Preferences</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Ще кілька речей, щоб налаштувати вашу програму
          </ThemedText>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <SelectionBlock 
            title="Мета"
            iconName="target"
            options={goalsOptions.map(opt => opt.label)}
            selectedValue={goal}
            onSelect={setGoal}
          />

          <SelectionBlock 
            title="Частота тренувань"
            iconName="calendar.badge.clock"
            options={['1-2', '3-4', '5+']}
            selectedValue={days}
            onSelect={setDays}
          />

          <SelectionBlock 
            title="Обладнання"
            iconName="dumbbell"
            options={['Тренажерний зал', 'Гантелі', 'Домашнє обладнання']}
            selectedValue={equipment}
            onSelect={setEquipment}
          />
        </ScrollView>

        <Button 
          text="Закінчити" 
          style={globalStyles.loginButton} 
          textStyle={{ color: '#fff', fontSize: 16 }}
          onClick={handleFinish} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    color: '#666',
    marginTop: 8,
  },
  scrollContent: {
    gap: 32,
    paddingBottom: 20,
  },
  block: {
    gap: 16,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionWrapper: {
    flexGrow: 1, 
  },
  optionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#FF5F1F',
    backgroundColor: '#FFF5F2',
  },
  textSelected: {
    color: '#FF5F1F',
    fontWeight: '600',
  },
  textUnselected: {
    color: '#333',
  }
});