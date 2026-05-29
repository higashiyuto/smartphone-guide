let allSmartphones = [];

// 用語解説辞書
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

  const appleBtn = createMenuButton('Apple (iPhone等)', 'bg-gray-50 hover:bg-gray-100 border-gray-200');
  appleBtn.addEventListener('click', () => renderPhoneList('Apple', 'Appleのスマートフォン', renderTopMenu));

  const androidBtn = createMenuButton('Android (各種ブランド)', 'bg-green-50 hover:bg-green-100 border-green-200 text-green-900');
  androidBtn.addEventListener('click', renderAndroidBrands);

  content.appendChild(appleBtn);
  content.appendChild(androidBtn);
}

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

// 🌟 辞書表示機能（バグ修正版）
function showGlossary(label, phone) {
  const tbody = document.getElementById('selected-specs');
  tbody.innerHTML = ''; // 一旦クリア

  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = 2; // 🌟 2列分を結合して幅を広げる！
  td.className = "p-6 bg-white";

  td.innerHTML = `
    <h4 class="font-bold text-lg text-blue-600 mb-2">${label} とは？</h4>
    <p class="text-gray-700 leading-relaxed mb-4">${glossaries[label] || '説明がありません。'}</p>
  `;

  // 文字列ではなく、ちゃんとしたボタン要素を作る
  const backBtn = document.createElement('button');
  backBtn.className = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg text-sm transition";
  backBtn.textContent = "← スペック表に戻る";
  backBtn.onclick = () => showDetail(phone); // 安全に元のスマホデータを渡す

  td.appendChild(backBtn);
  tr.appendChild(td);
  tbody.appendChild(tr);
}

function showDetail(phone) {
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.classList.add('max-h-0', 'opacity-0');
  dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  
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
  const specData = [
    { label: '発売日', value: phone.releaseDate ? new Date(phone.releaseDate).toLocaleDateString() : '不明' },
    { label: '容量 (ROM)', value: phone.specs?.rom || '不明' },
    { label: 'RAM', value: phone.specs?.ram || '不明' },
    { label: 'サイズ(高さ×幅×厚さ)', value: phone.size || '不明' },
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
    tr.className = "hover:bg-gray-50 transition";
    
    const labelCell = document.createElement('th');
    labelCell.className = "px-4 py-3 bg-gray-100 font-medium text-gray-600 w-1/3";
    
    // 辞書にある項目ならクリック可能にする
    if (glossaries[spec.label]) {
      labelCell.classList.add('cursor-pointer', 'hover:text-blue-600', 'underline');
      labelCell.onclick = () => showGlossary(spec.label, phone);
    }
    labelCell.textContent = spec.label;

    // 🌟 修正：テキストにして結合するのをやめ、要素として追加
    const valueCell = document.createElement('td');
    valueCell.className = "px-4 py-3 text-gray-800";
    valueCell.textContent = spec.value;

    tr.appendChild(labelCell);
    tr.appendChild(valueCell); // これでイベントは消えません！
    tbody.appendChild(tr);
  });
}

const searchBtn = document.getElementById('search-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
searchBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  if (dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.remove('max-h-0', 'opacity-0');
    dropdownMenu.classList.add('max-h-[500px]', 'opacity-100');
  } else {
    dropdownMenu.classList.add('max-h-0', 'opacity-0');
    dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  }
});
dropdownMenu.addEventListener('click', (event) => event.stopPropagation());
window.addEventListener('click', () => {
  if (!dropdownMenu.classList.contains('max-h-0')) {
    dropdownMenu.classList.add('max-h-0', 'opacity-0');
    dropdownMenu.classList.remove('max-h-[500px]', 'opacity-100');
  }
});

initApp();