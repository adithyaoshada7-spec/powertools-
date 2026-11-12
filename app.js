// Lanka Power Tools - Reactive Store Engine

let currentCategory = 'all';
let currentBrand = 'All Brands';
let currentSort = 'featured';
let searchQuery = '';
let cart = [];
let wishlist = new Set();
let discountAmount = 0;
let appliedPromoCode = '';
let lastConfirmedOrder = null;

// Currency Formatter for Sri Lankan Rupees
function formatLKR(amount) {
  return 'Rs. ' + amount.toLocaleString('en-LK');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initCategories();
  initBrands();
  initTestimonials();
  renderProducts();
  setupEventListeners();
  updateCartUI();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Setup Category Navigation Pills
function initCategories() {
  const container = document.getElementById('categoryPills');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button 
      onclick="selectCategory('${cat.id}')" 
      id="cat-pill-${cat.id}"
      class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
        cat.id === currentCategory 
          ? 'bg-brand-dark text-brand-yellow shadow-md' 
          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
      }"
    >
      <i data-lucide="${cat.icon || 'wrench'}" class="w-3.5 h-3.5"></i>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

// Setup Brand Filter Dropdown
function initBrands() {
  const brandSelect = document.getElementById('brandFilter');
  if (!brandSelect) return;

  brandSelect.innerHTML = BRANDS.map(b => `
    <option value="${b}">${b}</option>
  `).join('');
}

// Setup Testimonials
function initTestimonials() {
  const container = document.getElementById('testimonialsContainer');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
      <div class="space-y-3">
        <div class="flex items-center gap-1 text-amber-400">
          ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
        </div>
        <p class="text-xs text-slate-700 leading-relaxed italic">"${t.comment}"</p>
      </div>
      <div class="flex items-center gap-3 pt-4 mt-4 border-t border-slate-200/60">
        <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border border-amber-400">
        <div>
          <div class="font-bold text-xs text-slate-900">${t.name}</div>
          <div class="text-[11px] text-slate-500">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Category Selection Handler
function selectCategory(categoryId) {
  currentCategory = categoryId;
  initCategories();
  renderProducts();
  if (window.lucide) lucide.createIcons();
}

// Render Products Grid based on current filters
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const countEl = document.getElementById('displayedCount');
  const resetBtn = document.getElementById('resetFiltersBtn');

  // Filter products
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesBrand = currentBrand === 'All Brands' || product.brand === currentBrand;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Sort products
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update counts
  if (countEl) countEl.textContent = filtered.length;
  
  // Show/hide reset button
  const isFiltered = currentCategory !== 'all' || currentBrand !== 'All Brands' || searchQuery !== '';
  if (resetBtn) resetBtn.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = filtered.map(product => {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isWishlisted = wishlist.has(product.id);

    return `
      <div class="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:border-amber-400 group relative">
        
        <!-- Top Badges & Actions -->
        <div class="relative h-48 bg-slate-100 overflow-hidden">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          
          <!-- Category & Promo Badge -->
          <div class="absolute top-3 left-3 flex flex-col gap-1 items-start">
            ${product.badge ? `
              <span class="bg-brand-dark/90 backdrop-blur-md text-brand-yellow font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md border border-brand-yellow/30 shadow">
                ${product.badge}
              </span>
            ` : ''}
            <span class="bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
              -${discountPercent}%
            </span>
          </div>

          <!-- Wishlist Button -->
          <button 
            onclick="toggleWishlist('${product.id}')"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-600 flex items-center justify-center shadow transition active:scale-90"
            title="Add to Wishlist"
          >
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>

          <!-- Warranty strip -->
          <div class="absolute bottom-2 left-2 right-2 text-[10px] text-white/90 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1 font-medium">
            <i data-lucide="shield-check" class="w-3 h-3 text-emerald-400"></i>
            <span>${product.warranty}</span>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-bold uppercase tracking-wider text-amber-600">${product.brand}</span>
              <div class="flex items-center gap-1 text-slate-500 text-[11px]">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                <span class="font-semibold text-slate-700">${product.rating}</span>
                <span>(${product.reviewsCount})</span>
              </div>
            </div>

            <h3 class="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-brand-amber transition cursor-pointer" onclick="openQuickView('${product.id}')">
              ${product.name}
            </h3>
            
            <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${product.description}</p>
          </div>

          <!-- Pricing & CTAs -->
          <div class="pt-2 border-t border-slate-100">
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-lg font-black text-slate-950">${formatLKR(product.price)}</span>
              <span class="text-xs text-slate-400 line-through">${formatLKR(product.originalPrice)}</span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button 
                onclick="openQuickView('${product.id}')"
                class="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>Quick View</span>
              </button>

              <button 
                onclick="quickAddToCart('${product.id}')"
                class="bg-brand-dark hover:bg-slate-800 text-brand-yellow text-xs font-bold py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1 shadow-sm active:scale-95"
              >
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                <span>Add</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Setup Event Listeners for Filters & Modals
function setupEventListeners() {
  const brandFilter = document.getElementById('brandFilter');
  if (brandFilter) {
    brandFilter.addEventListener('change', (e) => {
      currentBrand = e.target.value;
      renderProducts();
    });
  }

  const sortOrder = document.getElementById('sortOrder');
  if (sortOrder) {
    sortOrder.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Live Desktop Search
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) clearSearchBtn.classList.toggle('hidden', !searchQuery);
      renderProducts();
    });
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderProducts();
    });
  }

  // Mobile Search
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer Toggles
  const cartBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartDrawerBackdrop');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Quick view backdrop close
  const qvBackdrop = document.getElementById('quickViewBackdrop');
  if (qvBackdrop) {
    qvBackdrop.addEventListener('click', (e) => {
      if (e.target === qvBackdrop) closeQuickView();
    });
  }

  // Checkout modal backdrop close
  const chBackdrop = document.getElementById('checkoutModalBackdrop');
  if (chBackdrop) {
    chBackdrop.addEventListener('click', (e) => {
      if (e.target === chBackdrop) closeCheckoutModal();
    });
  }

  // Wishlist toggle button scroll
  const wishlistBtn = document.getElementById('wishlistToggleBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (wishlist.size === 0) {
        showToast('Your wishlist is empty. Tap the heart on any tool!', 'info');
      } else {
        showToast(`You have ${wishlist.size} tools in your wishlist!`, 'success');
      }
    });
  }
}

// Reset all search and filters
function resetAllFilters() {
  currentCategory = 'all';
  currentBrand = 'All Brands';
  currentSort = 'featured';
  searchQuery = '';
  
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const brandFilter = document.getElementById('brandFilter');
  const sortOrder = document.getElementById('sortOrder');

  if (searchInput) searchInput.value = '';
  if (mobileSearchInput) mobileSearchInput.value = '';
  if (brandFilter) brandFilter.value = 'All Brands';
  if (sortOrder) sortOrder.value = 'featured';

  initCategories();
  renderProducts();
}

// Cart Management Functions
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Added "${product.name}" to your cart!`, 'success');
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
    showToast(`Removed from cart`, 'info');
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
  showToast('Item removed from cart', 'info');
}

function updateCartDelivery() {
  updateCartUI();
}

function updateCartUI() {
  const cartCountEl = document.getElementById('cartCount');
  const cartHeaderTotalEl = document.getElementById('cartHeaderTotal');
  const drawerBadgeCountEl = document.getElementById('drawerBadgeCount');
  const cartItemList = document.getElementById('cartItemList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartFooter = document.getElementById('cartFooter');
  
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const drawerDiscount = document.getElementById('drawerDiscount');
  const discountRow = document.getElementById('discountRow');
  const drawerDelivery = document.getElementById('drawerDelivery');
  const drawerTotal = document.getElementById('drawerTotal');
  const checkoutPayableTotal = document.getElementById('checkoutPayableTotal');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery calculation
  const deliverySelect = document.getElementById('deliverySelect');
  let deliveryFee = deliverySelect ? parseInt(deliverySelect.value, 10) : 450;

  // Free delivery for orders >= 100,000 LKR
  if (subtotal >= 100000 && deliveryFee > 0) {
    deliveryFee = 0;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Update header badges
  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartHeaderTotalEl) cartHeaderTotalEl.textContent = formatLKR(subtotal);
  if (drawerBadgeCountEl) drawerBadgeCountEl.textContent = totalCount;

  // Empty state handling
  if (cart.length === 0) {
    if (cartItemList) cartItemList.innerHTML = '';
    if (cartEmptyState) cartEmptyState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
    return;
  }

  if (cartEmptyState) cartEmptyState.classList.add('hidden');
  if (cartFooter) cartFooter.classList.remove('hidden');

  // Render items list
  if (cartItemList) {
    cartItemList.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 shrink-0">
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">${item.brand}</div>
          <h4 class="font-bold text-xs text-slate-900 truncate">${item.name}</h4>
          <div class="text-xs font-black text-slate-800 mt-1">${formatLKR(item.price)}</div>
        </div>
        <div class="flex flex-col items-end gap-2 shrink-0">
          <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-rose-600 transition">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
          <div class="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden shadow-sm">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100">-</button>
            <span class="px-2 text-xs font-bold text-slate-900">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update footer pricing numbers
  if (drawerSubtotal) drawerSubtotal.textContent = formatLKR(subtotal);
  if (drawerDelivery) {
    if (deliveryFee === 0) {
      drawerDelivery.innerHTML = '<span class="text-emerald-600 font-bold">FREE</span>';
    } else {
      drawerDelivery.textContent = formatLKR(deliveryFee);
    }
  }

  if (discountAmount > 0) {
    if (discountRow) discountRow.classList.remove('hidden');
    if (drawerDiscount) drawerDiscount.textContent = `- ${formatLKR(discountAmount)}`;
  } else {
    if (discountRow) discountRow.classList.add('hidden');
  }

  if (drawerTotal) drawerTotal.textContent = formatLKR(finalTotal);
  if (checkoutPayableTotal) checkoutPayableTotal.textContent = formatLKR(finalTotal);

  if (window.lucide) lucide.createIcons();
}

// Promo Code Application
function applyPromoCode() {
  const input = document.getElementById('promoInput');
  const msg = document.getElementById('promoMessage');
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!code) {
    msg.textContent = 'Please enter a coupon code';
    msg.className = 'text-[11px] font-medium text-rose-600';
    msg.classList.remove('hidden');
    return;
  }

  if (code === 'LANKA10') {
    discountAmount = Math.round(subtotal * 0.10);
    appliedPromoCode = 'LANKA10';
    msg.textContent = `Promo code applied! 10% discount (-${formatLKR(discountAmount)})`;
    msg.className = 'text-[11px] font-medium text-emerald-600';
    msg.classList.remove('hidden');
    updateCartUI();
  } else if (code === 'CONTRACTOR' || code === 'POWERTLS') {
    discountAmount = 2500;
    appliedPromoCode = code;
    msg.textContent = `Contractor discount applied! (-Rs. 2,500)`;
    msg.className = 'text-[11px] font-medium text-emerald-600';
    msg.classList.remove('hidden');
    updateCartUI();
  } else {
    msg.textContent = 'Invalid promo code. Try "LANKA10" for 10% off!';
    msg.className = 'text-[11px] font-medium text-rose-600';
    msg.classList.remove('hidden');
  }
}

// Drawer Visibility Controls
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer || !backdrop) return;

  backdrop.classList.remove('hidden');
  setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
  drawer.classList.remove('translate-x-full');
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer || !backdrop) return;

  drawer.classList.add('translate-x-full');
  backdrop.classList.add('opacity-0');
  setTimeout(() => backdrop.classList.add('hidden'), 300);
}

