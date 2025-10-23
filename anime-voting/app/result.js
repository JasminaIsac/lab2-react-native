import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import animeList from '@data/animeList.json';
import { useUser } from "@contexts/UserContext";
import CustomButton from "@components/CustomButton";
import TournamentBracket from "@components/TournamentBracket";
import AllUsersVote from "@components/AllUsersVote";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultsPage() {
  const [allUsersVote, setAllUsersVote] = useState([]);
  const { user, saveUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const saveAndFetch = async () => {
      await saveUserData(); 

      const data = await AsyncStorage.getItem('users');
      const users = data ? JSON.parse(data) : [];
      const votes = users.map(u => ({
        username: u.username,
        winner: u.winner,
        votingDate: u.votingDate,
      }));
      setAllUsersVote(votes);
    };

    saveAndFetch();
  }, []);


  const votingHistory = user.votingHistory;

  const findWinner = () => {
    if (votingHistory.length === 0) return null;
    const lastVote = votingHistory[votingHistory.length - 1];
    return animeList.find(anime => anime.id === lastVote.chosenId);
  };

  const winner = findWinner();

  if (!winner) {
    return (
      <View style={styles.container}>
        <Text>Nu s-a găsit niciun câștigător.</Text>
        <CustomButton
          title="Înapoi acasă"
          onPress={() => router.replace("/")}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 40,
        alignItems: "center",
        flexGrow: 1, 
      }}
    >
      <Text style={styles.subtitle}>Good choice, {user.username}</Text>
      <Text style={styles.title}>Final winner:</Text>
      <Image source={{ uri: winner?.image }} style={styles.image} />
      <Text style={styles.name}>{winner?.name}</Text>
      <Text style={styles.p}>{winner?.description}</Text>
      
      <TournamentBracket 
        voteHistory={user.votingHistory} 
        animeList={animeList} 
      />

      <AllUsersVote allUsersData={allUsersVote}/>

      <CustomButton
        title="Reia jocul"
        onPress={() => router.replace("/")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6E3EE6",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#6A6887",
    textAlign: "center",
  },
  p: {
    fontSize: 14,
    marginTop:15,
    color: "#6A6887",
    textAlign: "center",
  },
  image: {
    width: "60%",
    height: 200,
    borderRadius: 15,
  },
  name: {
    color: "#6E3EE6",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});