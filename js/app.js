// ========== 資料庫模擬 ==========
const DB = {
    // 用戶數據
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    
    // 產品數據
    products: JSON.parse(localStorage.getItem('products') || getDefaultProducts()),
    
    // 訂單數據
    orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    
    // 購物車
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    
    // 當前用戶
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),

    // 保存方法
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },
    
    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    },
    
    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    },
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    },
    
    saveCurrentUser() {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    },

    // 更新購物車數量
    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    },

    // 添加產品
    addProduct(product) {
        product.id = Date.now();
        product.createdAt = new Date().toISOString();
        this.products.push(product);
        this.saveProducts();
    },

    // 更新產品
    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            this.saveProducts();
        }
    },

    // 刪除產品
    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
    },

    // 添加訂單
    addOrder(order) {
        order.id = 'ORD-' + Date.now();
        order.createdAt = new Date().toISOString();
        order.status = 'pending';
        this.orders.push(order);
        this.saveOrders();
        return order.id;
    },

    // 用戶註冊
    register(user) {
        if (this.users.find(u => u.email === user.email)) {
            return { success: false, message: '此郵箱已被註冊' };
        }
        user.id = Date.now();
        user.role = 'customer';
        user.createdAt = new Date().toISOString();
        this.users.push(user);
        this.saveUsers();
        return { success: true, message: '註冊成功' };
    },

    // 用戶登入
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            this.saveCurrentUser();
            return { success: true, user };
        }
        return { success: false, message: '郵箱或密碼錯誤' };
    },

    // 用戶登出
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    },

    // 添加到購物車
    addToCart(productId, quantity = 1) {
        const existingItem = this.cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ productId, quantity });
        }
        this.saveCart();
    },

    // 更新購物車數量
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.productId === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.cart = this.cart.filter(item => item.productId !== productId);
            }
            this.saveCart();
        }
    },

    // 清空購物車
    clearCart() {
        this.cart = [];
        this.saveCart();
    }
};