// Wishlist Handling
function toggleWishlist(productId) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast('Removed from wishlist', 'info');
  } else {
    wishlist.add(productId);
    showToast('Saved to wishlist!', 'success');
  }

  const wishlistCount = document.getElementById('wishlistCount');
  if (wishlistCount) wishlistCount.textContent = wishlist.size;
  renderProducts();
}

// Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');

  modal.innerHTML = `
    <div class="relative p-6 sm:p-8">
      <button onclick="closeQuickView()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        <!-- Image & Badges -->
        <div>
          <div class="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover">
            ${product.badge ? `
              <span class="absolute top-3 left-3 bg-brand-dark text-brand-yellow font-extrabold text-xs uppercase px-3 py-1 rounded-md shadow">
                ${product.badge}
              </span>
            ` : ''}
          </div>
          <div class="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1">
            <div class="font-bold text-amber-900 flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
              <span>${product.warranty}</span>
            </div>
            <p class="text-slate-600">Includes genuine warranty certificate and authorized Colombo service center backing.</p>
          </div>
        </div>

        <!-- Tech Details -->
        <div class="space-y-4">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">${product.brand} Industrial Machinery</span>
            <h2 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight mt-1">${product.name}</h2>
            
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center text-amber-400">
                ${Array(5).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
              </div>
              <span class="text-xs font-bold text-slate-700">${product.rating}</span>
              <span class="text-xs text-slate-400">(${product.reviewsCount} customer reviews in Sri Lanka)</span>
            </div>
          </div>

          <div class="flex items-baseline gap-3 py-2 border-y border-slate-100">
            <span class="text-2xl font-black text-slate-950">${formatLKR(product.price)}</span>
            <span class="text-sm text-slate-400 line-through">${formatLKR(product.originalPrice)}</span>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">In Stock • Immediate Dispatch</span>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">${product.description}</p>

          <!-- Specifications Table -->
          <div>
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Technical Specifications</h4>
            <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs divide-y divide-slate-200/60">
              ${Object.entries(product.specs).map(([key, val]) => `
                <div class="py-1.5 flex justify-between">
                  <span class="text-slate-500 font-medium">${key}</span>
                  <span class="font-bold text-slate-800 text-right">${val}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- What's in the Box -->
          <div>
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">What's In The Box</h4>
            <div class="flex flex-wrap gap-1.5">
              ${product.includes.map(inc => `
                <span class="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md font-medium border border-slate-200 flex items-center gap-1">
                  <i data-lucide="check" class="w-3 h-3 text-emerald-500"></i>
                  ${inc}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3 pt-3">
            <button 
              onclick="quickAddToCart('${product.id}'); closeQuickView(); openCart();"
              class="bg-brand-dark hover:bg-slate-800 text-brand-yellow font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <i data-lucide="shopping-cart" class="w-4 h-4"></i>
              <span>Add to Cart</span>
            </button>
            <a 
              href="https://wa.me/94778899000?text=Hi%2C%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(product.name)}%20(${formatLKR(product.price)})" 
              target="_blank"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  `;

  backdrop.classList.remove('hidden');
  setTimeout(() => {
    backdrop.classList.remove('opacity-0');
    modal.classList.remove('scale-95');
  }, 10);

  if (window.lucide) lucide.createIcons();
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');
  if (!modal || !backdrop) return;

  modal.classList.add('scale-95');
  backdrop.classList.add('opacity-0');
  setTimeout(() => backdrop.classList.add('hidden'), 200);
}

// WhatsApp Direct Checkout Message Generator
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliverySelect = document.getElementById('deliverySelect');
  let deliveryFee = deliverySelect ? parseInt(deliverySelect.value, 10) : 450;
  if (subtotal >= 100000) deliveryFee = 0;
  
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const destinationText = deliverySelect ? deliverySelect.options[deliverySelect.selectedIndex].text : 'Colombo';

  let msg = `*NEW ORDER - LANKA POWER TOOLS WEBSTORE*\n`;
  msg += `----------------------------------------\n`;
  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.name}*\n   Qty: ${item.quantity} | Price: ${formatLKR(item.price * item.quantity)}\n`;
  });
  msg += `----------------------------------------\n`;
  msg += `*Subtotal:* ${formatLKR(subtotal)}\n`;
  if (discountAmount > 0) {
    msg += `*Discount (${appliedPromoCode}):* -${formatLKR(discountAmount)}\n`;
  }
  msg += `*Delivery (${destinationText}):* ${deliveryFee === 0 ? 'FREE' : formatLKR(deliveryFee)}\n`;
  msg += `*TOTAL ESTIMATE:* ${formatLKR(total)}\n\n`;
  msg += `Payment method: Cash on Delivery / Bank Transfer\n`;
  msg += `Please confirm my order and send dispatch details.`;

  const waUrl = `https://wa.me/94778899000?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Direct Online Checkout Modal
function openOnlineCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  closeCart();

  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (!backdrop) return;

  backdrop.classList.remove('hidden');
  setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
}

function closeCheckoutModal() {
  const backdrop = document.getElementById('checkoutModalBackdrop');
  if (!backdrop) return;

  backdrop.classList.add('opacity-0');
  setTimeout(() => backdrop.classList.add('hidden'), 200);
}

// Handle Order Submission
function submitCustomerOrder(event) {
  event.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const district = document.getElementById('custDistrict').value;
  const address = document.getElementById('custAddress').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentOption"]:checked').value;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliverySelect = document.getElementById('deliverySelect');
  let deliveryFee = deliverySelect ? parseInt(deliverySelect.value, 10) : 450;
  if (subtotal >= 100000) deliveryFee = 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const orderId = 'LPT-' + Math.floor(100000 + Math.random() * 900000);

  let paymentText = 'Cash on Delivery (COD)';
  if (paymentMethod === 'bank') paymentText = 'Bank Transfer (Sampath / Commercial)';
  if (paymentMethod === 'koko') paymentText = 'Koko 3-Month Installments';

  lastConfirmedOrder = {
    orderId,
    name,
    phone,
    district,
    address,
    paymentMethod: paymentText,
    total: formatLKR(total),
    items: [...cart]
  };

  // Close checkout modal
  closeCheckoutModal();

  // Populate & open success modal
  document.getElementById('successOrderId').textContent = orderId;
  document.getElementById('successName').textContent = name + ` (${phone})`;
  document.getElementById('successAddress').textContent = `${address}, ${district}`;
  document.getElementById('successPayment').textContent = paymentText;
  document.getElementById('successTotal').textContent = formatLKR(total);

  const successBackdrop = document.getElementById('orderSuccessBackdrop');
  successBackdrop.classList.remove('hidden');
  setTimeout(() => successBackdrop.classList.remove('opacity-0'), 10);

  // Clear cart
  cart = [];
  discountAmount = 0;
  appliedPromoCode = '';
  updateCartUI();

  if (window.lucide) lucide.createIcons();
}

