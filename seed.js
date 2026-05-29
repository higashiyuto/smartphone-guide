// seed.js
require('dotenv').config(); // これを追加して環境変数を読み込むようにします
const mongoose = require('mongoose');
const Smartphone = require('./models/Smartphone');

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDBに接続しました。データを再投入します...');

    // 一旦既存のデータをクリア
    await Smartphone.deleteMany({});

    // 複数のスマホデータを配列で用意（スペック表対応版）
    const samplePhones = [
      {
        name: "iPhone 17",
        brand: "Apple",
        releaseDate: "2025-09-19",
        size: "149mm x 71.5mm x 7.95mm",
        display: "6.3インチ",
        weight: "約177g",
        battery: "3700mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "A19チップ",
          gpu: "5コア Apple GPU",
          ram: "8GB",
          rom: "256GB / 512GB"
        },
        variants: [
          { colorName: "ブルー", colorHex: "#B4C5D6", imageUrl: "/images/iphone17-blue.png" },
          { colorName: "セージ", colorHex: "#A1B5A8", imageUrl: "/images/iphone17-sage.png" },
          { colorName: "ホワイト", colorHex: "#FBFBFD", imageUrl: "/images/iphone17-white.png" },
          { colorName: "ブラック", colorHex: "#2F3033", imageUrl: "/images/iphone17-black.png" }
        ]
      },
      {
        name: "iPhone 17e",
        brand: "Apple",
        releaseDate: "2026-03-11",
        size: "146mm x 71.5mm x 7.8mm",
        display: "6.06インチ",
        weight: "約169g",
        battery: "約4000mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "A19チップ",
          gpu: "4コア Apple GPU",
          ram: "8GB",
          rom: "256GB / 512GB"
        },
        variants: [
          { colorName: "ソフトピンク", colorHex: "#F7E1E3", imageUrl: "/images/iphone17e-pink.png" },
          { colorName: "ホワイト", colorHex: "#FBFBFD", imageUrl: "/images/iphone17e-white.png" },
          { colorName: "ブラック", colorHex: "#2F3033", imageUrl: "/images/iphone17e-black.png" }
        ]
      },
      {
        name: "iPhone 17 Pro",
        brand: "Apple",
        releaseDate: "2025-09-19",
        size: "150mm x 72mm x 8.75mm",
        display: "6.3インチ",
        weight: "約206g",
        battery: "約3500mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "A19 Proチップ",
          gpu: "6コア Apple GPU",
          ram: "8GB(標準)/12GB(高負荷時対応)",
          rom: "256GB / 512GB / 1TB"
        },
        variants: [
          { colorName: "ディープブルー", colorHex: "#2A364F", imageUrl: "/images/iphone17-pro-blue.png" },
          { colorName: "オレンジ", colorHex: "#C66D52", imageUrl: "/images/iphone17-pro-orange.png" },
          { colorName: "シルバー", colorHex: "#E2E4E7", imageUrl: "/images/iphone17-pro-silver.png" }
        ]
      },
      {
        name: "iPhone 17 ProMax",
        brand: "Apple",
        releaseDate: "2025-09-19",
        size: "163mm x 78mm x 8.75mm",
        display: "6.9インチ",
        weight: "約233g",
        battery: "約5000mAh(非公式)",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "A19 Proチップ",
          gpu: "6コア Apple GPU",
          ram: "12GB",
          rom: "256GB / 512GB / 1TB"
        },
        variants: [
          { colorName: "ディープブルー", colorHex: "#2A364F", imageUrl: "/images/iphone17-promax-blue.png" },
          { colorName: "オレンジ", colorHex: "#C66D52", imageUrl: "/images/iphone17-promax-orange.png" },
          { colorName: "シルバー", colorHex: "#E2E4E7", imageUrl: "/images/iphone17-promax-silver.png" }
        ]
      },
      {
        name: "iPhone Air",
        brand: "Apple",
        releaseDate: "2025-09-19",
        size: "156mm x 74mm x 5.6mm",
        display: "6.5インチ",
        weight: "約165g",
        battery: "ビデオ再生:最大27時間",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "A19 Proチップ",
          gpu: "5コア Apple GPU",
          ram: "12GB",
          rom: "256GB / 512GB / 1TB"
        },
        variants: [
          { colorName: "スカイブルー", colorHex: "#9BB8D0", imageUrl: "/images/iphone-air-blue.png" },
          { colorName: "ライトゴールド", colorHex: "#EADCD1", imageUrl: "/images/iphone-air-gold.png" },
          { colorName: "クラウドホワイト", colorHex: "#F5F5F7", imageUrl: "/images/iphone-air-white.png" },
          { colorName: "スペースブラック", colorHex: "#272729", imageUrl: "/images/iphone-air-black.png" }
        ]
      },
      {
        name: "GooglePixel 10a",
        brand: "Google",
        releaseDate: "2026-04-14",
        size: "154mm x 73mm x 9.0mm",
        display: "6.3インチ",
        weight: "約183g",
        battery: "5100mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "Google Tensor G4",
          gpu: "Mali-G715 MC7",
          ram: "8GB",
          rom: "128GB / 256GB"
        },
        variants: [
          { colorName: "ラベンダー", colorHex: "#D8CCED", imageUrl: "/images/pixel10a-lavender.png" },
          { colorName: "オブシディアン", colorHex: "#202124", imageUrl: "/images/pixel10a-black.png" },
          { colorName: "フォグ", colorHex: "#E1E3E1", imageUrl: "/images/pixel10a-fog.png" },
          { colorName: "イサイブルー", colorHex: "#3B70E5", imageUrl: "/images/pixel10a-blue.png" },
        ]
      },
      {
        name: "GooglePixel 10",
        brand: "Google",
        releaseDate: "2025-08-28",
        size: "152mm x 72mm x 8.6mm",
        display: "6.3インチ",
        weight: "約204g",
        battery: "4970mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "Google Tensor G5",
          gpu: "PowerVR DXT-48-1536",
          ram: "12GB",
          rom: "128GB / 256GB"
        },
        variants: [
          { colorName: "インディゴ", colorHex: "#3B70E5", imageUrl: "/images/pixel10-blue.png" },
          { colorName: "オブシディアン", colorHex: "#202124", imageUrl: "/images/pixel10-black.png" },
          { colorName: "フロスト", colorHex: "#E6EBEF", imageUrl: "/images/pixel10-white.png" },
          { colorName: "レモングラス", colorHex: "#DCE3C8", imageUrl: "/images/pixel10-yellow.png" },
        ]
      },
      {
        name: "GooglePixel 10Pro",
        brand: "Google",
        releaseDate: "2025-08-28",
        size: "152mm x 72mm x 8.6mm",
        display: "6.3インチ",
        weight: "約207g",
        battery: "4870mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "Google Tensor 5",
          gpu: "PowerVR DXT-48-1536",
          ram: "16GB",
          rom: "256GB / 512GB"
        },
        variants: [
          { colorName: "ムーンストーン", colorHex: "#4A5D82", imageUrl: "/images/pixel10-pro-gray.png" },
          { colorName: "オブシディアン", colorHex: "#202124", imageUrl: "/images/pixel10-pro-black.png" },
          { colorName: "ポースレイン", colorHex: "#E6EBEF", imageUrl: "/images/pixel10-pro-white.png" },
        ]
      },
      {
        name: "Galaxy S26",
        brand: "Samsung",
        releaseDate: "2026-03-12",
        size: "150mm x 72mm x 7.2mm",
        display: "6.3インチ",
        weight: "約167g",
        battery: "4300mAh",
        sd_card: "-",
        jac: "-",
        specs: {
          cpu: "Snapdragon® 8 Elite Gen 5 for Galaxy",
          gpu: "",
          ram: "12GB",
          rom: "256GB / 512GB"
        },
        variants: [
          { colorName: "コバルトバイオレット", colorHex: "#4A5D82", imageUrl: "/images/galaxy-s26-violet.png" },
          { colorName: "ブラック", colorHex: "#2b2b2b", imageUrl: "/images/galaxy-s26-black.png" },
          { colorName: "ホワイト", colorHex: "#E6EBEF", imageUrl: "/images/galaxy-s26-white.png" }
        ]
      },
      {
        name: "Galaxy A25",
        brand: "Samsung",
        releaseDate: "2025-02-07",
        size: "168mm x 78mm x 8.5mm",
        display: "6.7インチ",
        weight: "約210g",
        battery: "5000mAh",
        sd_card: "microSDXC(最大1.5TB)",
        jac: "-",
        specs: {
          cpu: "Dimensity 6100+",
          gpu: "",
          ram: "4GB",
          rom: "64GB"
        },
        variants: [
          { colorName: "ライトブルー", colorHex: "#B1D8F5", imageUrl: "/images/galaxy-a25-blue.png" },
          { colorName: "ブラック", colorHex: "#2b2b2b", imageUrl: "/images/galaxy-a25-black.png" }
        ]
      },
      {
        name: "arrows We2",
        brand: "FCNT",
        releaseDate: "2024-08-16",
        size: "155mm x 73mm x 8.9mm",
        display: "6.1インチ",
        weight: "約179g",
        battery: "4500mAh",
        sd_card: "microSDXC(最大1TB)",
        jac: "⚪︎",
        specs: {
          cpu: "Dimensity 7025",
          gpu: "",
          ram: "4GB",
          rom: "64GB"
        },
        variants: [
          { colorName: "ライトブルー", colorHex: "#A7C5D3", imageUrl: "/images/arrows-we2-blue.png" },
          { colorName: "ネイビーグリーン", colorHex: "#3E524D", imageUrl: "/images/arrows-we2-green.png" },
          { colorName: "ライトオレンジ", colorHex: "#E5C3A5", imageUrl: "/images/arrows-we2-orange.png" }
        ]
      },
      {
        name: "AQUOS sense10",
        brand: "SHARP",
        releaseDate: "2025-11-13",
        size: "149mm x 73mm x 8.9mm",
        display: "6.1インチ",
        weight: "約166g",
        battery: "5000mAh",
        sd_card: "microSDXC(最大2TB)",
        jac: "-",
        specs: {
          cpu: "Snapdragon® 7s Gen 3 Mobile Platform",
          gpu: "",
          ram: "6GB",
          rom: "128GB"
        },
        variants: [
          { colorName: "デニムネイビー", colorHex: "#2A364F", imageUrl: "/images/sense10-navy.png" },
          { colorName: "フルブラック", colorHex: "#2b2b2b", imageUrl: "/images/sense10-black.png" },
          { colorName: "ライトシルバー", colorHex: "#D1D3D4", imageUrl: "/images/sense10-silver.png" }
        ]
      },
      {
        name: "AQUOS wish5",
        brand: "SHARP",
        releaseDate: "2025-06-26",
        size: "166mm x 76mm x 8.8mm",
        display: "6.6インチ",
        weight: "約187g",
        battery: "5000mAh",
        sd_card: "microSDXC(最大2TB)",
        jac: "⚪︎",
        specs: {
          cpu: "Dimensity 6300",
          gpu: "",
          ram: "4GB",
          rom: "64GB"
        },
        variants: [
          { colorName: "ミソラ", colorHex: "#A7C5D3", imageUrl: "/images/wish5-blue.png" },
          { colorName: "スミ", colorHex: "#2b2b2b", imageUrl: "/images/wish5-black.png" },
          { colorName: "ユキ", colorHex: "#E6EBEF", imageUrl: "/images/wish5-white.png" }
        ]
      },
      {
        name: "Xperia10 VII",
        brand: "Sony",
        releaseDate: "2025-10-09",
        size: "153mm x 72mm x 8.3mm",
        display: "6.1インチ",
        weight: "約168g",
        battery: "5000mAh",
        sd_card: "microSDXC(最大2TB)",
        jac: "⚪︎",
        specs: {
          cpu: "Snapdragon 6 Gen3",
          gpu: "",
          ram: "8GB",
          rom: "128GB"
        },
        variants: [
          { colorName: "チャコールブラック", colorHex: "#2b2b2b", imageUrl: "/images/xperia10-seven-black.png" },
          { colorName: "ホワイト", colorHex: "#E6EBEF", imageUrl: "/images/xperia10-seven-white.png" },
          { colorName: "ターコイズ", colorHex: "#40E0D0", imageUrl: "/images/xperia10-seven-green.png" }
        ]
      },
      {
        name: "Xperia1 VIII",
        brand: "Sony",
        releaseDate: "2026-06-11",
        size: "162mm x 74mm x 8.3mm",
        display: "6.5インチ",
        weight: "約200g",
        battery: "5000mAh",
        sd_card: "microSDXC(最大2TB)",
        jac: "⚪︎",
        specs: {
          cpu: "Snapdragon 8 Elite Gen 5",
          gpu: "",
          ram: "12GB",
          rom: "256GB"
        },
        variants: [
          { colorName: "グラファイトブラック", colorHex: "#262626", imageUrl: "/images/xperia1-eight-black.png" },
          { colorName: "アイオライトシルバー", colorHex: "#D9D9D9", imageUrl: "/images/xperia1-eight-silver.png" },
          { colorName: "ガーネットレッド", colorHex: "#7B241C", imageUrl: "/images/xperia1-eight-red.png" }
        ]
      }
    ];

    // データをデータベースに一括登録
    await Smartphone.insertMany(samplePhones);
    
    // 成功メッセージを出して終了
    console.log(`${samplePhones.length}件のテストデータを投入しました！`);
    process.exit();
  })
  .catch(err => {
    console.error('エラーが発生しました:', err);
    process.exit(1);
  });