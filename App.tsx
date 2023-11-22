import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StatContainer from "./src/componants/StatContainer";
import CircularSlider from "./src/componants/CircularSlider";
import {
  HealthInputOptions,
  HealthKitPermissions,
  HealthPermission,
  HealthValue,
} from "react-native-health";
import appleHealthKit from "react-native-health";
import { useEffect, useState } from "react";
const permissions: HealthKitPermissions = {
  permissions: {
    read: [appleHealthKit.Constants.Permissions.Steps],
    write: [appleHealthKit.Constants.Permissions.Steps],
  },
};
const STEPS_GOAL = 10_000;
export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    appleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("error getting permissions");
        return;
      }
      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }
    const options: HealthInputOptions = {
      date: new Date().toISOString(),
    };
    appleHealthKit.getStepCount(
      options,
      (err: Object, results: HealthValue) => {
        if (err) {
          return;
        }
        setSteps(results.value);
        console.log(results);
      }
    );
  }, [hasPermissions]);
  return (
    <View style={styles.container}>
      <CircularSlider
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />
      <View style={{ flexDirection: "row" }}>
        <StatContainer label="Steps" value={steps.toString()} />
        <StatContainer label="Distance" value={"2000km"} />
      </View>

      <StatusBar style="auto" />
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
