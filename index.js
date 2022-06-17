import cron from "node-cron"
import firebase from "./firebase/config.js"
import express from "express"
import moment from "moment";
import fetch from "node-fetch";
import dotenv from 'dotenv'
dotenv.config();
const db = firebase.firestore();
var app = express()

var port = process.env.PORT || "3000";
const reqData = [
  {
    id:"UUF4Wxdo3inmxP-Y59wXDsFw",
    key:process.env.APIKEY1,
    name:"MBC"
  },
  {
    id:"UUsU-I-vHLiaMfV_ceaYz5rQ",
    key:process.env.APIKEY2,
    name:"JTBC"
  },
  {
    id:"UUcQTRi69dsVYHN3exePtZ1A",
    key:process.env.APIKEY3,
    name:"KBS"
  }
]

app.listen(port, ()=>{
  cron.schedule('* * * * *', async()=>{
    reqData.forEach(async(data)=>{
      const res1 = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${data.id}&key=${data.key}`);
      const videoList = await res1.json();
      const timer1 = setInterval(async() => {
        if(videoList.items){
          clearInterval(timer1)
          await videoList.items.forEach(async({snippet})=>{
            const img = snippet.thumbnails.high?.url;
            if(img !== undefined){
              const id = snippet.resourceId.videoId;
              const {title} = snippet;
              const date = Number(snippet.publishedAt.slice(2, 4)+snippet.publishedAt.slice(5, 7)+snippet.publishedAt.slice(8, 10)+snippet.publishedAt.slice(11, 13)+snippet.publishedAt.slice(14, 16))
              const res2 = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${data.key}`);
              const videoData = await res2.json();
              const timer2 = setInterval(async() => {
                if(videoData.items){
                  clearInterval(timer2)
                  const view = Number(videoData.items[0].statistics.viewCount);
                  await db.collection(data.name).doc(id).set({title,img,date,view})
                }
              }, 1000);
            }
          })
          await db.collection(data.name).where("date","<",Number(moment().format('YYMMDDHHmm')) - 30000).get().then((docs)=>{
            docs.forEach((doc)=>{
              db.collection(data.name).doc(doc.id).delete();
            })
          })
          await db.collection(data.name).doc("lastUpdate").set({date:Number(moment().format('YYMMDDHHmm'))})
        }
      }, 1000);
    })
  });
})