// 海洋星座鎖匙扣系列商品
function getDefaultProducts() {
    return [
        // 🐏 白羊座 + 海馬
        {
            id: 101,
            name: '♈️ 白羊座 × 海馬鎖匙扣',
            category: '海洋星座',
            price: 189,
            originalPrice: 249,
            description: '✨ 活力充沛的白羊座守護神是海馬！公羊的勇氣遇上海洋的智慧，黃金海馬引領你勇敢追夢。優質不鏽鋼材質，精緻拋光處理，寓意「勇氣與希望」。送給白羊座的朋友或自己，都是最佳選擇！',
            image: '🐏',
            featured: true,
            stock: 50,
            createdAt: '2025-01-01T00:00:00.000Z'
        },
        // 🐢 金牛座 + 海龜
        {
            id: 102,
            name: '♉️ 金牛座 × 海龜鎖匙扣',
            category: '海洋星座',
            price: 199,
            originalPrice: 269,
            description: '🐢 穩重踏實的金牛座守護神是海龜！金牛的堅定遇上海洋的從容，代表「長壽與財富」。採用優質鋅合金材質，仿古銅色澤，寓意「穩重與富足」。金牛座的幸運物，經典永恆！',
            image: '🐢',
            featured: true,
            stock: 45,
            createdAt: '2025-01-02T00:00:00.000Z'
        },
        // 🐬 雙子座 + 海豚
        {
            id: 103,
            name: '♊️ 雙子座 × 海豚鎖匙扣',
            category: '海洋星座',
            price: 179,
            originalPrice: 229,
            description: '🐬 聰明伶俐的雙子座守護神是海豚！雙子的靈活遇上海洋的友善，代表「智慧與自由」。仿真海豚造型，活潑生動。不鏽鋼材質搭配漸層色彩，寓意「溝通與快樂」！',
            image: '🐬',
            featured: true,
            stock: 60,
            createdAt: '2025-01-03T00:00:00.000Z'
        },
        // 🦀 巨蟹座 + 螃蟹
        {
            id: 104,
            name: '♋️ 巨蟹座 × 螃蟹鎖匙扣',
            category: '海洋星座',
            price: 189,
            originalPrice: 249,
            description: '🦀 溫暖顧家的巨蟹座守護神是螃蟹！巨蟹的溫柔遇上海洋的包容，代表「家庭與保護」。仿真螃蟹造型，雙螯可動。優質環保材質，寓意「溫暖與安全」。送給最珍視的人！',
            image: '🦀',
            featured: true,
            stock: 55,
            createdAt: '2025-01-04T00:00:00.000Z'
        },
        // 🦁 獅子座 + 獅子魚
        {
            id: 105,
            name: '♌️ 獅子座 × 獅子魚鎖匙扣',
            category: '海洋星座',
            price: 219,
            originalPrice: 289,
            description: '🦁 自信霸氣的獅子座守護神是獅子魚！獅子的尊貴遇上海洋的神秘，代表「王者風範」。獅子魚造型華麗，色彩斑斕。電鍍工藝，璀璨奪目，寓意「尊貴與自信」！',
            image: '🦁',
            featured: true,
            stock: 40,
            createdAt: '2025-01-05T00:00:00.000Z'
        },
        // 🌟 處女座 + 海星
        {
            id: 106,
            name: '♍️ 處女座 × 海星鎖匙扣',
            category: '海洋星座',
            price: 169,
            originalPrice: 219,
            description: '🌟 追求完美的處女座守護神是海星！處女的純潔遇上海洋的璀璨，代表「完美與純潔」。五角海星造型，精緻小巧。珍珠鍍層，寓意「純潔與完美」。送給追求完美的她！',
            image: '⭐',
            featured: true,
            stock: 65,
            createdAt: '2025-01-06T00:00:00.000Z'
        },
        // ⚖️ 天秤座 + 熱帶魚
        {
            id: 107,
            name: '♎️ 天秤座 × 熱帶魚鎖匙扣',
            category: '海洋星座',
            price: 189,
            originalPrice: 249,
            description: '🐠 追求平衡的天秤座守護神是熱帶魚！天秤的和諧遇上海洋的繽紛，代表「和諧與美麗」。多彩熱帶魚造型，栩栩如生。透明琺瑯工藝，寓意「平衡與美感」！',
            image: '🐠',
            featured: true,
            stock: 50,
            createdAt: '2025-01-07T00:00:00.000Z'
        },
        // 🦂 天蠍座 + 魔鬼魚
        {
            id: 108,
            name: '♏️ 天蠍座 × 魔鬼魚鎖匙扣',
            category: '海洋星座',
            price: 229,
            originalPrice: 299,
            description: '🦈 深邃神秘的天蠍座守護神是魔鬼魚！天蠍的執著遇上海洋的深沉，代表「力量與神秘」。魔鬼魚造型優雅神秘。啞光黑金屬質感，寓意「神秘與力量」！',
            image: '🦂',
            featured: true,
            stock: 35,
            createdAt: '2025-01-08T00:00:00.000Z'
        },
        // 🏹 射手座 + 箭魚
        {
            id: 109,
            name: '♐️ 射手座 × 箭魚鎖匙扣',
            category: '海洋星座',
            price: 199,
            originalPrice: 269,
            description: '🐟 自由奔放的射手座守護神是箭魚！射手的冒險遇上海洋的廣闘，代表「自由與探索」。箭魚造型流線型設計，象徵速度與方向。不鏽鋼電鍍工藝，寓意「自由與冒險」！',
            image: '🏹',
            featured: true,
            stock: 45,
            createdAt: '2025-01-09T00:00:00.000Z'
        },
        // 🐐 摩羯座 + 公羊魚
        {
            id: 110,
            name: '♑️ 摩羯座 × 公羊魚鎖匙扣',
            category: '海洋星座',
            price: 209,
            originalPrice: 279,
            description: '🧜 腳踏實地的摩羯座守護神是公羊魚！摩羯的毅力遇上海洋的深邃，代表「堅定與成功」。公羊角造型融入海洋元素，創意獨特。復古黃銅質感，寓意「毅力與成就」！',
            image: '🐐',
            featured: true,
            stock: 40,
            createdAt: '2025-01-10T00:00:00.000Z'
        },
        // 💧 水瓶座 + 水母
        {
            id: 111,
            name: '♒️ 水瓶座 × 水母鎖匙扣',
            category: '海洋星座',
            price: 189,
            originalPrice: 249,
            description: '🪼 創新獨特的水瓶座守護神是水母！水瓶的創意遇上海洋的晶瑩，代表「創新與獨特」。透明水母造型，夢幻唯美。半透明矽膠材質，寓意「獨特與創新」！',
            image: '💧',
            featured: true,
            stock: 55,
            createdAt: '2025-01-11T00:00:00.000Z'
        },
        // 🐟 雙魚座 + 雙魚
        {
            id: 112,
            name: '♓️ 雙魚座 × 雙魚鎖匙扣',
            category: '海洋星座',
            price: 229,
            originalPrice: 299,
            description: '🐟 浪漫敏感的雙魚座守護神是雙魚！雙魚的夢幻遇上海洋的浪漫，代表「夢幻與愛情」。兩條小魚纏繞造型，寓意愛情與友誼。粉彩鍍層，夢幻優雅，寓意「浪漫與直覺」！',
            image: '🐟',
            featured: true,
            stock: 50,
            createdAt: '2025-01-12T00:00:00.000Z'
        }
    ];
}

