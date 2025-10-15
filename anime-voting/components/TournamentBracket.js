// components/TournamentBracket.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function TournamentBracket({ voteHistory, finalWinner, animeList }) {
  // Construim rundele ca array de perechi
  const buildRounds = () => {
    let rounds = [];
    let current = voteHistory.map(v => ({ ...v }));
    while (current.length > 0) {
      rounds.push(current);
      current = current
        .map(v => ({ options: [v.chosen], chosen: v.chosen }))
        .filter(Boolean);
      if (current.length <= 1) break;
    }
    return rounds;
  };

  const rounds = buildRounds();

  return (
    <ScrollView horizontal contentContainerStyle={styles.scroll}>
      {rounds.map((round, rIdx) => (
        <View key={rIdx} style={styles.round}>
          {round.map((item, iIdx) => {
            const options = item.options.map(id => animeList.find(a => a.id === id));
            const winner = animeList.find(a => a.id === item.chosen);
            return (
              <View key={iIdx} style={styles.box}>
                <Text style={styles.optionText}>
                {(options
                    .filter(Boolean)
                    .map(a => a.name)
                    .join(" vs ")) || "N/A"}
                </Text>
                {winner && <Text style={styles.winnerText}>{winner.name}</Text>}
              </View>
            );
          })}
        </View>
      ))}

      {/* Final Winner */}
      <View style={styles.finalBox}>
        <Text style={styles.finalTitle}>Câștigător final</Text>
        <Image source={{ uri: finalWinner.image }} style={styles.finalImage} />
        <Text style={styles.finalName}>{finalWinner.name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingVertical: 20, alignItems: "center" },
  round: { marginHorizontal: 20, alignItems: "center" },
  box: {
    width: 120,
    height: 60,
    backgroundColor: "#F5F5FA",
    borderColor: "#6E3EE6",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
  },
  optionText: { fontSize: 12, textAlign: "center", color: "#6A6887" },
  winnerText: { fontWeight: "bold", fontSize: 14, color: "#6E3EE6", marginTop: 4, textAlign: "center" },
  finalBox: { marginLeft: 30, alignItems: "center" },
  finalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#6E3EE6" },
  finalImage: { width: 120, height: 180, borderRadius: 10 },
  finalName: { fontSize: 16, fontWeight: "bold", marginTop: 5, color: "#6E3EE6", textAlign: "center" },
});
