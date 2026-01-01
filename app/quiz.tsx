import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { quizImages } from "../constants/quizImages";

export default function QuizScreen() {
  const router = useRouter();
  const { gender } = useLocalSearchParams<{ gender: string }>();

  const filteredImages = useMemo(() => {
    return quizImages.filter((img) => img.gender === gender).slice(0, 20);
  }, [gender]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  if (!filteredImages.length) {
    return (
      <View style={styles.center}>
        <Text>No quiz data found</Text>
      </View>
    );
  }

  const current = filteredImages[index];

  const handleAnswer = (liked: boolean) => {
    const answer = {
      liked,
      gender: current.gender,
      baseColour: current.baseColour,
      articleType: current.articleType,
      masterCategory: current.masterCategory,
      subCategory: current.subCategory,
      season: current.season,
    };

    const updated = [...answers, answer];
    setAnswers(updated);

    if (index + 1 < filteredImages.length) {
      setIndex(index + 1);
    } else {
      router.push({
        pathname: "/loading",
        params: { data: JSON.stringify(updated) },
      });
    }
  };

  return (
    <LinearGradient
      colors={["#E6F2DF", "#F7C6C7"]} // light green → soft pink
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Progress */}
      <Text style={styles.progress}>
        {index + 1} / {filteredImages.length}
      </Text>

      {/* Card */}
      <View style={styles.card}>
        <Image source={{ uri: current.image }} style={styles.image} />
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.dislike]}
          onPress={() => handleAnswer(false)}
          activeOpacity={0.8}
        >
          <Ionicons name="heart-dislike" size={42} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.like]}
          onPress={() => handleAnswer(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={42} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  progress: {
    color: "#333",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "500",
  },
  card: {
    width: "85%",
    height: 420,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    marginTop: 60,
    gap: 100,
  },
  actionBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    backgroundColor: "#e91e63",
  },
  dislike: {
    backgroundColor: "#555",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
