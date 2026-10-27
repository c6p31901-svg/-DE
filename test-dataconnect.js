
import { initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
  connectorConfig,
  listGarbagePosts
} from "./src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYDC_CEmV1ElV6gFqph5ieGS9akQ8v9tg",
  authDomain: "beach-cleanup-14fd4.firebaseapp.com",
  projectId: "beach-cleanup-14fd4",
  storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
  messagingSenderId: "415491442995",
  appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

const app = initializeApp(firebaseConfig);
const dc = getDataConnect(app, connectorConfig);

try {
  const result = await listGarbagePosts(dc);

  console.log("ごみ投稿の取得に成功しました。");
  console.log(JSON.stringify(result.data, null, 2));
} catch (error) {
  console.error("ごみ投稿の取得に失敗しました。");
  console.error(error);
}
