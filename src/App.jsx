// App.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [clearNext, setClearNext] = useState(false);

  const handleNumber = (num) => {
    if (clearNext) {
      setDisplay(num.toString());
      setClearNext(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  const handleOperation = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
    } else {
      calculate();
    }
    setOperation(op);
    setClearNext(true);
  };

  const calculate = () => {
    if (prevValue === null || operation === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+":
        result = prevValue + current;
        break;
      case "-":
        result = prevValue - current;
        break;
      case "×":
        result = prevValue * current;
        break;
      case "÷":
        result = prevValue / current;
        break;
    }

    setDisplay(result.toString());
    setPrevValue(null);
    setOperation(null);
    setClearNext(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setClearNext(false);
  };

  const CalculatorButton = ({
    text,
    color = "#333",
    textColor = "#fff",
    onPress,
    flex = 1,
  }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, { flex: flex }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <CalculatorButton
            text="C"
            color="#A5A5A5"
            textColor="#000"
            onPress={clear}
          />
          <CalculatorButton
            text="±"
            color="#A5A5A5"
            textColor="#000"
            onPress={() => setDisplay((parseFloat(display) * -1).toString())}
          />
          <CalculatorButton
            text="%"
            color="#A5A5A5"
            textColor="#000"
            onPress={() => setDisplay((parseFloat(display) / 100).toString())}
          />
          <CalculatorButton
            text="÷"
            color="#FF9500"
            onPress={() => handleOperation("÷")}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton text="7" onPress={() => handleNumber(7)} />
          <CalculatorButton text="8" onPress={() => handleNumber(8)} />
          <CalculatorButton text="9" onPress={() => handleNumber(9)} />
          <CalculatorButton
            text="×"
            color="#FF9500"
            onPress={() => handleOperation("×")}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton text="4" onPress={() => handleNumber(4)} />
          <CalculatorButton text="5" onPress={() => handleNumber(5)} />
          <CalculatorButton text="6" onPress={() => handleNumber(6)} />
          <CalculatorButton
            text="-"
            color="#FF9500"
            onPress={() => handleOperation("-")}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton text="1" onPress={() => handleNumber(1)} />
          <CalculatorButton text="2" onPress={() => handleNumber(2)} />
          <CalculatorButton text="3" onPress={() => handleNumber(3)} />
          <CalculatorButton
            text="+"
            color="#FF9500"
            onPress={() => handleOperation("+")}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton text="0" flex={2} onPress={() => handleNumber(0)} />
          <CalculatorButton
            text="."
            onPress={() => {
              if (!display.includes(".")) {
                setDisplay(display + ".");
              }
            }}
          />
          <CalculatorButton text="=" color="#4CAF50" onPress={calculate} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Divaavegen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  displayContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    padding: 20,
  },
  display: {
    color: "#fff",
    fontSize: 70,
    textAlign: "right",
  },
  buttonContainer: {
    flex: 0.7,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "600",
  },
  footer: {
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Calculator;
