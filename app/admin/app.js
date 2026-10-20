// 投稿マップ（アップロードされた地図コードの主要レイヤーを利用）
let postMap = null;
let postMapGeoJsonLayer = null;
const originalMapZones = [
 { id: 'west', center: [35.3172, 139.3875], radius: 400, color: '#eab308', popup: '<strong>西側エリア</strong><br>ごみ量：中' },
 { id: 'east', center: [35.3168, 139.4010], radius: 600, color: '#ef4444', popup: '<strong>東側エリア</strong><br>ごみ量：多（優先回収エリア）' }
];

function initPostMap() {
 const mapElement = document.getElementById('post-map');
 if (!mapElement || !window.L) {
  const status = document.getElementById('post-map-status');
  if (status) status.textContent = '地図ライブラリを読み込めませんでした。インターネット接続を確認してください。';
  return;
 }
 if (postMap) { postMap.invalidateSize(); return; }

 // 元の地図コードの対象エリアが画面内に収まる位置で表示
 postMap = L.map('post-map', { zoomControl: false }).setView([35.3168, 139.3985], 14);
 L.control.zoom({ position: 'bottomright' }).addTo(postMap);
 L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
  minZoom: 10,
  maxZoom: 20,
  maxNativeZoom: 18,
  attribution: '地理院タイル'
 }).addTo(postMap);

 // 元のindex (1)(1).htmlにある黄色・赤色の対象エリア
 originalMapZones.forEach(zone => {
  L.circle(zone.center, {
   radius: zone.radius,
   color: zone.color,
   fillColor: zone.color,
   fillOpacity: 0.35,
   weight: 2
  }).addTo(postMap).bindPopup(zone.popup);
 });

 // 元の地図にある注射器注意区域（紫色の円）
 L.circle([35.3168, 139.3985], {
  radius: 200,
  color: '#a855f7',
  fillColor: '#a855f7',
  fillOpacity: 0.35,
  weight: 2
 }).addTo(postMap).bindPopup('<strong>注射器発見要注意区域</strong>');

 // 元の地図にある危険物の警告マーカー
 const dangerIcon = L.divIcon({
  className: '',
  html: '<div class="admin-danger-marker">⚠</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
 });
 L.marker([35.31650, 139.39850], { icon: dangerIcon })
  .addTo(postMap)
  .bindPopup('<strong>危険物の報告地点（サンプル）</strong><br>注射器などの危険物に注意してください。');

 // 提供されたGeoJSONを地図に読み込む。ファイル内に地点があれば緑色で表示。
 const status = document.getElementById('post-map-status');
 fetch('./trash_places.geojson')
  .then(response => {
   if (!response.ok) throw new Error('GeoJSONファイルを読み込めません');
   return response.json();
  })
  .then(data => {
   if (!data || data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
    throw new Error('GeoJSONの形式がFeatureCollectionではありません');
   }
   postMapGeoJsonLayer = L.geoJSON(data, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
     radius: 7, color: '#ffffff', weight: 2, fillColor: '#07805b', fillOpacity: 0.95
    }),
    style: () => ({ color: '#07805b', weight: 3, fillColor: '#10b981', fillOpacity: 0.25 }),
    onEachFeature: (feature, layer) => {
     const props = feature.properties || {};
     const name = escapeHtml(props.name || props.名称 || props.title || 'ごみ置き場');
     const description = escapeHtml(props.description || props.説明 || props.comment || '詳細情報は登録されていません。');
     layer.bindPopup(`<strong>${name}</strong><br>${description}`);
    }
   }).addTo(postMap);
   const count = data.features.length;
   if (status) {
    status.textContent = count > 0
     ? `地図表示中：対象エリア・危険物マーカー・GeoJSON地点 ${count} 件`
     : '地図表示中：対象エリア・危険物マーカーを表示。GeoJSONの地点データは現在0件です。';
   }
   // 地点が登録されている場合は、既存ゾーンも含めて範囲に収める
   if (count > 0) {
    const bounds = postMapGeoJsonLayer.getBounds();
    if (bounds.isValid()) postMap.fitBounds(bounds.pad(0.15));
   }
  })
  .catch(error => {
   console.warn('GeoJSON読み込みに失敗しました。Live Server等のローカルサーバー経由で開いてください。', error);
   if (status) status.textContent = '地図は表示中です。GeoJSONを読み込むには、フォルダをローカルサーバー（VS Code Live Server等）で開いてください。';
  });

 // サイズ計算のタイミング差を補正
 setTimeout(() => postMap && postMap.invalidateSize(), 250);
}

