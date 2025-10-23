import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AllUsersVote({ allUsersData }) {

  if (allUsersData.length === 0) {
    return (
      <View>
        <Text>No votes found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Users Votes</Text>

      <View style={styles.table}>
        {/* HEADER */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.header, styles.idColumn]}>#</Text>
          <Text style={[styles.cell, styles.header]}>User</Text>
          <Text style={[styles.cell, styles.header]}>Winner</Text>
          <Text style={[styles.cell, styles.header]}>Date</Text>
        </View>

        {/* ROWS */}
        {allUsersData.map((user, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.cell, styles.idColumn]}>{index + 1}</Text>
            <Text style={styles.cell}>{user.username}</Text>
            <Text style={styles.cell}>{user.winner}</Text>
            <Text style={styles.cell}>{user.votingDate}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerRow: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
  },
  idColumn: {
    flex: 0.3,
    borderRightWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
});
