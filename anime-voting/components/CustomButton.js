import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton ({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6E3EE6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});