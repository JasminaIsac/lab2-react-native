import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import animeList from '../data/animeList.json';
import TournamentBracket from "../components/TournamentBracket";

export default function ResultsPage() {
  const { user } = useUser();
  const router = useRouter();

  const votingHistory = user.votingHistory;

  const findWinner = () => {
    if (votingHistory.length === 0) return null;
    const lastVote = votingHistory[votingHistory.length - 1];
    return animeList.find(anime => anime.id === lastVote.chosenId);
  };

  const winner = findWinner();
  console.log(JSON.stringify(user));


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
    <View style={styles.container}>
      <Text style={styles.subtitle}>Good choice, {user.username}</Text>
      <Text style={styles.title}>Câștigătorul final:</Text>
      <Image source={{ uri: winner?.image }} style={styles.image} />
      <Text style={styles.name}>{winner?.name}</Text>
      <Text style={styles.p}>{winner?.description}</Text>

      <Text style={[styles.title, { marginTop: 20 }]}>Istoric voturi:</Text>
          
<TournamentBracket 
        voteHistory={user.votingHistory} 
        animeList={animeList} 
      />

      <CustomButton
        title="Reia jocul"
        onPress={() => router.replace("/")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
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
    width: "70%",
    height: "30%",
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


// import React, { useContext } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { useUser } from '../contexts/UserContext';
// import animeList from '../data/animeList.json';
// import { router } from 'expo-router';

// const ResultsScreen = () => {
//   const { user } = useUser();
//   const { votingHistory } = user;

//   // Găsește câștigătorul - ultima opțiune aleasă din istoric
//   const findWinner = () => {
//     if (votingHistory.length === 0) return null;
    
//     const lastVote = votingHistory[votingHistory.length - 1];
//     return animeList.find(anime => anime.id === lastVote.chosenId);
//   };

//   const winner = findWinner();

//   // Găsește numele opțiunii după ID
//   const getOptionName = (id) => {
//     const option = animeList.find(anime => anime.id === id);
//     return option ? option.name : 'Unknown';
//   };

//   // Grupează voturile pe runde
//   const getRoundVotes = (round) => {
//     return votingHistory.filter(vote => vote.round === round);
//   };

//   // Găsește numărul maxim de runde
//   const totalRounds = votingHistory.length > 0 
//     ? Math.max(...votingHistory.map(vote => vote.round))
//     : 0;

//   if (!winner) {
//     return (
//       <View style={styles.container}>
//         <Text>Nu s-a găsit niciun câștigător.</Text>
//         <TouchableOpacity onPress={() => router.replace('/')}>
//           <Text>Înapoi acasă</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.winnerTitle}>🎉 Câștigător! 🎉</Text>
      
//       <Image source={{ uri: winner.image }} style={styles.winnerImage} />
//       <Text style={styles.winnerName}>{winner.name}</Text>

//       <Text style={styles.subtitle}>
//         {user.username} a ales după {totalRounds} runde
//       </Text>

//       <ScrollView style={styles.historyContainer}>
//         <Text style={styles.historyTitle}>Istoric Voturi</Text>
        
//         {Array.from({ length: totalRounds }, (_, i) => i + 1).map(round => (
//           <View key={round} style={styles.roundSection}>
//             <Text style={styles.roundTitle}>Runda {round}</Text>
//             {getRoundVotes(round).map((vote, index) => (
//               <View key={index} style={styles.voteItem}>
//                 <Text style={styles.voteOptions}>
//                   {vote.optionIds.map(id => getOptionName(id)).join(' vs ')}
//                 </Text>
//                 <Text style={styles.voteChosen}>
//                   ✅ Ales: {getOptionName(vote.chosenId)}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         ))}
//       </ScrollView>

//       <TouchableOpacity 
//         style={styles.button}
//         onPress={() => router.replace('/')}
//       >
//         <Text style={styles.buttonText}>Înapoi acasă</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   winnerTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#FF6B6B',
//   },
//   winnerImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     alignSelf: 'center',
//     marginBottom: 15,
//   },
//   winnerName: {
//     fontSize: 28,
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#333',
//     fontWeight: '600',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#666',
//   },
//   historyContainer: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   historyTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },
//   roundSection: {
//     backgroundColor: 'white',
//     padding: 15,
//     marginBottom: 15,
//     borderRadius: 10,
//   },
//   roundTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#007AFF',
//   },
//   voteItem: {
//     marginBottom: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   voteOptions: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   voteChosen: {
//     fontSize: 14,
//     color: '#2e7d32',
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ResultsScreen;