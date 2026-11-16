import{a as e,d as t,f as n,o as r,p as i,t as a}from"../index.esm-B6uBLM-Y.js";var o=n().length?t():i({apiKey:`AIzaSyCYDC_cEmV1ElV6GqFqph5ieGS9akQ8v9tg`,authDomain:`beach-cleanup-14fd4.firebaseapp.com`,projectId:`beach-cleanup-14fd4`,storageBucket:`beach-cleanup-14fd4.firebasestorage.app`,messagingSenderId:`415491442995`,appId:`1:415491442995:web:f354f5aceb67c4c5a75646`}),s=r(o,a),c=document.getElementById(`trash-list`);function l(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function u(e){if(!e)return`日時不明`;let t=new Date(e);return Number.isNaN(t.getTime())?`日時不明`:t.toLocaleString(`ja-JP`)}function d(e){if(!e)return`日時不明`;let t=new Date(e);if(Number.isNaN(t.getTime()))return`日時不明`;let n=Math.max(0,Date.now()-t.getTime()),r=Math.floor(n/6e4),i=Math.floor(r/60),a=Math.floor(i/24);return a>0?`${a}日${i%24}時間`:i>0?`${i}時間${r%60}分`:`${r}分`}function f(){document.querySelectorAll(`.elapsed-time`).forEach(e=>{e.textContent=d(e.dataset.postedAt)})}async function p(){if(!c)console.error(`trash-list 要素が見つかりません。`);else{c.innerHTML=`<p class="text-slate-600">投稿を読み込んでいます...</p>`;try{let t=(await e(s)).data?.garbagePosts??[];if(t.length===0){c.innerHTML=`<p class="text-slate-600">投稿はまだありません。</p>`;return}t.sort((e,t)=>new Date(t.postedAt??0)-new Date(e.postedAt??0)),c.innerHTML=t.map(e=>`
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

                    <div class="flex-1 min-w-0 space-y-2 text-white">
                        <p>
                            <strong>撮影日時：</strong>
                            ${l(u(e.postedAt))}
                        </p>

                        <p>
                            <strong>経過時間：</strong>
                          <span
                            class="elapsed-time"
                            data-posted-at="${l(e.postedAt??``)}"
                          >
                          ${l(d(e.postedAt))}
                         </span>
                        
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
            `).join(``),f()}catch(e){console.error(`投稿一覧の取得に失敗しました:`,e),c.innerHTML=`
            <p class="text-red-600">
                投稿を読み込めませんでした。
                F12のConsoleを確認してください。
            </p>
        `}}}var m=L.divIcon({className:`garbage-post-icon`,html:`
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
    `,iconSize:[38,38],iconAnchor:[19,19],popupAnchor:[0,-19]});async function h(t){if(!t)console.error(`地図オブジェクトが渡されていません。`);else try{let n=(await e(s)).data?.garbagePosts??[],r=0;n.forEach(e=>{let n=Number(e.latitude),i=Number(e.longitude);if(!Number.isFinite(n)||!Number.isFinite(i)||n<-90||n>90||i<-180||i>180){console.warn(`座標が不正な投稿をスキップしました:`,e);return}let a=L.marker([n,i],{icon:m}),o=document.createElement(`div`);o.style.minWidth=`180px`;let s=document.createElement(`strong`);s.textContent=`ごみ投稿`,o.appendChild(s);let c=document.createElement(`p`);c.textContent=`撮影日時：${u(e.postedAt)}`,o.appendChild(c);let l=document.createElement(`p`);l.className=`elapsed-time`,l.dataset.postedAt=e.postedAt??``,l.textContent=d(e.postedAt),o.appendChild(l);let f=document.createElement(`p`);f.textContent=`投稿者：${e.user?.displayName||`投稿者不明`}`,o.appendChild(f);let p=document.createElement(`p`);p.textContent=`コメント：${e.comment||`コメントなし`}`,o.appendChild(p);let h=document.createElement(`p`);if(h.textContent=`回収状況：${e.collectionStatus||`未設定`}`,o.appendChild(h),e.photoUrl){let t=document.createElement(`img`);t.src=e.photoUrl,t.alt=`投稿されたごみの写真`,t.style.display=`block`,t.style.maxWidth=`200px`,t.style.maxHeight=`150px`,t.style.marginTop=`8px`,t.style.borderRadius=`6px`,t.style.objectFit=`cover`,o.appendChild(t)}let g=document.createElement(`button`);g.textContent=`回収する`,g.type=`button`,g.style.display=`block`,g.style.width=`100%`,g.style.marginTop=`12px`,g.style.padding=`10px`,g.style.backgroundColor=`#059669`,g.style.color=`#ffffff`,g.style.border=`none`,g.style.borderRadius=`8px`,g.style.cursor=`pointer`,g.style.fontWeight=`bold`,g.addEventListener(`click`,()=>{alert(`ユーザー情報を取得できませんでした`)}),o.appendChild(g),a.bindPopup(o),a.addTo(t),r++}),console.log(`地図に表示したごみ投稿：${r}件`)}catch(e){console.error(`地図上のごみ投稿取得に失敗しました:`,e)}}window.loadGarbagePostsOnMap=h,document.getElementById(`nav-trash-btn`)?.addEventListener(`click`,p),setInterval(f,6e4);