import{a as e,c as t,i as n,o as r,s as i,t as a}from"../index.esm-DT7gI91q.js";var o=i().length?r():t({apiKey:`AIzaSyCYDC_cEmV1ElV6GqFqph5ieGS9akQ8v9tg`,authDomain:`beach-cleanup-14fd4.firebaseapp.com`,projectId:`beach-cleanup-14fd4`,storageBucket:`beach-cleanup-14fd4.firebasestorage.app`,messagingSenderId:`415491442995`,appId:`1:415491442995:web:f354f5aceb67c4c5a75646`}),s=e(o,a),c=document.getElementById(`trash-list`);function l(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function u(e){if(!e)return`日時不明`;let t=new Date(e);return Number.isNaN(t.getTime())?`日時不明`:t.toLocaleString(`ja-JP`)}async function d(){if(!c)console.error(`trash-list 要素が見つかりません。`);else{c.innerHTML=`<p class="text-slate-600">投稿を読み込んでいます...</p>`;try{let e=(await n(s)).data?.garbagePosts??[];if(e.length===0){c.innerHTML=`<p class="text-slate-600">投稿はまだありません。</p>`;return}e.sort((e,t)=>new Date(t.postedAt??0)-new Date(e.postedAt??0)),c.innerHTML=e.map(e=>`
                <article class="flex flex-col sm:flex-row gap-4
                                pb-6 border-b border-slate-300">

                    <div class="shrink-0">
                        ${e.photoUrl?`
                    <img
                        src="${l(e.photoUrl)}"
                        alt="投稿されたごみの写真"
                        class="w-36 h-28 object-cover rounded border"
                        loading="lazy"
                    >
                `:`
                    <div class="w-36 h-28 bg-slate-200
                                flex items-center justify-center
                                rounded text-slate-600">
                        写真なし
                    </div>
                `}
                    </div>

                    <div class="flex-1 min-w-0 space-y-2 text-slate-900">
                        <p>
                            <strong>投稿日時：</strong>
                            ${l(u(e.postedAt))}
                        </p>

                        <p>
                            <strong>投稿者：</strong>
                            ${l(e.user?.displayName||`投稿者不明`)}
                        </p>

                        <p class="break-words">
                            <strong>コメント：</strong>
                            ${l(e.comment||`コメントなし`)}
                        </p>

                        <p>
                            <strong>回収状況：</strong>
                            ${l(e.collectionStatus||`未設定`)}
                        </p>

                        <p>
                            <strong>緯度：</strong>
                            ${l(e.latitude)}
                            /
                            <strong>経度：</strong>
                            ${l(e.longitude)}
                        </p>
                    </div>
                </article>
            `).join(``)}catch(e){console.error(`投稿一覧の取得に失敗しました:`,e),c.innerHTML=`
            <p class="text-red-600">
                投稿を読み込めませんでした。
                F12のConsoleを確認してください。
            </p>
        `}}}var f=L.divIcon({className:`garbage-post-icon`,html:`
        <div style="
            width: 38px;
            height: 38px;
            background: #ffffff;
            border: 3px solid #f97316;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        ">
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="ごみ袋"
                role="img"
            >
                <path
                    d="M9 4 L15 4 L17 7
                       L19 19
                       Q19 21 17 21
                       L7 21
                       Q5 21 5 19
                       L7 7 Z"
                    fill="#fb923c"
                    stroke="#ea580c"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                />
                <path
                    d="M9 4 Q12 7 15 4"
                    fill="none"
                    stroke="#ea580c"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <path
                    d="M9 11 L15 11"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
            </svg>
        </div>
    `,iconSize:[38,38],iconAnchor:[19,19],popupAnchor:[0,-19]});async function p(e){if(!e)console.error(`地図オブジェクトが渡されていません。`);else try{let t=(await n(s)).data?.garbagePosts??[],r=0;t.forEach(t=>{let n=Number(t.latitude),i=Number(t.longitude);if(!Number.isFinite(n)||!Number.isFinite(i)||n<-90||n>90||i<-180||i>180){console.warn(`座標が不正な投稿をスキップしました:`,t);return}let a=L.marker([n,i],{icon:f}),o=document.createElement(`div`);o.style.minWidth=`180px`;let s=document.createElement(`strong`);s.textContent=`ごみ投稿`,o.appendChild(s);let c=document.createElement(`p`);c.textContent=`投稿日時：${u(t.postedAt)}`,o.appendChild(c);let l=document.createElement(`p`);l.textContent=`投稿者：${t.user?.displayName||`投稿者不明`}`,o.appendChild(l);let d=document.createElement(`p`);d.textContent=`コメント：${t.comment||`コメントなし`}`,o.appendChild(d);let p=document.createElement(`p`);if(p.textContent=`回収状況：${t.collectionStatus||`未設定`}`,o.appendChild(p),t.photoUrl){let e=document.createElement(`img`);e.src=t.photoUrl,e.alt=`投稿されたごみの写真`,e.style.display=`block`,e.style.maxWidth=`200px`,e.style.maxHeight=`150px`,e.style.marginTop=`8px`,e.style.borderRadius=`6px`,e.style.objectFit=`cover`,o.appendChild(e)}let m=document.createElement(`button`);m.textContent=`回収する`,m.type=`button`,m.style.display=`block`,m.style.width=`100%`,m.style.marginTop=`12px`,m.style.padding=`10px`,m.style.backgroundColor=`#059669`,m.style.color=`#ffffff`,m.style.border=`none`,m.style.borderRadius=`8px`,m.style.cursor=`pointer`,m.style.fontWeight=`bold`,m.addEventListener(`click`,()=>{alert(`ユーザー情報を取得できませんでした`)}),o.appendChild(m),a.bindPopup(o),a.addTo(e),r++}),console.log(`地図に表示したごみ投稿：${r}件`)}catch(e){console.error(`地図上のごみ投稿取得に失敗しました:`,e)}}window.loadGarbagePostsOnMap=p,document.getElementById(`nav-trash-btn`)?.addEventListener(`click`,d);