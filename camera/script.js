import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider
} from "firebase/app-check";
import {
  connectorConfig,
  createUser,
  createGarbagePost
} from "../src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCU_cEmV1ElV6GqFqph5ieGS9akQ8v9tg",
  authDomain: "beach-cleanup-14fd4.firebaseapp.com",
  projectId: "beach-cleanup-14fd4",
  storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
  messagingSenderId: "415491442995",
  appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
// Firebase App Checkの初期化
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LcNNDAuAAAAAEy20nTs21CAOY2cAm9hqGUhufen"
  ),
  isTokenAutoRefreshEnabled: true
});

const dataConnect = getDataConnect(app, connectorConfig);
const functions = getFunctions(app, "asia-northeast1");
const detectGarbage = httpsCallable(functions, "detectGarbage");
// HTML要素

// HTML要素
const preview = document.getElementById("preview");
const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

const cameraVideo = document.getElementById("cameraVideo");
const cameraContainer = document.getElementById("cameraContainer");
const captureCanvas = document.getElementById("captureCanvas");

const startCameraButton = document.getElementById("startCamera");
const captureButton = document.getElementById("captureButton");
const retakeButton = document.getElementById("retakeButton");

let compressedDataUrl = null;
let cameraStream = null;


// カメラを起動する
async function startCamera() {
    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("このブラウザではカメラを利用できません。");
        }

        cameraStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        cameraVideo.srcObject = cameraStream;
        await cameraVideo.play();

        cameraContainer.style.display = "block";
        captureButton.style.display = "block";
        startCameraButton.style.display = "none";
        retakeButton.style.display = "none";

        status.textContent = "撮影する対象物を枠内に収めてください。";

    } catch (error) {
        console.error("カメラ起動エラー:", error);
        status.textContent =
            error.message || "カメラを起動できませんでした。";
    }
}

// カメラを停止する
function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    cameraVideo.srcObject = null;
}

// 撮影する
function capturePhoto() {
    if (!cameraVideo.videoWidth || !cameraVideo.videoHeight) {
        status.textContent = "カメラ映像を取得できません。";
        return;
    }

    const width = cameraVideo.videoWidth;
    const height = cameraVideo.videoHeight;

    // 映像の中央を正方形に切り出す
    const cropSize = Math.min(width, height);
    const sx = (width - cropSize) / 2;
    const sy = (height - cropSize) / 2;

    const outputSize = 800;

    captureCanvas.width = outputSize;
    captureCanvas.height = outputSize;

    const context = captureCanvas.getContext("2d");

    context.drawImage(
        cameraVideo,
        sx, sy, cropSize, cropSize,
        0, 0, outputSize, outputSize
    );

    // JPEG形式に変換
    compressedDataUrl = captureCanvas.toDataURL(
        "image/jpeg",
        0.8
    );

    // プレビュー表示
    preview.src = compressedDataUrl;
    preview.style.display = "block";

    // 撮影後はカメラを停止
    stopCamera();

    cameraContainer.style.display = "none";
    captureButton.style.display = "none";
    startCameraButton.style.display = "none";
    retakeButton.style.display = "block";

    status.textContent = "写真を準備しました。";
}

// イベント登録
startCameraButton.addEventListener("click", startCamera);

captureButton.addEventListener("click", capturePhoto);

// 撮り直し
retakeButton.addEventListener("click", () => {
    compressedDataUrl = null;
    preview.removeAttribute("src");
    preview.style.display = "none";

    startCamera();
});

// 現在地を取得する
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("このブラウザでは位置情報を利用できません。")
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),

      error => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(
            new Error("位置情報の利用を許可してください。")
          );
        } else if (error.code === error.TIMEOUT) {
          reject(
            new Error("位置情報の取得がタイムアウトしました。")
          );
        } else {
          reject(
            new Error("位置情報を取得できませんでした。")
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000
      }
    );
  });
}

// 写真・大きさ・位置情報を保存する
sendButton.addEventListener("click", async () => {
  if (sendButton.disabled) return;

  sendButton.disabled = true;

  try {
    // 写真が選択されているか確認
    if (!compressedDataUrl) {
    throw new Error("先に写真を撮影してください。");
    }
     

    // 対象物の大きさを取得
    const sizeInput = document.querySelector(
      'input[name="objectSize"]:checked'
    );

    if (!sizeInput) {
      throw new Error("対象物の大きさを選択してください。");
    }

    const selectedSize = sizeInput.value;

    // 現在地を取得
    status.textContent = "位置情報を取得しています…";

    const coords = await getCurrentPosition();

    // テスト用ユーザーを登録
    status.textContent = "テスト用ユーザーを登録しています…";

    const userResult = await createUser(dataConnect, {
      lineUserId: `photo-test-${Date.now()}`,
      displayName: "写真保存テスト",
      userType: "volunteer"
    });

    const userId = userResult.data.user_insert.userId;

    const postResult = await createGarbagePost(dataConnect, {
      userId: userId,
      photoUrl: compressedDataUrl,
      latitude: coords.latitude,
      longitude: coords.longitude,
      comment: `対象物の大きさ：${selectedSize}`,
      collectionStatus: "未回収"
    });

    // 投稿IDを取得
    const postId = postResult.data.garbagePost_insert.postId;

    // 投稿保存成功
    status.textContent =
      "投稿を保存できました。投稿ID：" + postId;
    
    // AWS LambdaによるAI画像判定
    status.textContent = "写真を保存しました。AIで画像を判定しています…";
    
    try {
      const aiResponse = await detectGarbage({
        photoUrl: compressedDataUrl
      });
    
      const aiResult = aiResponse.data;
    
      console.log("AI判定結果:", {
        postId,
        labels: aiResult.labels
      });
    
      status.textContent =
        "投稿とAI判定が完了しました。投稿ID：" + postId;
    
    } catch (aiError) {
      console.error("AI判定エラー:", aiError);
    
      status.textContent =
        "写真の保存は完了しましたが、AI判定に失敗しました。投稿ID：" + postId;
    }
    
    
    // 入力内容をリセット
compressedDataUrl = null;

preview.removeAttribute("src");
preview.style.display = "none";

cameraContainer.style.display = "none";
captureButton.style.display = "none";
retakeButton.style.display = "none";
startCameraButton.style.display = "block";

stopCamera();

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
    // ログイン機能を使わないため、保存処理後はボタンを有効にする
    sendButton.disabled = false;
  }
});
