import firebase from 'firebase';
  const firebaseConfig = {
    apiKey: "AIzaSyABsF5yjtDVDRTJKKsarPA3ZvNO_n9uqa4",
    authDomain: "mytproject-bd879.firebaseapp.com",
    databaseURL: "https://mytproject-bd879.firebaseio.com",
    projectId: "mytproject-bd879",
    storageBucket: "mytproject-bd879.appspot.com",
    messagingSenderId: "191592931724",
    appId: "1:191592931724:web:1c0bb3c65e2f5c68b536a9"
  };

     
      const Firebase = firebase.initializeApp(firebaseConfig)
             
    
      export default Firebase ;
      // // export const db = Firebase.database();