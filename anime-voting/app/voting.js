import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import animeList from '@data/animeList.json';
import { useUser } from '@contexts/UserContext';

export default function VotingPage() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(animeList);
  const [nextRound, setNextRound] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const currentPair = currentRound.slice(pairIndex, pairIndex + 2);

  const handleVote = (chosenId) => {
    const chosenItem = currentRound.find(x => x.id === chosenId);
    if (!chosenItem) return;

    const optionIds = currentRound.slice(pairIndex, pairIndex + 2).map(x => x.id);

    setHistory(prev => [...prev, {
        round: roundNumber,
        optionIds,
        chosenId,
      }
    ]);

    const newNextRound = [...nextRound, chosenItem];
    setNextRound(newNextRound);

    const newPairIndex = pairIndex + 2;
    setPairIndex(newPairIndex);

    if (newPairIndex >= currentRound.length) {
      if (newNextRound.length === 1) {
        const finalWinner = newNextRound[0];

        const newVotingHistory = [...history, {
            round: "final",
            optionIds,
            chosenId: finalWinner.id,
          }];

        const now = new Date();
        const formattedVotingDate = `${String(now.getDate()).padStart(2,"0")}.${String(now.getMonth()+1).padStart(2,"0")}.${now.getFullYear()} ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
        
        updateUser({ 
          votingHistory: newVotingHistory, 
          winner: finalWinner.name,
          votingDate: formattedVotingDate
        });

        return;
      }

      setCurrentRound(newNextRound);
      setNextRound([]);
      setPairIndex(0);
      setRoundNumber(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (user.winner) {
      router.replace("/result");
    }
  }, [user.winner]);

  if (currentPair.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.p}>Se încarcă...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alege între:</Text>

      {currentPair.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => handleVote(item.id)}
          style={({ pressed }) => [
            styles.option,
            pressed && { opacity: 0.8 }
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  option: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  p: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});