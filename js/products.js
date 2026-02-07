// ========== 商品列表頁腳本 ==========
let allProducts = [...DB.products];

document.addEventListener('DOMContentLoaded', function() {
    // 檢查 URL 參數
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        document.getElementById('category-filter').value = category;
        filterByCategory();
    } else {
        renderProducts(allProducts, 'products-grid');
    }
});

function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    renderProducts(filtered, 'products-grid');
}

function filterByCategory() {
    const category = document.getElementById('category-filter').value;
    let filtered = allProducts;
    
    if (category) {
        filtered = allProducts.filter(p => p.category === category);
    }
    
    renderProducts(filtered, 'products-grid');
}

function sortProducts() {
    const sortBy = document.getElementById('sort-filter').value;
    let sorted = [...allProducts];
    
    switch(sortBy) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    const category = document.getElementById('category-filter').value;
    if (category) {
        sorted = sorted.filter(p => p.category === category);
    }
    
    renderProducts(sorted, 'products-grid');
}

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>沒有找到商品</h3>
                <p>試試其他搜尋條件</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.image.endsWith('.svg') || product.image.endsWith('.jpg') || product.image.endsWith('.png') 
                    ? `<img src="${product.image}" alt="${product.name}" onerror="this.outerHTML='📦'">`
                    : product.image}
            </div>
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
