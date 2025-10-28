import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@contexts/UserContext";
import CustomButton from "@components/CustomButton";

export default function WelcomePage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { resetUserData, updateUser } = useUser();

  const handleClick = () => {
    if (!input.trim()) return;

    resetUserData();
    updateUser({username: input.trim()});
    router.push("/voting");
  };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your favorite anime!</Text>
            <Text style={styles.subtitle}>But first, what&apos;s your name?</Text>
            <TextInput
                placeholder="John"
                value={input}
                onChangeText={setInput}
                style={styles.input}
            />
            <CustomButton title="Start voting" onPress={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingHorizontal: 20,
        fontSize: 38,
        fontWeight: 900,
        textAlign: 'center',
        marginBottom: 36,
        fontFamily: 'sans-serif',
        color: '#6E3EE6', 
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 24,
        color: '#6A6887',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderColor: '#9F9DD4',
        backgroundColor: '#F5F5FA',
    },
});