import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GenderScreen() {
  const router = useRouter();

  const startQuiz = (gender: string) => {
    router.push({
      pathname: "/quiz",
      params: { gender },
    });
  };

  return (
    <LinearGradient
      colors={["#E6F2DF", "#F7C6C7"]} // light green → soft pink
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Select Gender</Text>

      <View style={styles.row}>
        {/* MEN */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => startQuiz("Men")}
          activeOpacity={0.8}
        >
          <Ionicons name="man" size={64} color="#444" />
          <Text style={styles.label}>Men</Text>
        </TouchableOpacity>

        {/* WOMEN */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => startQuiz("Women")}
          activeOpacity={0.8}
        >
          <Ionicons name="woman" size={64} color="#444" />
          <Text style={styles.label}>Women</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 50,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  card: {
    width: 150,
    height: 180,
    backgroundColor: "#F4B6B8",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
