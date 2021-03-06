import firebase from "firebase/app/dist/index.cjs.js";
import "firebase/firestore/dist/index.node.cjs.js";
import dotenv from 'dotenv'
dotenv.config();
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.TORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.ID
};
firebase.initializeApp(firebaseConfig);
export default firebase;