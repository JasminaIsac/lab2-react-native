import { View, Text, StyleSheet } from "react-native";
import Minicard from "./mini-card";

export default function TournamentBracket({ voteHistory, animeList }) {

  const getAnimeById = (id) => animeList.find(a => a.id === id);

  const rounds = voteHistory.reduce((acc, vote) => {
    const r = vote.round;
    if (!acc[r]) acc[r] = [];
    acc[r].push(vote.chosenId);
    return acc;
  }, {});

 const roundKeys = Object.keys(rounds);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your choosing history:</Text>

      <View style={[styles.roundRow, { paddingHorizontal: 15 }]}>
        {animeList.map((anime) => (
          <Minicard key={anime.id} object={anime} size={20} margin={3} />
        ))}
      </View>

      {roundKeys.map((roundKey, rIdx) => {
        const chosenIds = rounds[roundKey];
        const size = 20 + (rIdx + 1) * 10;
        const mh = 15 + (rIdx + 1) * 8 * (rIdx * 2);

        return (
          <View key={rIdx} style={{ width: "100%" }}>
            <View style={styles.roundRow}>
              {chosenIds.map((id, i) => {
                const anime = getAnimeById(id);
                if (!anime) return null;
                return (
                  <View key={i} style={{ flexDirection: "column", alignItems: "center"}}>
                    <Text style={[styles.connector, { fontSize: 20 + (rIdx * 20), lineHeight: 20 + (rIdx * 10) }]}>︸</Text>
                    <Minicard object={anime} size={size} margin={mh} />
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6E3EE6",
  },
  roundRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10
  },
  roundTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  connector: {
    fontSize: 20,
    marginTop: 10,
    color: "#555",
    marginBottom: -5,
  },
});
