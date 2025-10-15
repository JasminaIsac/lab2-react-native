import { UserProvider } from "../contexts/UserContext"
import { Stack } from "expo-router"

export default function Layout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="voting" />
        <Stack.Screen name="result" />
      </Stack>
    </UserProvider>
  );
}