// ========== 工具函數 ==========
function formatPrice(price) {
    return '$' + price.toLocaleString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getProduct(productId) {
    return DB.products.find(p => p.id === productId);
}

function getCartItems() {
    return DB.cart.map(item => {
        const product = getProduct(item.productId);
        return {
            ...item,
            product
        };
    }).filter(item => item.product);
}

function calculateTotal() {
    const items = getCartItems();
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

// ========== 頁面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 更新購物車數量
    DB.updateCartCount();
    
    // 檢查登入狀態
    checkAuth();
});

// 檢查登入狀態
function checkAuth() {
    const adminLink = document.getElementById('admin-link');
    const logoutBtn = document.getElementById('logout-btn');
    const accountLink = document.querySelector('a[href="account.html"]');
    
    if (DB.currentUser) {
        if (adminLink) adminLink.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (accountLink) accountLink.textContent = '我的帳戶';
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                DB.logout();
                showNotification('已登出');
                window.location.reload();
            });
        }
    }
}

// ========== 產品相關 ==========
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">
                    ${formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="product-old-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">加入購物車</button>
                    <button class="btn btn-outline" onclick="viewProduct(${product.id})">查看詳情</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    DB.addToCart(productId, 1);
    showNotification('已添加到購物車');
}

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function showCategory(category) {
    window.location.href = `products.html?category=${encodeURIComponent(category)}`;
}

function searchProducts(query) {
    const searchResults = DB.products.filter(product => 
        product.name.includes(query) || 
        product.description.includes(query) ||
        product.category.includes(query)
    );
    return searchResults;
}

