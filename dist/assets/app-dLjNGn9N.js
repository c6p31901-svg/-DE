import{a as e,c as t,i as n,o as r,s as i,t as a}from"./index.esm-DT7gI91q.js";var o=i().length?r():t({apiKey:`AIzaSyCYDC_cEmV1ElV6GqFqph5ieGS9akQ8v9tg`,authDomain:`beach-cleanup-14fd4.firebaseapp.com`,projectId:`beach-cleanup-14fd4`,storageBucket:`beach-cleanup-14fd4.firebasestorage.app`,messagingSenderId:`415491442995`,appId:`1:415491442995:web:f354f5aceb67c4c5a75646`}),s=e(o,a),c=document.getElementById(`trash-list`);function l(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function u(e){if(!e)return`日時不明`;let t=new Date(e);return Number.isNaN(t.getTime())?`日時不明`:t.toLocaleString(`ja-JP`)}async function d(){c.innerHTML=`<p class="text-slate-600">投稿を読み込んでいます...</p>`;try{let e=(await n(s)).data?.garbagePosts??[];if(e.length===0){c.innerHTML=`<p class="text-slate-600">投稿はまだありません。</p>`;return}e.sort((e,t)=>new Date(t.postedAt??0)-new Date(e.postedAt??0)),c.innerHTML=e.map(e=>`
                <article class="flex flex-col sm:flex-row gap-4 pb-6 border-b border-slate-300">
                    <div class="shrink-0">${e.photoUrl?`<img src="${l(e.photoUrl)}"
                    alt="投稿されたごみの写真"
                    class="w-36 h-28 object-cover rounded border"
                    loading="lazy">`:`<div class="w-36 h-28 bg-slate-200 flex items-center justify-center">
                    写真なし
                   </div>`}</div>
                    <div class="flex-1 min-w-0 space-y-2 text-slate-900">
                        <p>${l(u(e.postedAt))}</p>
                        <p>投稿者：${l(e.user?.displayName||`投稿者不明`)}</p>
                        <p class="break-words">コメント：${l(e.comment||`コメントなし`)}</p>
                        <p>回収状況：${l(e.collectionStatus||`未設定`)}</p>
                        <p>緯度：${l(e.latitude)} / 経度：${l(e.longitude)}</p>
                    </div>
                </article>
            `).join(``)}catch(e){console.error(`投稿一覧の取得に失敗しました:`,e),c.innerHTML=`<p class="text-red-600">投稿を読み込めませんでした。F12のConsoleを確認してください。</p>`}}document.getElementById(`nav-trash-btn`)?.addEventListener(`click`,d);