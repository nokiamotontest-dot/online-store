// ========== 首頁專用腳本 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 載入熱門商品
    loadFeaturedProducts();
    
    // 初始化演示帳戶
    initDemoAccount();
});

// 載入熱門商品
function loadFeaturedProducts() {
    const featured = DB.products.filter(p => p.featured);
    renderProducts(featured, 'featured-grid');
}

// 初始化演示帳戶
function initDemoAccount() {
    // 創建管理員帳戶（如果不存在）
    if (!DB.users.find(u => u.email === 'admin@shop.com')) {
        DB.register({
            name: '管理員',
            email: 'admin@shop.com',
            password: 'admin123',
            phone: '1234-5678',
            role: 'admin'
        });
        console.log('管理員帳戶已創建: admin@shop.com / admin123');
    }
    
    // 創建測試用戶
    if (!DB.users.find(u => u.email === 'test@shop.com')) {
        DB.register({
            name: '測試用戶',
            email: 'test@shop.com',
            password: 'test123'
        });
        console.log('測試帳戶已創建: test@shop.com / test123');
    }
}

// 頁面特定函數
function showCategory(category) {
    window.location.href = `products.html?category=${encodeURIComponent(category)}`;
}