// ========== 購物車相關 ==========
function renderCart() {
    const items = getCartItems();
    const container = document.getElementById('cart-items');
    const emptyState = document.getElementById('empty-cart');
    const summary = document.getElementById('cart-summary');
    
    if (!container) return;
    
    if (items.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (summary) summary.style.display = 'none';
        container.innerHTML = '';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (summary) summary.style.display = 'block';
    
    container.innerHTML = items.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.product.image}</div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.product.name}</h3>
                <p class="cart-item-price">${formatPrice(item.product.price)}</p>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.productId})" style="margin-left: 1rem;">刪除</button>
                </div>
                <p>小計: ${formatPrice(item.product.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');
    
    // 更新總計
    const total = calculateTotal();
    const shipping = total >= 500 ? 0 : 60;
    const finalTotal = total + shipping;
    
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping');
    const totalEl = document.getElementById('cart-total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(total);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? '免費' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(finalTotal);
}

function updateQuantity(productId, quantity) {
    DB.updateCartQuantity(productId, quantity);
    renderCart();
}

function removeFromCart(productId) {
    DB.updateCartQuantity(productId, 0);
    renderCart();
    showNotification('已從購物車移除');
}

function checkout() {
    const items = getCartItems();
    if (items.length === 0) {
        showNotification('購物車是空的', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// ========== 訂單相關 ==========
function renderOrders() {
    if (!DB.currentUser) return [];
    
    return DB.orders
        .filter(order => order.userId === DB.currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function renderAdminOrders() {
    return DB.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// ========== 用戶相關 ==========
function handleRegister(formData) {
    const result = DB.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || '',
        address: formData.address || ''
    });
    
    if (result.success) {
        showNotification('註冊成功！請登入');
        window.location.href = 'account.html?mode=login';
    } else {
        showNotification(result.message, 'error');
    }
}

function handleLogin(formData) {
    const result = DB.login(formData.email, formData.password);
    
    if (result.success) {
        showNotification('登入成功！');
        const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
        window.location.href = redirect;
    } else {
        showNotification(result.message, 'error');
    }
}

// ========== 管理相關 ==========
function isAdmin() {
    return DB.currentUser && DB.currentUser.role === 'admin';
}

function checkAdmin() {
    if (!isAdmin()) {
        window.location.href = 'index.html';
    }
}

function renderAdminStats() {
    const stats = {
        totalProducts: DB.products.length,
        totalOrders: DB.orders.length,
        totalUsers: DB.users.length,
        totalRevenue: DB.orders.reduce((sum, order) => sum + order.finalTotal, 0)
    };
    
    document.getElementById('total-products').textContent = stats.totalProducts;
    document.getElementById('total-orders').textContent = stats.totalOrders;
    document.getElementById('total-users').textContent = stats.totalUsers;
    document.getElementById('total-revenue').textContent = formatPrice(stats.totalRevenue);
}

function renderAdminProducts() {
    const tbody = document.getElementById('admin-products-body');
    if (!tbody) return;
    
    tbody.innerHTML = DB.products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.image} ${product.name}</td>
            <td>${product.category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-primary" onclick="editProduct(${product.id})">編輯</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">刪除</button>
            </td>
        </tr>
    `).join('');
}

function editProduct(productId) {
    window.location.href = `admin-product-form.html?id=${productId}`;
}

function deleteProduct(productId) {
    if (confirm('確定要刪除此商品嗎？')) {
        DB.deleteProduct(productId);
        renderAdminProducts();
        renderAdminStats();
        showNotification('商品已刪除');
    }
}

function renderAdminOrders() {
    const tbody = document.getElementById('admin-orders-body');
    if (!tbody) return;
    
    tbody.innerHTML = DB.orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.items.map(i => i.productName).join(', ')}</td>
            <td>${formatPrice(order.finalTotal)}</td>
            <td><span class="order-status status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>
                <select onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>待處理</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>處理中</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>已發貨</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>已送達</option>
                </select>
            </td>
            <td>${formatDate(order.createdAt)}</td>
        </tr>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        pending: '待處理',
        processing: '處理中',
        shipped: '已發貨',
        delivered: '已送達'
    };
    return statusMap[status] || status;
}

function updateOrderStatus(orderId, status) {
    const order = DB.orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        DB.saveOrders();
        renderAdminOrders();
        showNotification('訂單狀態已更新');
    }
}

// ========== 導出功能 ==========
function exportData() {
    const data = {
        products: DB.products,
        orders: DB.orders,
        users: DB.users,
        exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shop-backup-${formatDate(new Date())}.json`;
    a.click();
}
