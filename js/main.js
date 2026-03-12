// ═══════════════════════════════════════
// FOLKWEAR — Main JavaScript
// ═══════════════════════════════════════

// Navbar scroll effect
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Toast notifications
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Wishlist management
let wishlist = JSON.parse(localStorage.getItem('folkwear_wishlist') || '[]');

function updateWishlistBadge() {
  const badge = document.querySelector('.wishlist-badge');
  if (badge) badge.textContent = wishlist.length;
}

function toggleWishlist(productId, btn) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    if (btn) btn.classList.add('wishlisted');
    showToast('<span>♥</span> Added to your Wishlist');
  } else {
    wishlist.splice(idx, 1);
    if (btn) btn.classList.remove('wishlisted');
    showToast('Removed from Wishlist');
  }
  localStorage.setItem('folkwear_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

// Scroll animation observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Wishlist buttons
document.querySelectorAll('[data-wishlist]').forEach(btn => {
  const pid = btn.dataset.wishlist;
  if (wishlist.includes(pid)) btn.classList.add('wishlisted');
  btn.addEventListener('click', () => toggleWishlist(pid, btn));
});

// Cart button
document.querySelectorAll('.add-to-cart, .btn-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('<span>✓</span> Added to Cart');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Filter checkboxes
document.querySelectorAll('.filter-option').forEach(opt => {
  opt.addEventListener('click', () => {
    opt.classList.toggle('checked');
    const check = opt.querySelector('.filter-checkbox');
    if (check) check.textContent = opt.classList.contains('checked') ? '✓' : '';
  });
});

// Size filter buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Color filter buttons
document.querySelectorAll('.color-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-filter-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Product detail tabs
document.querySelectorAll('.product-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.product-tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.querySelector('[data-tab-content="' + tab + '"]');
    if (content) content.classList.add('active');
  });
});

// Product detail size selection
document.querySelectorAll('.detail-size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.detail-size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Product detail color selection
document.querySelectorAll('.detail-color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.detail-color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Quantity selector
const qtyValue = document.querySelector('.qty-value');
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!qtyValue) return;
    let val = parseInt(qtyValue.value) || 1;
    if (btn.dataset.action === 'minus') val = Math.max(1, val - 1);
    if (btn.dataset.action === 'plus') val = Math.min(10, val + 1);
    qtyValue.value = val;
  });
});

// Gallery thumbs
document.querySelectorAll('.gallery-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const main = document.querySelector('.gallery-main');
    if (main) {
      main.style.transition = 'opacity 0.3s ease';
      main.style.opacity = '0';
      setTimeout(() => { main.style.opacity = '1'; }, 300);
    }
  });
});

// Wishlist detail button
const wishlistLgBtn = document.querySelector('.btn-wishlist-lg');
if (wishlistLgBtn) {
  const pid = wishlistLgBtn.dataset.wishlist;
  if (pid && wishlist.includes(pid)) wishlistLgBtn.classList.add('active');
  wishlistLgBtn.addEventListener('click', () => {
    wishlistLgBtn.classList.toggle('active');
    showToast(wishlistLgBtn.classList.contains('active') ? '<span>♥</span> Added to Wishlist' : 'Removed from Wishlist');
  });
}

// Form tab switching
document.querySelectorAll('.form-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.form;
    document.querySelectorAll('.form-panel').forEach(p => {
      p.style.display = p.dataset.panel === target ? 'block' : 'none';
    });
  });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('<span>✓</span> Subscribed! Welcome to Folkwear.');
    newsletterForm.reset();
  });
}

// Contact form
const contactForm = document.querySelector('.contact-form-el');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('<span>✓</span> Message sent! We\'ll reply soon.');
    contactForm.reset();
  });
}

// Countdown timer for offers
function updateTimers() {
  document.querySelectorAll('[data-countdown]').forEach(el => {
    let secs = parseInt(el.dataset.countdown);
    if (isNaN(secs)) return;
    secs--;
    if (secs < 0) secs = 86399;
    el.dataset.countdown = secs;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const hEl = el.querySelector('.h');
    const mEl = el.querySelector('.m');
    const sEl = el.querySelector('.s');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  });
}
setInterval(updateTimers, 1000);

// Price range filter
const priceRange = document.querySelector('#priceRange');
const priceDisplay = document.querySelector('#priceDisplay');
if (priceRange && priceDisplay) {
  priceRange.addEventListener('input', () => {
    priceDisplay.textContent = '₹' + parseInt(priceRange.value).toLocaleString();
  });
}

// Wishlist page - render from localStorage
const wishlistContainer = document.querySelector('.wishlist-render');
if (wishlistContainer) {
  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="wishlist-empty">
        <div class="wishlist-empty-icon">♡</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save pieces that speak to your soul</p>
        <a href="products.html" class="btn-primary"><span>Explore Collection</span></a>
      </div>`;
  }
}


updateWishlistBadge();