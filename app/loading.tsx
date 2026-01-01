import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

export default function LoadingScreen() {
  const { data } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    const fetchResults = async () => {
      try {
        const answers = JSON.parse(data as string);

        const res = await fetch("http://192.168.1.10:8000/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });

        if (!res.ok) {
          throw new Error("API request failed");
        }

        const json = await res.json();

        router.replace({
          pathname: "/results",
          params: { results: JSON.stringify(json.recommendations) },
        });
      } catch (err) {
        Alert.alert(
          "Error",
          "Could not analyze your style. Please try again."
        );
        router.replace("/quiz");
      }
    };

    fetchResults();
  }, [data]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Analyzing your style...</Text>
    </View>
  );
}
