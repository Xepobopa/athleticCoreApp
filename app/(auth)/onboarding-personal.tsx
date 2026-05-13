import Button from '@/components/Button';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ViewHighlighter from '@/components/view-highlighter';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { styles as globalStyles } from './styles';
import { User } from '@/services/storageService';
import { calculateAllMacros, Calories } from '@/services/MacroService';
import { SetUserKcalTarget } from '@/services/diaryService';

export default function OnboardingPersonalScreen() {
  const router = useRouter();
  const { updateUser, user: loggedUser, login } = useAuth();
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const handleNext = () => {
    if (!loggedUser) {
      return;
    }

    if (
      !name ||
      weight == null ||
      height == null ||
      age == null ||
      weight <= 0 ||
      height <= 0 ||
      age <= 0
    ) {
      // TODO: error
      return;
    }

    updateUser({ weight, height, age, name, id: loggedUser.id } as User).then(() => {
        // also calculate ans save target calories
        const calories = calculateAllMacros(weight, height, age, loggedUser.goal)
        SetUserKcalTarget(loggedUser.id, calories)
        login(loggedUser.email, loggedUser.password)
    })

    router.push('/(auth)/onboarding-goals');
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView 
        contentContainerStyle={styles.container} bottomOffset={150}>
        <View style={styles.header}>
          <ThemedText type="title">Personal Details</ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Let's get to know you better to customize your experience.
          </ThemedText>
        </View>

        <View style={styles.form}>
          {/* Weight Input */}
          <ViewHighlighter style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <IconSymbol name="scalemass" size={24} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold">Weight</ThemedText>
            </View>
            <View style={styles.valueRow}>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#A0A0A0"
                value={weight?.toString()}
                onChangeText={(t) => setWeight(Number(t))}
              />
              <ThemedText type="default" style={styles.unit}>kg</ThemedText>
            </View>
          </ViewHighlighter>

          {/* Height Input */}
          <ViewHighlighter style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <IconSymbol name="ruler" size={24} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold">Height</ThemedText>
            </View>
            <View style={styles.valueRow}>
              <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#A0A0A0"
                value={height?.toString()}
                onChangeText={(t) => setHeight(Number(t))}
              />
              <ThemedText type="default" style={styles.unit}>cm</ThemedText>
            </View>
          </ViewHighlighter>

          {/* Age Input */}
          <ViewHighlighter style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <IconSymbol name="calendar" size={24} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold">Age</ThemedText>
            </View>
            <View style={styles.valueRow}>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor="#A0A0A0"
                value={age?.toString()}
                onChangeText={(t) => setAge(Number(t))}
              />
              <ThemedText type="default" style={styles.unit}>yo</ThemedText>
            </View>
          </ViewHighlighter>

          <ViewHighlighter style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <IconSymbol name="person.fill" size={24} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold">Name</ThemedText>
            </View>
            <View style={styles.valueRow}>
              <TextInput
                style={styles.input}
                placeholder="Tom Platz"
                placeholderTextColor="#A0A0A0"
                value={name}
                onChangeText={setName}
              />
              <ThemedText type="default" style={styles.unit}></ThemedText>
            </View>
          </ViewHighlighter>
        </View>

        <Button 
          text="Next" 
          style={globalStyles.loginButton} 
          textStyle={{ color: '#fff', fontSize: 16 }}
          onClick={handleNext} 
        />
      </KeyboardAwareScrollView>
      {/* <KeyboardToolbar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        ...globalStyles.mainContainer,
        paddingTop: 20,
    },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  subtitle: {
    color: '#666',
    marginTop: 8,
  },
  form: {
    flex: 1,
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20, // Немного увеличим отступы для iOS
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold', // Используй свой шрифт, если он настроен
    minWidth: 40,
    textAlign: 'right',
  },
  unit: {
    color: '#666',
  }
});