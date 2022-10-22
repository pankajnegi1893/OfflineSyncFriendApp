import {openDatabase} from 'react-native-sqlite-storage';

export const API_URL = 'https://rnapp-mock-developer-edition.ap24.force.com';

export const FriendDatabase = openDatabase({name: 'FriendDB.db'});
