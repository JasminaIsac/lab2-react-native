import { View, Image, StyleSheet } from "react-native";

export default function Minicard({ object, size = 20, margin = 4 }) {
  return (
    <View style={{ width: size, height: size, marginHorizontal: margin / 2 }}>
      <Image source={{ uri: object.image }} style={[styles.image, { width: size, height: size }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    resizeMode: "cover",
  },
});
