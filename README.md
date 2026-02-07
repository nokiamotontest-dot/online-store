# 🏪 小商品商城 - 獨立電商網站

一個完整的電商網站系統，包含前端頁面和後台管理功能。

## ✨ 功能清單

### 🛒 前臺功能
- [x] 首頁 Banner 展示
- [x] 熱門商品推薦
- [x] 商品分類瀏覽
- [x] 商品搜尋
- [x] 商品排序與篩選
- [x] 商品詳情頁
- [x] 購物車
- [x] 用戶註冊/登入
- [x] 訂單歷史
- [x] 結帳系統

### ⚙️ 後台管理
- [x] 統計數據看板
- [x] 商品管理（新增/編輯/刪除）
- [x] 訂單管理（查看/更新狀態）
- [x] 用戶管理
- [x] 數據匯出

### 💾 數據儲存
- [x] LocalStorage 本地儲存
- [x] 數據匯出備份

## 📁 文件結構

```
online-store/
├── index.html              # 首頁
├── products.html          # 商品列表
├── product.html           # 商品詳情
├── cart.html              # 購物車
├── checkout.html          # 結帳頁面
├── account.html           # 用戶帳戶
├── admin.html            # 後台管理
├── admin-product-form.html # 商品編輯表單
├── order-success.html     # 訂單成功頁面
├── order-detail.html      # 訂單詳情頁面
├── css/
│   └── style.css         # 樣式表
├── js/
│   ├── app.js           # 核心功能
│   ├── home.js          # 首頁腳本
│   ├── products.js      # 商品列表腳本
│   └── product-detail.js # 商品詳情腳本
└── images/              # 圖片資料夾
```

## 🚀 快速開始

### 方法一：使用 Python（推薦）

```bash
cd online-store
python3 -m http.server 8080
```

然後在瀏覽器打開：
```
http://localhost:8080
```

### 方法二：使用 Node.js

```bash
cd online-store
npx serve .
```

### 方法三：直接打開

直接用瀏覽器打開 `index.html` 文件

## 👤 測試帳戶

| 帳戶類型 | 郵箱 | 密碼 | 權限 |
|---------|------|------|------|
| 管理員 | admin@shop.com | admin123 | 後台管理 |
| 用戶 | test@shop.com | test123 | 一般購物 |

## 💳 付款方式

目前支援：
- 🏦 銀行轉帳
- 💵 貨到付款
- ⏳ 稍後付款

付款功能可稍後添加 Stripe、PayPal 等線上付款。

## 🛠️ 自訂開發

### 添加新商品

1. 登入管理員帳戶
2. 前往後台
3. 點擊「添加新商品」
4. 填寫商品資料

### 修改樣式

編輯 `css/style.css` 文件

### 添加新功能

在 `js/app.js` 中添加新函數

## 📱 響應式設計

網站已優化支援：
- 💻 桌面電腦
- 📱 平板電腦
- 📱 手機

## 🔒 安全注意

- 此版本使用 LocalStorage 儲存數據
- 不適合生產環境使用
- 建議使用真正的數據庫後端
- 密碼應加密儲存

## 📝 License

MIT License

---

## 🔧 未來擴展建議

1. **後端整合**
   - Node.js / Express
   - MongoDB / PostgreSQL
   - 用戶認證 (JWT)

2. **線上付款**
   - Stripe
   - PayPal
   - 支付寶

3. **物流整合**
   - 物流追蹤
   - 快遞 API

4. **Email 通知**
   - 訂單確認
   - 發貨通知

5. **Admin App**
   - 管理員手機 App
   - 訂單推送通知

---

Made with ❤️ for small business owners
