import * as FileSystem from 'expo-file-system'

export interface Habit {
  id: string;
  name: string;
  startDate: string;    // YYYY-MM-DD
  time: string;         // HH:mm
  description?: string;
  checkedDates: string[];
}

const HABITS_FILE = FileSystem.documentDirectory + 'habits.json';

export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const json = await FileSystem.readAsStringAsync(HABITS_FILE);
    return JSON.parse(json);
  } catch (e: any) {
    if (e.code === 'ERR_FILE_NOT_FOUND' || e.code === 'ENOENT') {
      return [];
    }
    console.warn('loadHabits error', e);
    return [];
  }
};

export const saveHabits = async (habits: Habit[]) => {
  try {
    const json = JSON.stringify(habits);
    await FileSystem.writeAsStringAsync(HABITS_FILE, json, { encoding: FileSystem.EncodingType.UTF8 });
  } catch (e) {
    console.warn('saveHabits error', e);
  }
};
