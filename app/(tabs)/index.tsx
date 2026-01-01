import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#E6F2DF", "#F7C6C7"]} // light green → soft pink
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Find Your Style</Text>

      <Text style={styles.subtitle}>
        Answer a few questions and get outfit recommendations
      </Text>

      <TouchableOpacity
        style={styles.pinkButton}
        onPress={() => router.push("/gender")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#444",
  },
  pinkButton: {
    backgroundColor: "#F4B6B8",
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 18,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
