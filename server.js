import cron from "node-cron"
import firebase from "./firebase/config.js"
import express from "express"
const db = firebase.firestore();
var app = express()

var port = process.env.PORT || "3000";

app.listen(port, ()=>{
  cron.schedule('* * * * *', async()=>{
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    console.log("데이터 저장 실행됨 : " + kr_curr.toString())
    await db.collection('news').add({newData: kr_curr.toString()});
  });
})

