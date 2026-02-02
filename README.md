# Kibidango Landing Page

Kibidangoのクラウドファンディングエージェンシーサービスを紹介するランディングページです。

## 概要

このLPは、日本のクリエイター向け、およびKickstarterとエコシステムパートナー向けに、Kibidangoのサービスと実績を訴求するために作成されました。

## 特徴

- **日本語・英語の2言語対応**: 別ページとして実装し、右上の言語切り替えで簡単に切り替え可能
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップのすべてのデバイスに対応
- **アニメーション効果**: スクロールに応じた要素のフェードイン効果
- **Kibidangoブランドカラー**: 赤（#ff5c5c）と黄色（#ffcc33）を効果的に使用
- **SEO対応**: 適切なメタタグとセマンティックHTML

## ファイル構成

```
kibidango-lp/
├── index.html          # 日本語版LP
├── index-en.html       # 英語版LP
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── kibidango_logo.gif  # Kibidangoロゴ
├── lp_design_hero.png  # Heroセクション画像
├── lp_design_about.png # Aboutセクション画像
├── lp_design_success.png # Success Storiesセクション画像
├── lp_design_service.png # Serviceセクション画像
├── lp_design_partner.png # Partnerセクション画像
└── README.md           # このファイル
```

## セクション構成

### 1. Header
- Kibidangoロゴ
- ナビゲーションメニュー
- 言語切り替え（JP / EN）

### 2. Hero Section
- キャッチコピー: 「日本の優れたアイデアを、世界へ。」
- CTAボタン: 「プロジェクトを相談する」

### 3. About Section
- Kibidangoの紹介
- 実績の強調:
  - コンサルティング実績: 25件
  - 総支援額: 18億円（英語版: $15M+）

### 4. Success Stories Section
- 成功事例の紹介:
  - ViXion01（4.2億円）
  - X68000 Z（3.5億円）
  - g.eN（2,400万円）

### 5. Service Section
- 提供サービスの説明:
  - 戦略立案
  - クリエイティブ制作
  - マーケティング & PR
  - コミュニティマネジメント
  - グローバル展開サポート

### 6. Partner Section
- Kickstarterエコシステムとのパートナーシップの訴求
- 日本市場への架け橋としての役割

### 7. Contact Section
- CTAボタン:
  - 「プロジェクトを相談する」
  - 「メールでお問い合わせ」

### 8. Footer
- Kibidangoロゴ
- リンク集
- コピーライト

## 使用方法

### ローカルで確認する場合

1. すべてのファイルを同じディレクトリに配置
2. ブラウザで `index.html`（日本語版）または `index-en.html`（英語版）を開く

### Webサーバーで公開する場合

1. すべてのファイルをWebサーバーのドキュメントルートにアップロード
2. `index.html` をデフォルトページとして設定

## カスタマイズ

### カラーの変更

`styles.css` の以下の部分を編集してください:

```css
/* メインカラー（赤） */
#ff5c5c

/* アクセントカラー（黄色） */
#ffcc33
```

### コンテンツの変更

各HTMLファイルを直接編集してください。主要なセクションは `id` 属性で識別されています。

### 画像の差し替え

プロジェクト画像を差し替える場合は、同じファイル名で上書きするか、HTMLファイル内の `src` 属性を変更してください。

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- モバイルブラウザ（iOS Safari、Chrome for Android）

## ライセンス

© 2026 Kibidango. All rights reserved.

## お問い合わせ

ご質問やご要望がございましたら、以下までお問い合わせください:

- Email: info@kibidango.com
- Website: https://kibidango.com
