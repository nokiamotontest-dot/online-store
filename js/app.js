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

// 默認產品數據
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: '精緻陶瓷杯',
            category: '生活用品',
            price: 299,
            originalPrice: 399,
            description: '手工製作的精美陶瓷杯，適合日常使用或送禮',
            image: '☕',
            featured: true,
            stock: 50,
            createdAt: '2025-01-01T00:00:00.000Z'
        },
        {
            id: 2,
            name: '創意筆記本',
            category: '文具用品',
            price: 159,
            originalPrice: 199,
            description: '100頁高品質紙張，封面採用防水材質',
            image: '📓',
            featured: true,
            stock: 100,
            createdAt: '2025-01-02T00:00:00.000Z'
        },
        {
            id: 3,
            name: '幸運手鍊',
            category: '飾品配件',
            price: 459,
            originalPrice: 599,
            description: '精選天然石編織而成，帶來好運',
            image: '📿',
            featured: true,
            stock: 30,
            createdAt: '2025-01-03T00:00:00.000Z'
        },
        {
            id: 4,
            name: '桌上型小盆栽',
            category: '生活用品',
            price: 359,
            originalPrice: 450,
            description: '迷你多肉植物，適合辦公室或書桌',
            image: '🪴',
            featured: false,
            stock: 40,
            createdAt: '2025-01-04T00:00:00.000Z'
        },
        {
            id: 5,
            name: '創意書籤',
            category: '文具用品',
            price: 99,
            originalPrice: 129,
            description: '金屬書籤，造型獨特',
            image: '🔖',
            featured: false,
            stock: 200,
            createdAt: '2025-01-05T00:00:00.000Z'
        },
        {
            id: 6,
            name: '時尚太陽眼鏡',
            category: '飾品配件',
            price: 699,
            originalPrice: 899,
            description: 'UV400防護，輕盈舒適',
            image: '🕶️',
            featured: true,
            stock: 25,
            createdAt: '2025-01-06T00:00:00.000Z'
        },
        {
            id: 7,
            name: '創意夜燈',
            category: '創意商品',
            price: 499,
            originalPrice: 650,
            description: '柔和LED燈光，可遙控控制',
            image: '💡',
            featured: false,
            stock: 35,
            createdAt: '2025-01-07T00:00:00.000Z'
        },
        {
            id: 8,
            name: '迷你風扇',
            category: '創意商品',
            price: 299,
            originalPrice: 399,
            description: 'USB供電，靜音設計',
            image: '🎐',
            featured: false,
            stock: 60,
            createdAt: '2025-01-08T00:00:00.000Z'
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
