import cron from "node-cron"
import firebase from "./firebase/config.js"
import express from "express"

const db = firebase.firestore();
var app = express()

app.listen(3000, ()=>{
  cron.schedule('* * * * *', async()=>{
    console.log("데이터 저장 실행됨 : " + new Date().toString())
    await db.collection('news').add({newData: new Date().toString()});
  });
})