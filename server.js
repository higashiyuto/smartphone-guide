// server.js
require('dotenv').config(); // これを追加して環境変数を読み込むようにします
const express = require('express');
const mongoose = require('mongoose');
const Smartphone = require('./models/Smartphone'); // 先ほど作ったモデルを読み込み

const app = express();
const PORT = 3000;

// publicフォルダの静的配信
app.use(express.static('public'));
// POSTリクエストなどでJSONを受け取れるようにする設定
app.use(express.json());

// 1. MongoDBへの接続設定
// ※ローカルの「smartphone_db」というデータベースに接続します
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDBに正常に接続されました。'))
  .catch(err => console.error('MongoDB接続エラー:', err));

// 全てのスマホ一覧を取得するAPI
app.get('/api/smartphones', async (req, res) => {
  try {
    const phones = await Smartphone.find(); // 全件取得
    res.json(phones);
  } catch (error) {
    res.status(500).json({ message: "データ取得に失敗しました" });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});