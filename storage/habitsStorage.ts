// import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Habit {
  id: string;
  name: string;
  startDate: string;    // YYYY-MM-DD
  time: string;         // HH:mm
  description?: string;
  checkedDates: string[];
}

// const KEY = 'HABITS';

// export const loadHabits = async (): Promise<Habit[]> => {
//   const json = await AsyncStorage.getItem(KEY);
//   return json ? JSON.parse(json) : [];
// };

// export const saveHabits = async (habits: Habit[]) => {
//   await AsyncStorage.setItem(KEY, JSON.stringify(habits));
// };
// import * as SecureStore from 'expo-secure-store'

// export interface Habit {
//   id: string;
//   name: string;
//   startDate: string;    // YYYY-MM-DD
//   time: string;         // HH:mm
//   description?: string;
//   checkedDates: string[];
// }

// const KEY = 'HABITS';

// export const loadHabits = async (): Promise<Habit[]> => {
//   const json = await SecureStore.getItemAsync(KEY);
//   return json ? JSON.parse(json) : [];
// };

// export const saveHabits = async (habits: Habit[]) => {
//   await SecureStore.setItemAsync(KEY, JSON.stringify(habits));
// };
