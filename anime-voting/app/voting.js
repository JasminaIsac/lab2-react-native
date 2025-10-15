import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'expo-router';
import animeList from '../data/animeList.json';

export default function VotingPage() {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(animeList);
  const [nextRound, setNextRound] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [history, setHistory] = useState([]);

  const currentPair = currentRound.slice(pairIndex, pairIndex + 2);

const handleVote = (chosenId) => {
  const chosenItem = currentRound.find(x => x.id === chosenId);
  if (!chosenItem) return;

  const optionIds = currentRound.slice(pairIndex, pairIndex + 2).map(x => x.id);

  // 1️⃣ Salvăm în history imediat
  setHistory(prev => [...prev, {
      round: Math.ceil(currentRound.length / 2),
      optionIds,
      chosenId,
    }
  ]);

  // 2️⃣ Adăugăm alegerea în nextRound
  const newNextRound = [...nextRound, chosenItem];
  setNextRound(newNextRound);

  // 3️⃣ Avansăm indexul
  const newPairIndex = pairIndex + 2;
  setPairIndex(newPairIndex);

  // 4️⃣ Verificăm dacă s-a terminat runda curentă
  if (newPairIndex >= currentRound.length) {
    // Dacă avem doar 1 câștigător final:
    if (newNextRound.length === 1) {
      const finalWinner = newNextRound[0];

      const newVotingHistory = [...history, {
          round: "final",
          optionIds,
          chosenId: finalWinner.id,
        }];

      updateUser({ 
        votingHistory: newVotingHistory, 
        winner: finalWinner,
        votingDate: new Date().toISOString()
       });
      // router.replace("/result");
      return;
    }

    // Altfel, trecem la următoarea rundă
    setCurrentRound(newNextRound);
    setNextRound([]);
    setPairIndex(0);
  }
};

useEffect(() => {
  if (user.winner) {
    router.replace("/result");
  }
}, [user.winner]);

// Verifică dacă nu mai sunt opțiuni
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



// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import { useUser } from '../contexts/UserContext';
// import animeList from '../data/animeList.json'; // importă din fișierul tău
// import { router } from 'expo-router';

// const VotingScreen = () => {
//   const { user, addVoteToHistory } = useUser();
//   const initialOptions = animeList; // folosește direct din JSON
  
//   const [currentRound, setCurrentRound] = useState([]);
//   const [roundNumber, setRoundNumber] = useState(1);
//   const [currentPair, setCurrentPair] = useState([]);
//   const [pairIndex, setPairIndex] = useState(0);

//   // Initializează prima rundă
//   useEffect(() => {
//     if (initialOptions.length > 0) {
//       initializeRound(initialOptions);
//     }
//   }, [initialOptions]);

//   const initializeRound = (options) => {
//     const shuffled = [...options].sort(() => Math.random() - 0.5);
//     const pairs = [];
    
//     for (let i = 0; i < shuffled.length; i += 2) {
//       if (i + 1 < shuffled.length) {
//         pairs.push([shuffled[i], shuffled[i + 1]]);
//       } else {
//         // Dacă număr impar, ultima opțiune avansează direct
//         pairs.push([shuffled[i]]);
//       }
//     }
    
//     setCurrentRound(pairs);
//     setPairIndex(0);
//     setCurrentPair(pairs[0] || []);
//   };

//   const handleVote = (chosenId) => {
//     const chosenOption = currentPair.find(opt => opt.id === chosenId);
    
//     if (!chosenOption) return;

//     // Record simplificat
//     const voteRecord = {
//       round: roundNumber,
//       optionIds: currentPair.map(opt => opt.id),
//       chosenId: chosenOption.id,
//       timestamp: new Date().toISOString()
//     };

//     // Adaugă la istoricul userului
//     addVoteToHistory(voteRecord);

//     // Trecem la următoarea pereche
//     const nextPairIndex = pairIndex + 1;
    
//     if (nextPairIndex < currentRound.length) {
//       // Mai sunt perechi în această rundă
//       setPairIndex(nextPairIndex);
//       setCurrentPair(currentRound[nextPairIndex]);
//     } else {
//       // Am terminat runda curentă
//       processRoundCompletion();
//     }
//   };

//   const processRoundCompletion = () => {
//     // Colectează toți câștigătorii din runda curentă
//     const winners = currentRound.map(pair => {
//       if (pair.length === 1) {
//         return pair[0]; // Opțiune singură avansează direct
//       }
      
//       // Pentru perechi, găsește opțiunea aleasă din istoric
//       const pairVotes = user.votingHistory.filter(vote => 
//         vote.round === roundNumber && 
//         vote.optionIds.includes(pair[0].id) && 
//         vote.optionIds.includes(pair[1].id)
//       );
      
//       if (pairVotes.length > 0) {
//         const chosenId = pairVotes[0].chosenId;
//         return pair.find(opt => opt.id === chosenId);
//       }
      
//       return pair[0]; // fallback
//     });

//     if (winners.length === 1) {
//       // Avem un câștigător final!
//       router.push('/result');
//     } else {
//       // Trecem la următoarea rundă
//       setRoundNumber(roundNumber + 1);
//       initializeRound(winners);
//     }
//   };

//   // Dacă perechea curentă are doar un element, avansează automat
//   useEffect(() => {
//     if (currentPair.length === 1) {
//       // Opțiune singură avansează automat
//       const voteRecord = {
//         round: roundNumber,
//         optionIds: currentPair.map(opt => opt.id),
//         chosenId: currentPair[0].id,
//         timestamp: new Date().toISOString(),
//         autoAdvanced: true
//       };
      
//       addVoteToHistory(voteRecord);
      
//       // Trecem direct la următoarea pereche
//       const nextPairIndex = pairIndex + 1;
//       if (nextPairIndex < currentRound.length) {
//         setPairIndex(nextPairIndex);
//         setCurrentPair(currentRound[nextPairIndex]);
//       } else {
//         processRoundCompletion();
//       }
//     }
//   }, [currentPair]);

//   if (!currentPair || currentPair.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>Se încarcă...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Runda {roundNumber} - Alege între:</Text>

//       {currentPair.map((item) => (
//         <Pressable
//           key={item.id}
//           onPress={() => handleVote(item.id)}
//           style={({ pressed }) => [
//             styles.option,
//             pressed && { opacity: 0.8 } // efect vizual la apăsare
//           ]}
//         >
//           <Image source={{ uri: item.image }} style={styles.image} />
//           <Text style={styles.name}>{item.name}</Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#333',
//   },
//   option: {
//     backgroundColor: 'white',
//     padding: 20,
//     marginVertical: 10,
//     borderRadius: 12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//   },
// });

// export default VotingScreen;