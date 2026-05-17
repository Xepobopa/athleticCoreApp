import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ViewHighlighter from '@/components/view-highlighter';
import { Program, PROGRAMS_DATA } from '@/constants/mockData';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Image } from 'expo-image';
import IntenseBadge from '../components/Intense';

export default function ProgramDetailsScreen() {
  const { id: programId } = useLocalSearchParams();
  const router = useRouter();
  const [program, setProgram] = React.useState<Program | undefined>(undefined);
  const navigation = useNavigation()

  useEffect(() => {
    console.log(`Im in (tabs)/(programs)/program/[${programId}].tsx, programId:`);
    const program = PROGRAMS_DATA.find(p => p.id === programId);
    setProgram(program);
  
    if (program) {
      navigation.setOptions({ 
          title: program.title,
          headerTitle: program.title
        });
    } else {
      navigation.setOptions({ 
          title: "Програма тренувань",
          headerTitle: "Програма тренувань"
        });
    }
  }, [programId]);

  if (!program) {
    return (
      <ScreenWrapper style={styles.centerContainer}>
        <ThemedText>Програму не знайдено :(</ThemedText>
      </ScreenWrapper>
    );
  }
  
  return (
    <ScreenWrapper showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.description}>{program.description}</ThemedText>

        <View>
          <Image source={{ uri: program.img_url }} style={styles.programImage} />
          { program.isIntense && <IntenseBadge isAbsolute={true} />}
        </View>

        <View style={styles.calendarContainer}>
          {program.days.map((day) => (
            <View key={day.day} style={styles.dayBlock}>
              <ThemedText type="defaultSemiBold" style={styles.dayTitle}>
                День {day.day} • {day.title}
              </ThemedText>

              {day.exercises && day.exercises.length > 0 ? (
                day.exercises.map((exercise) => (
                  <TouchableOpacity
                    key={exercise.id}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/(tabs)/(programs)/exercise/${exercise.id}`)}
                  >
                    <ViewHighlighter style={styles.exerciseCard}>
                      <View style={styles.exerciseInfo}>
                        <ThemedText type="defaultSemiBold">{exercise.name}</ThemedText>
                        <ThemedText style={styles.musclesText} numberOfLines={1}>
                          {exercise.muscles.join(', ')}
                        </ThemedText>
                      </View>
                      <IconSymbol name="play.circle.fill" size={28} color="#FF5F1F" />
                    </ViewHighlighter>
                  </TouchableOpacity>
                ))
              ) : (
                <ViewHighlighter style={styles.restCard}>
                  <ThemedText style={styles.restText}>Відпочинок</ThemedText>
                  <IconSymbol name="moon.zzz.fill" size={24} color="#A0A0A0" />
                </ViewHighlighter>
              )}
            </View>
          ))}
        </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  description: {
    color: '#666',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  programImage: {
    width: '100%',
    height: 200,
    marginBottom: 24,
    borderRadius: 16,
  },
  calendarContainer: {
    gap: 24,
  },
  dayBlock: {
    gap: 12,
  },
  dayTitle: {
    fontSize: 18,
    color: '#333',
    marginLeft: 4,
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  exerciseInfo: {
    flex: 1,
    paddingRight: 16,
    gap: 4,
  },
  musclesText: {
    color: '#888',
    fontSize: 13,
  },
  restCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderColor: '#EAEAEA',
  },
  restText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
  }
});