import { StyleSheet, Text, View } from "react-native";

export default function StatContainer({ label, value }: any) {
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",

    justifyContent: "center",
    padding: 12,
  },
  valueContainer: {
    marginRight: 50,
    marginVertical: 10,
  },
  label: {
    color: "white",
    fontSize: 20,
  },
  value: {
    fontSize: 35,
    color: "#AFB3BE",
    fontWeight: "500",
  },
});
