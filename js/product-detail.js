// ========== 商品詳情頁腳本 ==========
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    currentProduct = getProduct(productId);
    
    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }
    
    renderProductDetail();
});

function renderProductDetail() {
    const container = document.getElementById('product-detail');
    if (!container) return;
    
    const p = currentProduct;
    
    container.innerHTML = `
        <div class="product-gallery">
            ${p.image.endsWith('.svg') || p.image.endsWith('.jpg') || p.image.endsWith('.png') 
                ? `<img src="${p.image}" alt="${p.name}" onerror="this.outerHTML='📦'" style="width:100%;max-height:400px;object-fit:contain;">`
                : p.image}
        </div>
        <div class="product-details">
            <span class="product-category">${p.category}</span>
            <h1>${p.name}</h1>
            <p class="price">
                ${formatPrice(p.price)}
                ${p.originalPrice ? `<span class="product-old-price">${formatPrice(p.originalPrice)}</span>` : ''}
            </p>
            <p class="description">${p.description}</p>
            <div class="product-meta">
                <p>庫存: ${p.stock} 件</p>
            </div>
            <div class="quantity-control">
                <span>數量:</span>
                <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                <input type="text" id="quantity" class="quantity-input" value="1" readonly>
                <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
            </div>
            <div class="product-actions" style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="addToCartAndNotify()">加入購物車</button>
                <button class="btn btn-outline" onclick="window.history.back()">返回</button>
            </div>
        </div>
    `;
}

function changeQuantity(delta) {
    const input = document.getElementById('quantity');
    let value = parseInt(input.value) + delta;
    value = Math.max(1, Math.min(currentProduct.stock, value));
    input.value = value;
}

function addToCartAndNotify() {
    const quantity = parseInt(document.getElementById('quantity').value);
    DB.addToCart(currentProduct.id, quantity);
    showNotification(`已將 ${quantity} 件 ${currentProduct.name} 添加到購物車`);
}
