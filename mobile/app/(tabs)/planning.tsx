import { Box, Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

export default function PlanningScreen() {
  return (
    <Box style={styles.container}>
      <Text style={styles.title}>Planning</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
