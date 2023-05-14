// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQCLcErcZ4aKXdiaETjqf86qAUQ-URvUw',
  authDomain: 'pokestudio-c5739.firebaseapp.com',
  projectId: 'pokestudio-c5739',
  storageBucket: 'pokestudio-c5739.appspot.com',
  messagingSenderId: '498179000633',
  appId: '1:498179000633:web:d12f20ab462a3bc18340e8',
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
export const fireDatabase = getDatabase(fireApp);
