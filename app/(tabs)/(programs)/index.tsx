import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ViewHighlighter from "@/components/view-highlighter";
import { PROGRAMS_DATA } from "@/constants/mockData";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import IntenseBadge from "./components/Intense";

export default function ProgramsTab() {
  const router = useRouter();

  const handleProgramPress = (programId: string) => {
    console.log(`/(tabs)/(programs)/program/${programId}`)
    router.push(`/(tabs)/(programs)/program/${programId}`);
  }

  const renderProgramCard = ({ item }: { item: typeof PROGRAMS_DATA[0] }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => handleProgramPress(item.id)}
      style={styles.cardWrapper}
    >
      <ViewHighlighter style={styles.card}>
        { item.isIntense && <IntenseBadge isAbsolute={true} /> }
        <Image source={{ uri: item.img_url }} style={styles.programImage} /> 
        <View style={{ padding: 16, gap: 8, flex: 1 }}>
          <View style={styles.cardHeader}>
            <ThemedText type="defaultSemiBold" style={styles.title}>
              {item.title}
            </ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#FF5F1F" />
          </View>
          <ThemedText style={styles.description} numberOfLines={2}>
            {item.description}
          </ThemedText>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>7 Days</ThemedText>
          </View>
        </View>
      </ViewHighlighter>
    </TouchableOpacity>
  );

  return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={{paddingTop: 35}}>Programs</ThemedText>
        <FlatList
          data={PROGRAMS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderProgramCard}
          style={{ backgroundColor: Colors.light.background }}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  programImage: {
    width: '100%',
    height: 200,
    marginBottom: 24,
    borderRadius: 13,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  listContainer: {
    paddingTop: 16,
    backgroundColor: Colors.light.background,
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    padding: 0,
    borderRadius: 16,
    width: '100%',
    alignItems: 'flex-start',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
  },
  title: {
    fontSize: 18,
  },
  description: {
    color: '#666',
    marginBottom: 16,
    fontSize: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF5F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FF5F1F',
    fontWeight: '600',
    fontSize: 12,
  }
});