function closeSuccessModal() {
  const successBackdrop = document.getElementById('orderSuccessBackdrop');
  if (!successBackdrop) return;

  successBackdrop.classList.add('opacity-0');
  setTimeout(() => successBackdrop.classList.add('hidden'), 200);
}

function sendOrderReceiptWhatsApp() {
  if (!lastConfirmedOrder) return;

  let msg = `*CONFIRMED ORDER - ${lastConfirmedOrder.orderId}*\n`;
  msg += `Customer: ${lastConfirmedOrder.name}\n`;
  msg += `Phone: ${lastConfirmedOrder.phone}\n`;
  msg += `Address: ${lastConfirmedOrder.address}, ${lastConfirmedOrder.district}\n`;
  msg += `Payment: ${lastConfirmedOrder.paymentMethod}\n`;
  msg += `Total Amount: ${lastConfirmedOrder.total}\n\n`;
  msg += `Items Ordered:\n`;
  lastConfirmedOrder.items.forEach((item, idx) => {
    msg += `- ${item.name} (x${item.quantity})\n`;
  });
  msg += `\nPlease verify my order and dispatch to my location.`;

  window.open(`https://wa.me/94778899000?text=${encodeURIComponent(msg)}`, '_blank');
}

// Quick Contractor Quote Modal Controls
function openQuickQuoteModal() {
  const backdrop = document.getElementById('quoteModalBackdrop');
  if (!backdrop) return;
  backdrop.classList.remove('hidden');
  setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
  if (window.lucide) lucide.createIcons();
}

