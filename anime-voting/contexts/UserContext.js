// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [username, setUsername] = useState("");
//   const [voteHistory, setVoteHistory] = useState([]);
//   // const [finalWinner, setFinalWinner] = useState(null);

// const addVoteToHistory = (voteRecord) => {
//     setVoteHistory(prev => ({
//       ...prev, voteRecord
//     }));
//   };

//   const resetUserData = () => {
//     setUsername("");
//     setVoteHistory([]);
//     // setFinalWinner(null);
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         username,
//         setUsername,
//         voteHistory,
//         addVoteToHistory,
//         // finalWinner,
//         // setFinalWinner,
//         resetUserData,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Utilizator',
    votingHistory: [],
    winner: null,
    votingDate: null
  });

  const addVoteToHistory = (voteRecord) => {
    setUser(prev => ({
      ...prev,
      votingHistory: [...prev.votingHistory, voteRecord]
    }));
  };

  const updateHistory = (newHistory) => {
    setUser(prev => ({ ...prev, votingHistory: newHistory }));
  };

  const updateUser = (prop) => {
    setUser(prev => ({ ...prev, ...prop }));
  };

  const clearHistory = () => {
    setUser(prev => ({ ...prev, votingHistory: [] }));
  };

  const resetUserData = () => {
    setUser({
      username: 'Utilizator',
      votingHistory: [],
    });
  };

  const saveUserData = async () => {
    try {
      // 1️⃣ Citește array-ul existent
      const existing = await AsyncStorage.getItem('users');
      let users = existing ? JSON.parse(existing) : [];

      // 2️⃣ Verifică dacă userul există deja
      const index = users.findIndex(u => u.username === user.username);

      if (index !== -1) {
        // 3️⃣ Dacă există — actualizează userul
        users[index] = user;
      } else {
        // 4️⃣ Dacă nu există — adaugă noul user
        users.push(user);
      }

      // 5️⃣ Salvează array-ul actualizat
      await AsyncStorage.setItem('users', JSON.stringify(users));

      console.log('User list updated successfully!');
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const value = {
    user,                    // obiectul user cu username și votingHistory
    addVoteToHistory,        // funcții
    updateUser,          // funcții  
    clearHistory,            // funcții
    resetUserData,           // funcții
    updateHistory,
    saveUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};