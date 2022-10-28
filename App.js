import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

dayjs.extend(customParseFormat);

const parseTime = (text) => {
  const timePatterns = ["h:mm a", "h:mma", "h:mm:ss a", "h:mm:ssa"];
  const parsedTime = dayjs(text.trim().toLowerCase(), timePatterns, true);
  return parsedTime;
};

const formatTime = (time) => {
  return time.format("h:mm:ss a");
};

export default function App() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [pillPoppinTime, setPillPoppinTime] = useState(null);
  const [text, setText] = useState("10:00:00 PM");

  const parsedInputTime = parseTime(text);
  const parsedInputTimeValid = parsedInputTime.isValid();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => setInterval(timer);
  }, []);

  useEffect(() => {
    if (
      pillPoppinTime &&
      formatTime(pillPoppinTime) === formatTime(currentTime)
    ) {
      console.log(`time to take your meds!`);
      // make arduino call here
    }
  });

  const onChangeText = (newText) => {
    setText(newText);
  };
  const onPressSet = () => {
    setPillPoppinTime(parsedInputTime);
  };
  const onPressClear = () => {
    setPillPoppinTime(null);
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, fontSize: 50 }}>pill popper</Text>
      <Text style={{ ...styles.text, fontSize: 30 }}>
        every day we poppin pills
      </Text>
      <TextInput
        style={{
          fontSize: 50,
          textAlign: "center",
          color: parsedInputTimeValid ? "black" : "red",
        }}
        value={text}
        onChangeText={onChangeText}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="set reminder time"
          disabled={!parsedInputTimeValid}
          onPress={onPressSet}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="clear reminder time"
          color="red"
          disabled={!pillPoppinTime}
          onPress={onPressClear}
        />
      </View>
      <Text style={{ ...styles.text, fontSize: 40 }}>
        {pillPoppinTime
          ? `reminder set at ${formatTime(pillPoppinTime)}`
          : `no reminder set yet`}
      </Text>
      <Text style={{ ...styles.text, fontSize: 30 }}>
        current time: {formatTime(currentTime)}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    padding: 5,
  },
});
