import firebase from "firebase"
import 'firebase/firestore'

 // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBi8wi8YxBe00HcS_hQIgrlC91eo15jck4",
    authDomain: "todo-vue-vuetify-2a256.firebaseapp.com",
    databaseURL: "https://todo-vue-vuetify-2a256.firebaseio.com",
    projectId: "todo-vue-vuetify-2a256",
    storageBucket: "todo-vue-vuetify-2a256.appspot.com",
    messagingSenderId: "7997574216",
    appId: "1:7997574216:web:ccaf1d13d835c5ea795c7d",
    measurementId: "G-EXPWK8HS0S"
  };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   firebase.analytics();
   const db=firebase.firestore();
   db.settings({timestampsInSnapshots:true});

   export default db;