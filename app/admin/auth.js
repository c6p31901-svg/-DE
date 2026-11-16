
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { auth } from "./firebase.js";

// 管理者UID
const ADMIN_UIDS = [
  "hRlJwg9MjVcKsGm4ugvb37oxRlt2",
  "uRg1XoqhezLs4zu70SynLuBfUpD2"
];

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const message = document.getElementById("message");

// ログイン状態の確認
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  if (ADMIN_UIDS.includes(user.uid)) {
    location.replace("./kannri_index.html");
  } else {
    await signOut(auth);
    message.textContent = "このアカウントには管理者権限がありません。";
  }
});

// ログイン処理
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "";
  loginButton.disabled = true;
  loginButton.textContent = "ログイン中...";

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // UIDによる管理者判定
    if (!ADMIN_UIDS.includes(result.user.uid)) {
      await signOut(auth);
      throw new Error("このアカウントには管理者権限がありません。");
    }

    location.replace("./kannri_index.html");

  } catch (error) {
    console.error("ログインエラー:", error);

    if (error.message === "このアカウントには管理者権限がありません。") {
      message.textContent = error.message;
    } else if (
      error.code === "auth/invalid-credential"
    ) {
      message.textContent = "メールアドレスまたはパスワードが正しくありません。";
    } else if (
      error.code === "auth/too-many-requests"
    ) {
      message.textContent = "ログイン試行回数が多すぎます。時間をおいて再試行してください。";
    } else {
      message.textContent = "ログインに失敗しました。設定を確認してください。";
    }

  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "ログイン";
  }
});
