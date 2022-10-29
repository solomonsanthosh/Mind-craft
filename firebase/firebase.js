// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDU44_QqfKPbxP7hZeiasctvc2ewsiGsjE",
	authDomain: "re-mind-a8693.firebaseapp.com",
	projectId: "re-mind-a8693",
	storageBucket: "re-mind-a8693.appspot.com",
	messagingSenderId: "704594427755",
	appId: "1:704594427755:web:4c7414d45360edbead562e"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const auth = firebase.auth();
export const storageRef = firebase.storage().ref();
export { auth };

