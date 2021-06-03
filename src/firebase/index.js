import firebase from 'firebase';
// initializing firebase
const firebaseConfig = {
    apiKey: "AIzaSyA_utxGhxgol9g2xnohseJ1zuLoJZVR-R0",
    authDomain: "messaging-app-d3282.firebaseapp.com",
    databaseURL: "https://messaging-app-d3282-default-rtdb.firebaseio.com",
    projectId: "messaging-app-d3282",
    storageBucket: "messaging-app-d3282.appspot.com",
    messagingSenderId: "1019050723287",
    appId: "1:1019050723287:web:f0c5858ae4e6fcb83d6d92",
    measurementId: "G-3HJX0MFYPY"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };