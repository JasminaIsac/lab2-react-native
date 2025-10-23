import { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'Utilizator',
    votingHistory: [],
    winner: null,
    votingDate: null
  });

  const updateHistory = (newHistory) => {
    setUser(prev => ({ ...prev, votingHistory: newHistory }));
  };

  const updateUser = (prop) => {
    setUser(prev => ({ ...prev, ...prop }));
  };

  const resetUserData = () => {
    setUser({
      username: 'Utilizator',
      votingHistory: [],
    });
  };

  const saveUserData = async () => {
    try {
      const userToSave = {
        username: user.username,
        winner: user.winner,
        votingDate: user.votingDate,
      };
      const existing = await AsyncStorage.getItem('users');
      let users = existing ? JSON.parse(existing) : [];

      const index = users.findIndex(u => u.username === user.username);

      if (index !== -1) {
        users[index] = userToSave;
      } else {
        users.push(userToSave);
      }

      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const value = {
    user,
    updateUser,
    resetUserData,
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