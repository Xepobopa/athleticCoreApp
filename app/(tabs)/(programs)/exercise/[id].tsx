import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, ColorValue } from 'react-native';
import { useLocalSearchParams, Stack, useNavigation } from 'expo-router';
import { Exercise, PROGRAMS_DATA } from '@/constants/mockData';
import { ThemedText } from '@/components/themed-text';
import ViewHighlighter from '@/components/view-highlighter';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ScreenWrapper from '../../components/ScreenWrapper';
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from '@/constants/theme';

export default function ExerciseDetailsScreen() {
  const { id: exerciseId } = useLocalSearchParams();
  const [exercise, setExercise] = React.useState<Exercise | undefined>(undefined);
  const navigation = useNavigation()

  useEffect(() => {
    console.log(`Im in (tabs)/(programs)/exercise/[${exerciseId}].tsx, exerciseId:`);
    const exercise = findExercise();
    setExercise(exercise);

    if (exercise) {
        navigation.setOptions({ 
          title: exercise.name,
          headerTitle: exercise.name
        });
    } else {
      navigation.setOptions({ 
          title: "Exercise",
          headerTitle: "Exercise"
        });
    }
  }, [exerciseId]);

  // Helper function to find the exercise in our nested mock data
  const findExercise = () => {
    for (const program of PROGRAMS_DATA) {
      for (const day of program.days) {
        const exercise = day.exercises?.find(e => e.id === exerciseId);
        if (exercise) return exercise;
      }
    }
    return undefined;
  };


  if (!exercise) {
    return (
      <ScreenWrapper style={styles.centerContainer}>
        <ThemedText>Exercise not found</ThemedText>
      </ScreenWrapper>
    );
  }
  
  // <View style={styles.videoContainer}>
  //   <View style={styles.videoPlaceholder}>
  //     <IconSymbol name="play.rectangle.fill" size={64} color="#FF5F1F" />
  //     <ThemedText style={styles.videoText}>YouTube Player Placeholder</ThemedText>
  //   </View>
  // </View>

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <YoutubePlayer height={'77%'} play={true} videoId={exercise.videoUrl.split('?v=')[1]} />

        <View style={styles.detailsContainer}>
          <ViewHighlighter style={styles.infoBlock}>
            <View style={styles.infoHeader}>
              <IconSymbol name="figure.strengthtraining.traditional" size={20} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold" style={styles.infoTitle}>Target Muscles</ThemedText>
            </View>
            <View style={styles.tagsContainer}>
              {
                exercise.muscles.map((muscle, index) => (
                  <Tag 
                    key={index}
                    title={muscle.trim()} 
                    color={'#FF5F1F'}
                  />
                ))
              }
            </View>
            {/* <ThemedText style={styles.infoText}>{exercise.muscles}</ThemedText> */}
          </ViewHighlighter>

          <ViewHighlighter style={styles.infoBlock}>
            <View style={styles.infoHeader}>
              <IconSymbol name="list.bullet.clipboard" size={20} color="#FF5F1F" />
              <ThemedText type="defaultSemiBold" style={styles.infoTitle}>Instructions</ThemedText>
            </View>
            <ThemedText style={styles.instructionsText}>
              {exercise.instructions}
            </ThemedText>
          </ViewHighlighter>
        </View>
    </ScrollView>
  );
}

function Tag({title, color}: {title: string, color: ColorValue}) {
  return (
    <View style={{
      ...styles.tag, 
      backgroundColor: color as string + '33', // make transparent 20%
      borderColor: color as String + '4D' // make transparent 30%
    }}>
      <ThemedText 
        type='small' 
        style={{ paddingVertical: 6, paddingHorizontal: 12 }}>
          {title}
        </ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  tagsContainer: {
    width: '100%',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  tag: {
    borderRadius: 8,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  videoText: {
    color: '#FFF',
    marginTop: 12,
    fontSize: 14,
    opacity: 0.8,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  infoBlock: {
    padding: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
  },
  infoText: {
    color: '#444',
    fontSize: 15,
    lineHeight: 22,
  },
  instructionsText: {
    color: '#444',
    fontSize: 15,
    lineHeight: 24,
  }
});