<<<<<<< HEAD
import firebase from "firebase/app/dist/index.cjs.js";
import "firebase/firestore/dist/index.node.cjs.js";
import dotenv from 'dotenv'
dotenv.config();
=======
import dotenv  from "dotenv"
dotenv.config()
import firebase from "firebase/app/dist/index.cjs.js";
import "firebase/firestore/dist/index.node.cjs.js";
>>>>>>> 7c484a9e0fb77d3877924e0db21942c135d67ff8
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
<<<<<<< HEAD
  storageBucket: process.env.TORAGE_BUCKET,
=======
  storageBucket: process.env.STORAGE_BUCKET,
>>>>>>> 7c484a9e0fb77d3877924e0db21942c135d67ff8
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.ID
};
firebase.initializeApp(firebaseConfig);
export default firebase;