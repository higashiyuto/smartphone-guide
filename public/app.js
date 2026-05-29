let allSmartphones = []; // 取得した全スマホデータを保持しておく変数

// アプリの初期化
async function initApp() {
  const response = await fetch('/api/smartphones');
  allSmartphones = await response.json();
  
  // 最初の画面（Apple / Android の選択）を描画
  renderTopMenu();
}

// ① 第一階層：Apple or Android の選択画面
function renderTopMenu() {
  document.getElementById('menu-nav').classList.add('hidden'); // 戻るボタンを隠す
  const content = document.getElementById('menu-content');
  content.innerHTML = ''; // 中身をリセット

  // Appleボタン
  const appleBtn = createMenuButton('Apple (iPhone等)', 'bg-gray-50 hover:bg-gray-100 border-gray-200');
  appleBtn.addEventListener('click', () => renderPhoneList('Apple', 'Appleのスマートフォン', renderTopMenu));

  // Androidボタン
  const androidBtn = createMenuButton('Android (各種ブランド)', 'bg-green-50 hover:bg-green-100 border-green-200 text-green-900');
  androidBtn.addEventListener('click', renderAndroidBrands);

  content.appendChild(appleBtn);
  content.appendChild(androidBtn);
}

// ② 第二階層：Androidのブランド選択画面
function renderAndroidBrands() {
  showMenuNav('Androidブランドを選択', renderTopMenu);
  const content = document.getElementById('menu-content');
  content.innerHTML = '';

  const brands = [
    { name: 'Google (Pixel)', dbName: 'Google' },
    { name: 'Galaxy (Samsung)', dbName: 'Samsung' },
    { name: 'AQUOS (SHARP)', dbName: 'SHARP' },
    { name: 'Xperia (Sony)', dbName: 'Sony' },
    { name: 'arrows (FCNT)', dbName: 'FCNT' }
  ];

  brands.forEach(b => {
    const btn = createMenuButton(b.name, 'border-gray-200 hover:border-blue-400 hover:bg-blue-50');
    btn.addEventListener('click', () => renderPhoneList(b.dbName, `${b.name}のスマートフォン`, renderAndroidBrands));
    content.appendChild(btn);
  });
}

// ③ 第三階層：実際のスマホ機種一覧画面
function renderPhoneList(targetBrand, titleText, backFunction) {
  showMenuNav(titleText, backFunction);
  const content = document.getElementById('menu-content');
  content.innerHTML = '';

  const filteredPhones = allSmartphones.filter(phone => phone.brand === targetBrand);

  if (filteredPhones.length === 0) {
    content.innerHTML = '<p class="text-gray-500 col-span-full py-4 pl-2">現在このブランドの登録データはありません。</p>';
    return;
  }

  filteredPhones.forEach(phone => {
    const btn = createMenuButton(phone.name, 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 font-bold text-blue-700');
    btn.addEventListener('click', () => showDetail(phone));
    content.appendChild(btn);
  });
}

// --- UI補助関数 ---
function createMenuButton(text, extraClasses) {
  const btn = document.createElement('button');
  btn.className = `p-4 border rounded-xl text-left transition w-full shadow-sm flex justify-between items-center bg-white ${extraClasses}`;
  btn.innerHTML = `<span>${text}</span> <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
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

// 詳細画面の表示処理
function showDetail(phone) {
  // メニューを閉じる
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.add('max-h-0', 'opacity-0');
  dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  
  // 案内メッセージを隠し、詳細ボックスを表示
  document.getElementById('welcome-message').classList.add('hidden');
  document.getElementById('detail-box').classList.remove('hidden');
  document.getElementById('selected-name').textContent = phone.name;

  const imageEl = document.getElementById('phone-image');
  const colorNameEl = document.getElementById('current-color-name');
  
  if (phone.variants && phone.variants.length > 0) {
    imageEl.src = phone.variants[0].imageUrl;
    colorNameEl.textContent = phone.variants[0].colorName;
  }

  const colorContainer = document.getElementById('color-options');
  colorContainer.innerHTML = ''; 

  if (phone.variants) {
    phone.variants.forEach(variant => {
      const btn = document.createElement('button');
      btn.className = 'w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm hover:scale-110 transition cursor-pointer';
      btn.style.backgroundColor = variant.colorHex; 
      
      btn.addEventListener('click', () => {
        imageEl.src = variant.imageUrl;
        colorNameEl.textContent = variant.colorName; 
      });
      
      colorContainer.appendChild(btn);
    });
  }

  const tbody = document.getElementById('selected-specs');
  tbody.innerHTML = '';
  
  if (phone.specs) {
    // 表示したい順番とラベル名を配列で定義
    const specData = [
      { label: '発売日', value: phone.releaseDate ? new Date(phone.releaseDate).toLocaleDateString() : '不明' },
      { label: '容量 (ROM)', value: phone.specs.rom },
      { label: 'RAM', value: phone.specs.ram },
      { label: 'サイズ(高さ×幅×厚さ)', value: phone.size || '不明' },
      { label: 'ディスプレイ', value: phone.display || '不明' },
      { label: '重量', value: phone.weight || '不明' },
      { label: 'CPU', value: phone.specs.cpu },
      { label: 'GPU', value: phone.specs.gpu },
      { label: 'バッテリー', value: phone.battery || '不明' },
      { label: 'SDカード', value: phone.sd_card || '不明' },
      { label: 'JAC', value: phone.jac || '不明' },
    ];

    specData.forEach(spec => {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-gray-50 transition"; // 行にマウスを乗せると少し色が変わる
      tr.innerHTML = `
        <th class="px-4 py-3 bg-gray-100 font-medium text-gray-600 w-1/3">${spec.label}</th>
        <td class="px-4 py-3 text-gray-800">${spec.value}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// --- ドロップダウンメニューのアニメーション制御 ---
const searchBtn = document.getElementById('search-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

// 1. 「商品を探す」ボタンのクリック処理
searchBtn.addEventListener('click', (event) => {
  event.stopPropagation(); // windowへの報告をストップ

  if (dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.remove('max-h-0', 'opacity-0');
    dropdownMenu.classList.add('max-h-[500px]', 'opacity-100');
  } else {
    dropdownMenu.classList.add('max-h-0', 'opacity-0');
    dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  }
});

// 🌟 2. 修正の要：メニュー「内部」でのクリックもwindowに報告しない（せき止める）
dropdownMenu.addEventListener('click', (event) => {
  event.stopPropagation();
});

// 3. 外側クリックで閉じる処理
window.addEventListener('click', () => {
  // ボタンとメニュー内部のクリックは上でせき止められているので、
  // ここが動くのは確実に「何もない空白の場所」をクリックした時だけになります
  if (!dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.add('max-h-0', 'opacity-0');
    dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  }
});

// アプリ起動
initApp();