
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDataConnect } from "firebase/data-connect";
import {
  connectorConfig
} from "../../src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYDC_cEmV1ElV6gFqph5ieGS9akQ8v9tg",
  authDomain: "beach-cleanup-14fd4.firebaseapp.com",
  projectId: "beach-cleanup-14fd4",
  storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
  messagingSenderId: "415491442995",
  appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

// Firebaseを初期化
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(firebaseApp);

// Data Connect
export const dataConnect = getDataConnect(
  firebaseApp,
  connectorConfig
);
