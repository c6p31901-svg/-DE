
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
const loginStatus = document.getElementById("loginStatus");

const LIFF_ID = "ここにLIFF_IDを入力";

let compressedDataUrl = null;
let lineProfile = null;
let loginReady = false;


async function initializeLineLogin() {
  sendButton.disabled = true;

  try {
    await liff.init({ liffId: LIFF_ID });

    if (!liff.isLoggedIn()) {
      liff.login({
        redirectUri: window.location.href
      });
      return;
    }

    lineProfile = await liff.getProfile();

    loginStatus.textContent =
      `${lineProfile.displayName} としてログイン中`;

    loginReady = true;
    sendButton.disabled = false;

  } catch (error) {
    console.error("LINEログインエラー:", error);

    loginStatus.textContent =
      "LINEログインに失敗しました。設定を確認してください。";

    sendButton.disabled = true;
  }
}

initializeLineLogin();


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
    // LINEログインの確認
    if (!loginReady || !lineProfile) {
      throw new Error("LINEログインが完了していません。");
    }

    // 写真の確認
    if (!compressedDataUrl) {
      throw new Error("先に写真を撮影してください。");
    }

    // 大きさの選択を取得
    const sizeInput = document.querySelector(
      'input[name="objectSize"]:checked'
    );

    if (!sizeInput) {
      throw new Error("大きさを選択してください。");
    }

    const selectedSize = sizeInput.value;

    // 位置情報の取得
    status.textContent = "位置情報を取得しています…";
    const coords = await getCurrentPosition();

    // LINEユーザー情報でユーザー登録
    status.textContent = "ユーザー情報を登録しています…";

    const userResult = await createUser(dataConnect, {
      lineUserId: lineProfile.userId,
      displayName: lineProfile.displayName,
      userType: "volunteer"
    });

    const userId = userResult.data.user_insert.userId;

    // 写真・位置情報の保存
    status.textContent = "写真をデータベースに保存しています…";

    const postResult = await createGarbagePost(dataConnect, {
      userId,
      photoUrl: compressedDataUrl,
      latitude: coords.latitude,
      longitude: coords.longitude,
      comment: `対象物の大きさ：${selectedSize}`,
      collectionStatus: "未回収"
    });

    status.textContent =
      "投稿を保存できました。投稿ID：" +
      postResult.data.garbagePost_insert.postId;

    // 保存後に入力内容をリセット
    photoInput.value = "";
    compressedDataUrl = null;
    preview.removeAttribute("src");
    preview.style.display = "none";

    document.querySelectorAll(
      'input[name="objectSize"]'
    ).forEach(input => {
      input.checked = false;
    });

  } catch (error) {
    console.error("投稿保存エラー:", error);

    status.textContent =
      "保存に失敗しました：" +
      (error.message || "原因不明のエラー");

  } finally {
    // ログインが完了している場合だけ保存ボタンを有効にする
    sendButton.disabled = !loginReady;
  }
});
