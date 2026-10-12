
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
  connectorConfig,
  createUser,
  createGarbagePost
} from "../src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYDC_cEmV1ElV6GqFqph5ieGS9akQ8v9tg",
  authDomain: "beach-cleanup-14fd4.firebaseapp.com",
  projectId: "beach-cleanup-14fd4",
  storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
  messagingSenderId: "415491442995",
  appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const dataConnect = getDataConnect(app, connectorConfig);

const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

let compressedDataUrl = null;

function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const maxSize = 320;
      const scale = Math.min(
        1,
        maxSize / Math.max(image.width, image.height)
      );

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("画像を変換できませんでした。"));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.45));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("画像を読み込めませんでした。"));
    };

    image.src = objectUrl;
  });
}

photoInput.addEventListener("change", async () => {
  compressedDataUrl = null;
  const file = photoInput.files?.[0];

  if (!file) {
    preview.style.display = "none";
    status.textContent = "";
    return;
  }

  try {
    status.textContent = "写真を圧縮しています…";
    compressedDataUrl = await compressPhoto(file);
    preview.src = compressedDataUrl;
    preview.style.display = "block";
    status.textContent = "写真を準備しました。";
  } catch (error) {
    console.error(error);
    status.textContent =
      error.message || "写真の準備に失敗しました。";
  }
});

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("このブラウザでは位置情報を利用できません。"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("位置情報の利用を許可してください。"));
        } else if (error.code === error.TIMEOUT) {
          reject(new Error("位置情報の取得がタイムアウトしました。"));
        } else {
          reject(new Error("位置情報を取得できませんでした。"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000
      }
    );
  });
}

sendButton.addEventListener("click", async () => {
  if (sendButton.disabled) return;
  sendButton.disabled = true;

  try {
    if (!compressedDataUrl) {
      throw new Error("先に写真を選択してください。");
    }

    status.textContent = "位置情報を取得しています…";
    const coords = await getCurrentPosition();

    status.textContent = "テスト用ユーザーを登録しています…";

    const userResult = await createUser(dataConnect, {
      lineUserId: `photo-test-${Date.now()}`,
      displayName: "写真保存テスト",
      userType: "volunteer"
    });

    const userId = userResult.data.user_insert.userId;

    status.textContent = "写真をデータベースに保存しています…";

    const postResult = await createGarbagePost(dataConnect, {
      userId,
      photoUrl: compressedDataUrl,
      latitude: coords.latitude,
      longitude: coords.longitude,
      comment: "Base64画像保存テスト",
      collectionStatus: "未回収"
    });

    status.textContent =
      "投稿を保存できました。投稿ID：" +
      postResult.data.garbagePost_insert.postId;

    photoInput.value = "";
    compressedDataUrl = null;
    preview.removeAttribute("src");
    preview.style.display = "none";
  } catch (error) {
    console.error("投稿保存エラー:", error);
    status.textContent =
      "保存に失敗しました：" +
      (error.message || "原因不明のエラー");
  } finally {
    sendButton.disabled = false;
  }
});
