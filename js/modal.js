const grid = document.querySelector('[data-js-products-grid]');
const showMoreBtn = document.querySelector('[data-js-show-more]');

const coffeeBtn  = document.querySelector('[data-js-coffee-btn]');
const teaBtn     = document.querySelector('[data-js-tea-btn]');
const dessertBtn = document.querySelector('[data-js-dessert-btn]');



const overlay     = document.querySelector('[data-js-modal-overlay]');
const modalWindow = document.querySelector('[data-js-modal-window]');
const closeBtn    = document.querySelector('[data-js-modal-close]');

const modalTitle        = document.querySelector('[data-js-modal-title]');
const modalDesc         = document.querySelector('[data-js-modal-desc]');
const modalImage        = document.querySelector('[data-js-modal-image]');
const modalPrice        = document.querySelector('[data-js-modal-price]');
const modalSizesBox     = document.querySelector('[data-js-modal-sizes]');
const modalAdditivesBox = document.querySelector('[data-js-modal-additives]');


let visibleCount = 8;
let currentCategory = 'coffee';

let currentProduct = null;
let currentSize = 's';
let currentAdditives = new Set();


function getInitialCount() {
  if (window.innerWidth <= 768) {
    return 4;
  }
  return 8;
}


function renderProducts(category) {
  currentCategory = category;

  const allProducts = [];
  for (let i = 0; i < productsData.length; i++) {
    if (productsData[i].category === category) {
      allProducts.push(productsData[i]);
    }
  }

  grid.innerHTML = '';

  let howManyToShow = visibleCount;
  if (howManyToShow > allProducts.length) {
    howManyToShow = allProducts.length;
  }

  for (let i = 0; i < howManyToShow; i++) {
    const product = allProducts[i];

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.name = product.name;

    card.innerHTML = `
      <div class="product-card__image-wrapper">
        <img src="./assets/images/${product.image}.png"
             alt="${product.name}"
             class="product-card__img">
      </div>
      <div class="product-card__description">
        <h2 class="product-card__title heading-3">${product.name}</h2>
        <p class="product-card__taste medium">${product.description}</p>
        <data value="${product.price}" class="heading-3">$${product.price}</data>
      </div>
    `;

    grid.appendChild(card);
  }

  if (visibleCount >= allProducts.length) {
    showMoreBtn.style.display = 'none';
  } else {
    showMoreBtn.style.display = 'flex';
  }
}


showMoreBtn.addEventListener('click', () => {
  visibleCount = visibleCount + 4;
  renderProducts(currentCategory);
});


function activateTab(button, category) {
  coffeeBtn.classList.remove('active');
  teaBtn.classList.remove('active');
  dessertBtn.classList.remove('active');

  button.classList.add('active');

  visibleCount = getInitialCount();
  renderProducts(category);
}

coffeeBtn.addEventListener('click',  () => activateTab(coffeeBtn, 'coffee'));
teaBtn.addEventListener('click',     () => activateTab(teaBtn, 'tea'));
dessertBtn.addEventListener('click', () => activateTab(dessertBtn, 'dessert'));


function openModal(productName) {
  currentProduct = productsData.find(p => p.name === productName);
  if (!currentProduct) return;

  currentSize = 's';
  currentAdditives.clear();

  modalTitle.textContent = currentProduct.name;
  modalDesc.textContent  = currentProduct.description;
  modalImage.src         = `./assets/images/${currentProduct.image}.png`;
  modalImage.alt         = currentProduct.name;

  modalSizesBox.innerHTML = '';
  Object.keys(currentProduct.sizes).forEach(key => {
    const info = currentProduct.sizes[key];
    const btn = document.createElement('button');
    btn.className = 'options-btn' + (key === 's' ? ' active' : '');
    btn.textContent = `${key.toUpperCase()} ${info.size}`;
    btn.addEventListener('click', () => {
      modalSizesBox.querySelectorAll('.options-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = key;
      updateTotal();
    });
    modalSizesBox.appendChild(btn);
  });

  modalAdditivesBox.innerHTML = '';
  currentProduct.additives.forEach((add, index) => {
    const btn = document.createElement('button');
    btn.className = 'options-btn';
    btn.textContent = add.name;
    btn.addEventListener('click', () => {
      if (currentAdditives.has(index)) {
        currentAdditives.delete(index);
        btn.classList.remove('active');
      } else {
        currentAdditives.add(index);
        btn.classList.add('active');
      }
      updateTotal();
    });
    modalAdditivesBox.appendChild(btn);
  });

  updateTotal();
  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
}


function updateTotal() {
  if (!currentProduct) return;

  let total = parseFloat(currentProduct.price);
  total += parseFloat(currentProduct.sizes[currentSize]['add-price']);

  currentAdditives.forEach(i => {
    total += parseFloat(currentProduct.additives[i]['add-price']);
  });

  modalPrice.textContent = `$${total.toFixed(2)}`;
}


function closeModal() {
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
  currentProduct = null;
}

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (!modalWindow.contains(e.target)) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});


grid.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  openModal(card.dataset.name);
});


visibleCount = getInitialCount();
renderProducts('coffee');

let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const nowWide = window.innerWidth > 768;
  const wasWide = lastWidth > 768;

  if (nowWide !== wasWide) {
    visibleCount = getInitialCount();
  }

  lastWidth = window.innerWidth;
  renderProducts(currentCategory);
});