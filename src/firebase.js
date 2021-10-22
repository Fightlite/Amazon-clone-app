import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuXQHRUapnqLHjg4uus78vURwQQh9P3a8",
  authDomain: "app-2021-6189e.firebaseapp.com",
  projectId: "app-2021-6189e",
  storageBucket: "app-2021-6189e.appspot.com",
  messagingSenderId: "44245659762",
  appId: "1:44245659762:web:d3f7ea84e1b6bfe1dfd2eb",
  measurementId: "G-HXSGZ16T0K"
};

export const auth = firebase.initializeApp(firebaseConfig).auth();
export const db = firebase.initializeApp(firebaseConfig).firestore();