function closeQuickQuoteModal() {
  const backdrop = document.getElementById('quoteModalBackdrop');
  if (!backdrop) return;
  backdrop.classList.add('opacity-0');
  setTimeout(() => backdrop.classList.add('hidden'), 200);
}

function submitQuoteRequest(event) {
  event.preventDefault();
  const company = document.getElementById('quoteCompany').value;
  const contact = document.getElementById('quoteContact').value;
  const details = document.getElementById('quoteDetails').value;

  closeQuickQuoteModal();
  showToast('Quotation request submitted! Our corporate desk will call you within 30 minutes.', 'success');

  const waMsg = `*CONTRACTOR QUOTATION REQUEST*\nCompany: ${company}\nContact: ${contact}\nRequirement:\n${details}`;
  window.open(`https://wa.me/94778899000?text=${encodeURIComponent(waMsg)}`, '_blank');
}

function openWhatsAppQuote() {
  const msg = `Hi Lanka Power Tools! I am interested in getting a site quotation for power tools.`;
  window.open(`https://wa.me/94778899000?text=${encodeURIComponent(msg)}`, '_blank');
}

// Toast Notifications Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-slate-900 border-emerald-500 text-white' : 
             type === 'error' ? 'bg-slate-900 border-rose-500 text-white' : 
             'bg-slate-900 border-amber-400 text-white';

  const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';

  toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-xl text-xs font-semibold ${bg} animate-toast max-w-sm`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 ${type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-amber-400'} shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
