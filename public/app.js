let allSmartphones = [];

const glossaries = {
  'RAM': 'RAM（Random Access Memory）は、スマホがアプリを動かすための「作業机」です。容量が大きいほど、多くのアプリを同時に開いても動作が重くなりにくくなります。',
  'CPU': 'CPUはスマホの「頭脳」です。計算処理の速度を決定し、アプリの起動やゲームの快適さに大きく関わります。',
  'GPU': 'GPUは画像処理を担当するパーツです。特に3Dゲームや動画編集、写真加工の滑らかさに影響します。',
  '容量 (ROM)': 'ROM（ストレージ）は、写真、アプリ、データなどを保存しておく「本棚」です。容量が大きいほど、たくさんのデータを保存できます。',
  'バッテリー': 'バッテリー容量（mAh）が大きいほど、一度の充電で長時間使用できます。',
  'SDカード': 'SDカードは、写真や動画などのデータを追加で保存するための外部メモリカードです。',
  'JAC': 'JAC（ジャック）は、イヤホンやヘッドホンを接続するためのポートです。⚪︎は搭載あり、✖︎は非搭載を表します。'
};

async function initApp() {
  const response = await fetch('/api/smartphones');
  allSmartphones = await response.json();
  renderTopMenu();
}

function renderTopMenu() {
  document.getElementById('menu-nav').classList.add('hidden');
  const content = document.getElementById('menu-content');
  content.innerHTML = '';

  const appleBtn = createMenuButton('Apple', 'iPhoneやiPadなど', 'bg-slate-50 hover:bg-slate-100 border-slate-200');
  appleBtn.addEventListener('click', () => renderPhoneList('Apple', 'Appleのスマートフォン', renderTopMenu));

  const androidBtn = createMenuButton('Android', '多彩なブランドを展開', 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900');
  androidBtn.addEventListener('click', renderAndroidBrands);

  content.appendChild(appleBtn);
  content.appendChild(androidBtn);
}

function renderAndroidBrands() {
  showMenuNav('Androidブランドを選択', renderTopMenu);
  const content = document.getElementById('menu-content');
  content.innerHTML = '';
  const brands = [
    { name: 'Google', sub: 'Pixelシリーズ', dbName: 'Google' },
    { name: 'Galaxy', sub: 'Samsung', dbName: 'Samsung' },
    { name: 'AQUOS', sub: 'SHARP', dbName: 'SHARP' },
    { name: 'Xperia', sub: 'Sony', dbName: 'Sony' },
    { name: 'arrows', sub: 'FCNT', dbName: 'FCNT' }
  ];
  brands.forEach(b => {
    const btn = createMenuButton(b.name, b.sub, 'border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md');
    btn.addEventListener('click', () => renderPhoneList(b.dbName, `${b.name}のスマートフォン`, renderAndroidBrands));
    content.appendChild(btn);
  });
}

function renderPhoneList(targetBrand, titleText, backFunction) {
  showMenuNav(titleText, backFunction);
  const content = document.getElementById('menu-content');
  content.innerHTML = '';
  const filteredPhones = allSmartphones.filter(phone => phone.brand === targetBrand);
  if (filteredPhones.length === 0) {
    content.innerHTML = '<p class="text-slate-400 col-span-full py-6 text-center">現在このブランドの登録データはありません。</p>';
    return;
  }
  filteredPhones.forEach(phone => {
    const btn = createMenuButton(phone.name, '詳細を見る', 'border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md');
    btn.querySelector('span.font-bold').className = "font-bold text-indigo-700 text-lg";
    btn.addEventListener('click', () => showDetail(phone));
    content.appendChild(btn);
  });
}

function createMenuButton(title, subtitle, extraClasses) {
  const btn = document.createElement('button');
  btn.className = `p-5 border rounded-2xl text-left transition-all duration-300 w-full shadow-sm flex justify-between items-center bg-white group ${extraClasses}`;
  btn.innerHTML = `
    <div class="flex flex-col">
      <span class="font-bold text-slate-800">${title}</span>
      <span class="text-xs text-slate-500 mt-1">${subtitle}</span>
    </div>
    <svg class="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
  `;
  return btn;
}

function showMenuNav(title, backAction) {
  const nav = document.getElementById('menu-nav');
  nav.classList.remove('hidden');
  document.getElementById('menu-title').textContent = title;
  const backBtn = document.getElementById('menu-back-btn');
  const newBackBtn = backBtn.cloneNode(true);
  backBtn.parentNode.replaceChild(newBackBtn, backBtn);
  newBackBtn.addEventListener('click', backAction);
}

function showGlossary(label, phone) {
  const tbody = document.getElementById('selected-specs');
  tbody.innerHTML = ''; 

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = 2; 
  td.className = "p-6 md:p-10 bg-indigo-50/30"; 

  td.innerHTML = `
    <div class="flex items-center gap-2 mb-4">
      <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h4 class="font-extrabold text-xl text-indigo-900">${label}</h4>
    </div>
    <p class="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">${glossaries[label] || '説明がありません。'}</p>
  `;

  const backBtn = document.createElement('button');
  backBtn.className = "flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm active:scale-95";
  backBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> スペック表に戻る`;
  
  // 🌟 修正ポイント1: showDetail ではなく、新しい renderSpecTable を呼ぶ！
  backBtn.onclick = () => renderSpecTable(phone); 

  td.appendChild(backBtn);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

// 🌟 新しく作成した関数：スペック表だけを描画・再描画する処理
function renderSpecTable(phone) {
  const tbody = document.getElementById('selected-specs');
  tbody.innerHTML = '';
  
  const specData = [
    { label: '発売日', value: phone.releaseDate ? new Date(phone.releaseDate).toLocaleDateString() : '不明' },
    { label: '容量 (ROM)', value: phone.specs?.rom || '不明' },
    { label: 'RAM', value: phone.specs?.ram || '不明' },
    { label: 'サイズ', value: phone.size || '不明' },
    { label: 'ディスプレイ', value: phone.display || '不明' },
    { label: '重量', value: phone.weight || '不明' },
    { label: 'CPU', value: phone.specs?.cpu || '不明' },
    { label: 'GPU', value: phone.specs?.gpu || '不明' },
    { label: 'バッテリー', value: phone.battery || '不明' },
    { label: 'SDカード', value: phone.sd_card || '不明' },
    { label: 'JAC', value: phone.jac || '不明' },
  ];

  specData.forEach(spec => {
    const tr = document.createElement('tr');
    tr.className = "group transition-colors duration-200 hover:bg-indigo-50/40";
    
    const labelCell = document.createElement('th');
    labelCell.className = "px-5 py-5 md:py-6 bg-slate-50/50 font-medium text-slate-500 w-1/3 text-sm";
    
    if (glossaries[spec.label]) {
      labelCell.classList.add('cursor-pointer', 'group-hover:text-indigo-600', 'transition-colors');
      labelCell.innerHTML = `<span class="border-b border-dashed border-slate-300 group-hover:border-indigo-400 pb-0.5">${spec.label}</span>`;
      labelCell.onclick = () => showGlossary(spec.label, phone);
    } else {
      labelCell.textContent = spec.label;
    }

    const valueCell = document.createElement('td');
    valueCell.className = "px-5 py-5 md:py-6 text-slate-800 font-medium text-sm";
    valueCell.textContent = spec.value;

    tr.appendChild(labelCell);
    tr.appendChild(valueCell);
    tbody.appendChild(tr);
  });
}

function showDetail(phone) {
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.add('max-h-0', 'opacity-0', 'pointer-events-none');
  dropdownMenu.classList.remove('max-h-[600px]', 'opacity-100');
  
  document.getElementById('welcome-message').classList.add('hidden');
  
  const detailBox = document.getElementById('detail-box');
  detailBox.classList.remove('hidden');
  detailBox.style.animation = 'none';
  detailBox.offsetHeight;
  detailBox.style.animation = null;

  document.getElementById('selected-name').textContent = phone.name;

  const imageEl = document.getElementById('phone-image');
  const colorNameEl = document.getElementById('current-color-name');
  
  // 色や画像の初期化はここでのみ行う
  if (phone.variants && phone.variants.length > 0) {
    imageEl.src = phone.variants[0].imageUrl;
    colorNameEl.textContent = phone.variants[0].colorName;
  }

  const colorContainer = document.getElementById('color-options');
  colorContainer.innerHTML = ''; 
  if (phone.variants) {
    phone.variants.forEach(variant => {
      const btn = document.createElement('button');
      btn.className = 'w-9 h-9 rounded-full border-2 border-white ring-1 ring-slate-200 shadow-md hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400';
      btn.style.backgroundColor = variant.colorHex; 
      
      btn.addEventListener('click', () => {
        imageEl.src = variant.imageUrl;
        colorNameEl.textContent = variant.colorName; 
      });
      
      colorContainer.appendChild(btn);
    });
  }
  renderSpecTable(phone);
}

const searchBtn = document.getElementById('search-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

searchBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  if (dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.remove('max-h-0', 'opacity-0', 'pointer-events-none');
    dropdownMenu.classList.add('max-h-[600px]', 'opacity-100'); 
  } else {
    dropdownMenu.classList.add('max-h-0', 'opacity-0', 'pointer-events-none');
    dropdownMenu.classList.remove('max-h-[600px]', 'opacity-100');
  }
});

dropdownMenu.addEventListener('click', (event) => event.stopPropagation());

window.addEventListener('click', () => {
  if (!dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.add('max-h-0', 'opacity-0', 'pointer-events-none');
    dropdownMenu.classList.remove('max-h-[600px]', 'opacity-100');
  }
});

initApp();

// アプリ（タブ）の表示状態が変わったことを検知するイベントリスナー
document.addEventListener('visibilitychange', () => {
  // アプリが再び画面に表示された（フォアグラウンドに戻った）場合
  if (document.visibilityState === 'visible') {
    // ページを強制的にリロードする
    window.location.reload();
  }
});