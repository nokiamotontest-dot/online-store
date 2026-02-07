# 🎯 GitHub Token 獲取指南

## 步驟 1：前往 GitHub

打開瀏覽器，訪問：
```
https://github.com/settings/tokens
```

## 步驟 2：生成新 Token

1. 點擊 **「Generate new token (classic)」**
2. **Note**: 輸入 `deploy-token`
3. **Expiration**: 選擇 `No expiration`（永久）
4. 勾選以下權限：
   - ✅ `repo` - 完全控制私有倉庫
   - ✅ `workflow` - 更新 GitHub Action

## 步驟 3：複製 Token

點擊 **「Generate token」**後，複製顯示的 Token（類似：`ghp_xxxxxxxxxxxxxxxxxxxx`）

## 步驟 4：執行部署

回到終端機，執行：

```bash
cd /home/motonai/.openclaw/workspace/online-store

# 部署（將 YOUR_TOKEN 替換為你的 Token）
./deploy.sh YOUR_TOKEN_HERE
```

## 部署後

網站將在以下網址（2-5分鐘後生效）：
```
https://你的用戶名.github.io/online-store/
```

---

## 🔒 安全提醒

- **不要分享 Token** 給任何人
- **不要提交 Token** 到 GitHub
- 如果 Token 洩漏，請前往 https://github.com/settings/tokens 撤銷

---

## 🆘 常見問題

**Q: Token 權限不夠？**
A: 確保勾選了 `repo` 權限

**Q: 部署後網站沒出現？**
A: 等待 2-5 分鐘，然後檢查：
  - GitHub 倉庫 → Settings → Pages
  - 確認 Source 是 "main" branch

**Q: 想刪除重新部署？**
A: 執行 `gh repo delete online-store --yes`
