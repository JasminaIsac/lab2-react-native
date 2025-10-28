import { createContext, useReducer, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    case 'UPDATE_HISTORY':
      return { ...state, votingHistory: action.payload };
    case 'RESET_USER':
      return {
        username: 'User',
        votingHistory: [],
        winner: null,
        votingDate: null,
      };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    username: 'User',
    votingHistory: [],
    winner: null,
    votingDate: null,
  };

  const [user, dispatch] = useReducer(userReducer, initialState);

  const updateUser = (prop) => dispatch({ type: 'UPDATE_USER', payload: prop });
  const updateHistory = (newHistory) => dispatch({ type: 'UPDATE_HISTORY', payload: newHistory });
  const resetUserData = () => dispatch({ type: 'RESET_USER' });

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