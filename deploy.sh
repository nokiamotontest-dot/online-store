#!/bin/bash
# Deploy Online Store to GitHub Pages
# Usage: ./deploy.sh YOUR_GITHUB_TOKEN

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 部署網店到 GitHub Pages${NC}"
echo ""

# Check for token
if [ -z "$1" ]; then
    echo -e "${YELLOW}📝 請提供 GitHub Token${NC}"
    echo ""
    echo "1. 前往 GitHub: https://github.com/settings/tokens"
    echo "2. 點擊 'Generate new token (classic)'"
    echo "3. 設定名稱: 'deploy-token'"
    echo "4. 勾選: 'repo' 和 'workflow'"
    echo "5. 複製 Token"
    echo ""
    echo "執行指令："
    echo -e "${GREEN}./deploy.sh YOUR_TOKEN${NC}"
    exit 1
fi

TOKEN=$1
REPO_NAME="online-store"
GITHUB_USER=$(gh api user --jq '.login' --header "Authorization: token $TOKEN" 2>/dev/null || echo "")

if [ -z "$GITHUB_USER" ]; then
    echo -e "${RED}❌ Token 無效或已過期${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 已登入: $GITHUB_USER${NC}"
echo ""

# Initialize git if not already
if [ ! -d .git ]; then
    echo "📦 初始化 Git..."
    git init
    git add .
    git commit -m "Initial commit - Online Store"
fi

# Create repository if it doesn't exist
echo "🔗 創建 GitHub 倉庫..."
gh repo create $REPO_NAME --public --description "小商品電商網站" --token $TOKEN 2>/dev/null || echo "倉庫可能已存在"

# Add remote if not exists
if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
fi

# Push to GitHub
echo "📤 推送代碼..."
git branch -M main
git push -u origin main

echo ""
echo -e "${GREEN}✅ 代碼已推送！${NC}"
echo ""

# Enable GitHub Pages
echo "🌐 啟用 GitHub Pages..."
gh api repos/$GITHUB_USER/$REPO_NAME/pages \
    --method POST \
    --header "Authorization: token $TOKEN" \
    --field source='{"branch":"main","path":"/"}' \
    2>/dev/null || echo "Pages 可能已經啟用"

echo ""
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "📱 你的網站將在以下網址（2-5分鐘後生效）："
echo -e "${YELLOW}https://$GITHUB_USER.github.io/$REPO_NAME/${NC}"
echo ""
echo "⏰ 等待幾分鐘後訪問..."