const reports = [
 {id:1,date:"2026/10/12 09:42",place:"藤沢市・海岸西側",type:"注射器のような物",comment:"砂浜に落ちている。直接触れていない。",priority:"高",status:"未対応",danger:true,age:"12分前",icon:"⚠"},
 {id:2,date:"2026/10/12 09:18",place:"茅ヶ崎市・中央付近",type:"漂着プラスチック",comment:"ペットボトルや包装材がまとまっている。",priority:"中",status:"未対応",danger:false,age:"36分前",icon:"♻"},
 {id:3,date:"2026/10/12 08:55",place:"平塚市・東側",type:"ごみ袋の集積",comment:"指定置き場に袋が4つあります。",priority:"中",status:"対応中",danger:false,age:"59分前",icon:"▤"},
 {id:5,date:"2026/10/11 16:20",place:"逗子市・海岸中央",type:"流木・大型ごみ",comment:"人力での回収が難しそうです。",priority:"中",status:"未対応",danger:false,age:"昨日",icon:"🪵"},
 {id:6,date:"2026/10/11 14:05",place:"大磯町・西側",type:"空き缶・包装材",comment:"少量の散乱ごみです。",priority:"低",status:"回収済み",danger:false,age:"昨日",icon:"♻"}
];
let bags = [
 {id:1,date:"2026/10/12 08:50",place:"茅ヶ崎市・第3置き場",count:4,reporter:"ビーチクリーン湘南",status:"未回収"},
 {id:2,date:"2026/10/12 08:15",place:"藤沢市・第2置き場",count:7,reporter:"個人ボランティア",status:"未回収"},
 {id:3,date:"2026/10/11 15:40",place:"平塚市・第1置き場",count:3,reporter:"湘南美化グループ",status:"未回収"},
];
let notices = [
 {title:"危険な漂着生物に注意",category:"安全情報",body:"海岸に毒性のある生物が漂着している可能性があります。見つけても触れず、位置と写真を報告してください。",date:"2026/10/12"},
 {title:"週末のビーチクリーン参加者募集",category:"ボランティア募集",body:"週末の清掃活動に参加できる方を募集しています。活動前に最新のお知らせをご確認ください。",date:"2026/10/10"}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const statusClass = s => s==="回収済み" ? "done" : s==="対応中" ? "progress" : "unresolved";
const priorityClass = p => p==="高" ? "high" : p==="中" ? "medium" : "low";
function statusPill(s){return `<span class="status-pill ${statusClass(s)}">${s}</span>`}
function priorityPill(p){return `<span class="priority-pill ${priorityClass(p)}">優先度 ${p}</span>`}
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2400)}
function updateStats(){
 $("#stat-open").textContent=reports.filter(r=>r.status!=="回収済み").length;
 $("#stat-danger").textContent=reports.filter(r=>r.danger&&r.status!=="回収済み").length;
 $("#stat-bags").textContent=bags.filter(b=>b.status==="未回収").length;
 $("#stat-today").textContent=reports.filter(r=>r.date.startsWith("2026/10/12")).length;
 $("#nav-report-count").textContent=reports.filter(r=>r.status==="未対応").length;
}
function reportRow(r,compact=false){
 return `<tr><td>${r.date}</td><td><span class="table-place">${r.place}</span><span class="table-sub">デモ位置情報</span></td><td><span class="table-tag">${r.icon} ${r.type}</span></td><td>${priorityPill(r.priority)}</td><td>${statusPill(r.status)}</td><td><button class="mini-btn" data-detail="${r.id}">詳細・対応</button></td></tr>`;
}
function renderRecent(){ $("#recent-table").innerHTML=reports.slice(0,4).map(r=>reportRow(r,true)).join("");}
function renderReports(){
 const q=$("#report-search").value.toLowerCase(), st=$("#status-filter").value, pr=$("#priority-filter").value;
 const rows=reports.filter(r=>(`${r.place} ${r.type} ${r.comment}`.toLowerCase().includes(q))&&(st==="all"||r.status===st)&&(pr==="all"||r.priority===pr));
 $("#reports-table").innerHTML=rows.length?rows.map(r=>reportRow(r)).join(""):`<tr><td colspan="6">該当する投稿はありません。</td></tr>`;
}
function renderPriority(){
 const items=reports.filter(r=>r.status!=="回収済み").sort((a,b)=>({高:0,中:1,低:2}[a.priority]-({高:0,中:1,低:2}[b.priority]))).slice(0,3);
 $("#priority-list").innerHTML=items.map(r=>`<div class="priority-item"><div class="priority-symbol ${r.danger?"danger":"warn"}">${r.danger?"!":"●"}</div><div class="priority-text"><strong>${r.type}</strong><small>${r.place} ・ ${r.age}</small></div>${priorityPill(r.priority)}</div>`).join("");
}
function renderDanger(){
 const items=reports.filter(r=>r.danger&&r.status!=="回収済み");
 $("#danger-cards").innerHTML=items.length?items.map(r=>`<article class="danger-card"><div class="danger-card-top">${priorityPill(r.priority)}<span class="table-sub">${r.date}</span></div><h3>⚠ ${r.type}</h3><p>${r.comment}</p><div class="danger-meta">場所：${r.place}　/　AI判定：危険物の疑い（デモ）</div><div class="danger-actions"><button class="primary" data-detail="${r.id}">投稿詳細を確認</button><button class="outline" data-status="${r.id}" data-next="対応中">対応中にする</button></div></article>`).join(""):`<div class="panel">現在、未対応の危険物投稿はありません。</div>`;
}
function renderBags(){
 $("#bags-table").innerHTML=bags.map(b=>`<tr><td>${b.date}</td><td><span class="table-place">${b.place}</span></td><td>${b.count}袋</td><td>${b.reporter}</td><td>${statusPill(b.status==="回収済み"?"回収済み": "未対応")}</td><td>${b.status==="未回収"?`<button class="mini-btn" data-bag="${b.id}">回収済みにする</button>`:"—"}</td></tr>`).join("");
}
function renderNotices(){
 $("#notice-list").innerHTML=notices.map(n=>`<article class="notice-item"><small>${n.date}</small><div><span class="category-label">${n.category}</span></div><strong>${escapeHtml(n.title)}</strong><p>${escapeHtml(n.body)}</p></article>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openDetail(id){
 const r=reports.find(x=>x.id===Number(id));if(!r)return;
 $("#detail-content").innerHTML=`<h2>投稿詳細 #${r.id}</h2><div class="detail-photo">${r.icon}</div><dl class="detail-fields"><dt>投稿日時</dt><dd>${r.date}</dd><dt>場所</dt><dd>${r.place}</dd><dt>ごみ情報</dt><dd>${r.type}</dd><dt>優先度</dt><dd>${priorityPill(r.priority)}</dd><dt>状態</dt><dd>${statusPill(r.status)}</dd><dt>コメント</dt><dd>${escapeHtml(r.comment)}</dd><dt>AI判定</dt><dd>${r.danger?"危険物の疑い（要目視確認）":"危険物判定なし（デモ）"}</dd></dl><div class="dialog-actions"><button class="outline" data-status="${r.id}" data-next="未対応">未対応に戻す</button><button class="outline" data-status="${r.id}" data-next="対応中">対応中にする</button><button class="primary" data-status="${r.id}" data-next="回収済み">回収済みにする</button></div>`;
 $("#detail-dialog").showModal();
}
function navigate(view){
 $$(".view").forEach(el=>el.classList.add("hidden"));
 const target=$(`#${view}-view`);if(target)target.classList.remove("hidden");
 $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 const names={dashboard:"ダッシュボード",reports:"ごみ投稿管理",danger:"危険物確認",bags:"ごみ袋回収管理",notices:"お知らせ管理",cleaning:"清掃計画"};
 $("#page-title").textContent=names[view]||"管理画面";
 if(view==="reports")renderReports();
 if(view==="dashboard" && postMap) setTimeout(()=>postMap.invalidateSize(), 80);
 window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-view]");if(nav)navigate(nav.dataset.view);
 const go=e.target.closest("[data-goto]");if(go)navigate(go.dataset.goto);
 const det=e.target.closest("[data-detail]");if(det)openDetail(det.dataset.detail);
 const status=e.target.closest("[data-status]");
 if(status){
  const r=reports.find(x=>x.id===Number(status.dataset.status));if(r){r.status=status.dataset.next;$("#detail-dialog").close();refresh();showToast(`投稿 #${r.id} を「${r.status}」に更新しました`);}
 }
 const bag=e.target.closest("[data-bag]");
 if(bag){const b=bags.find(x=>x.id===Number(bag.dataset.bag));if(b){b.status="回収済み";renderBags();updateStats();showToast("ごみ袋を回収済みに更新しました");}}
});
$("#report-search").addEventListener("input",renderReports);
$("#status-filter").addEventListener("change",renderReports);
$("#priority-filter").addEventListener("change",renderReports);
function refresh(){updateStats();renderRecent();renderReports();renderPriority();renderDanger();renderBags();}
$("#notice-form").addEventListener("submit",e=>{
 e.preventDefault();
 notices.unshift({title:$("#notice-title").value.trim(),category:$("#notice-category").value,body:$("#notice-body").value.trim(),date:new Date().toLocaleDateString("ja-JP").replaceAll("/","/")});
 renderNotices();e.target.reset();showToast("お知らせをデモ画面に追加しました");
});
$("#export-btn").addEventListener("click",()=>{
 const header=["投稿ID","投稿日時","場所","ごみ情報","コメント","優先度","状態"];
 const rows=reports.map(r=>[r.id,r.date,r.place,r.type,r.comment,r.priority,r.status]);
 const csv=[header,...rows].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\r\n");
 const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});
 const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="kaigan_reports_demo.csv";a.click();URL.revokeObjectURL(url);showToast("投稿一覧のCSVを書き出しました");
});
$("#today-label").textContent=new Date().toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric",weekday:"short"});
refresh();renderNotices();initPostMap();
