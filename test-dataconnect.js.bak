import { initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { connectorConfig, createUser } from "./src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYDC_cEmV1ElV6gFqph5ieGS9akQ8v9tg",
  authDomain: "beach-cleanup-14fd4.firebaseapp.com",
  projectId: "beach-cleanup-14fd4",
  storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
  messagingSenderId: "415491442995",
  appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

const app = initializeApp(firebaseConfig);
const dc = getDataConnect(app, connectorConfig);

try {
  const result = await createUser(dc, {
    lineUserId: "test-user-001",
    displayName: "test-user",
    userType: "volunteer"
  });
  console.log("登録結果:", result);
} catch (error) {
  console.error("登録エラー:", error);
}