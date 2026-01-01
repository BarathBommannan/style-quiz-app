import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResultsScreen() {
  const router = useRouter();
  const { results } = useLocalSearchParams();
  const items = results ? JSON.parse(results as string) : [];

  return (
    <LinearGradient
      colors={["#E6F2DF", "#F7C6C7"]} // light green → soft pink
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Style Matches</Text>

        {items.map((item: any) => (
          <View key={item.id} style={styles.card}>
            {/* Product Image */}
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            {/* Product Name */}
            <Text style={styles.name}>{item.name}</Text>

            {/* Reason */}
            <Text style={styles.reason}>{item.reason}</Text>

            {/* Score */}
            <Text style={styles.score}>
              Score: {item.score.toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Retake Quiz Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.replace("/gender")}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Retake Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    color: "#333",
  },
  card: {
    marginBottom: 25,
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 12,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 14,
    marginBottom: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
  },
  reason: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  score: {
    fontSize: 12,
    color: "#888",
  },
  ctaButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#f3a6a6",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 4,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
