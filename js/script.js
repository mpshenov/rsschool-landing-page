// slider
let index = 0;
const trackElement = document.querySelector('[data-js-slider-track]');
const nextBtnElement = document.querySelector('[data-js-next-btn]');
const prevBtnElement = document.querySelector('[data-js-prev-btn]');

if (trackElement && nextBtnElement && prevBtnElement) {
nextBtnElement.onclick = function() {
  if (index < 2) {
    index = index + 1;
    trackElement.style.transform = `translateX(-${index * 1440}px)`;
  }
};

prevBtnElement.onclick = function() {
  if (index > 0) {
    index = index - 1;
    trackElement.style.transform = `translateX(-${index * 1440}px)`;
  }
};
}

// toggleBtn
const themeToggleElement = document.querySelector('[data-js-theme-toggle]');
const lightIconElement = document.querySelector('[data-js-light-icon]');
const darkIconElement = document.querySelector('[data-js-dark-icon]');

const applyTheme = (isDark) => {
  if (isDark) {
    document.body.classList.add('dark-mode');
    lightIconElement.classList.remove('active');
    darkIconElement.classList.add('active');
  } else {
    document.body.classList.remove('dark-mode');
    darkIconElement.classList.remove('active');
    lightIconElement.classList.add('active');
  }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else {
  applyTheme(false);
}

themeToggleElement.addEventListener('click', () => {
  const isDarkNow = document.body.classList.contains('dark-mode');
  
  const nextThemeIsDark = !isDarkNow;
  
  applyTheme(nextThemeIsDark);
  
  localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light');
});


// coffee tea dessert btns
const coffeeBtnElement = document.querySelector('[data-js-coffee-btn]');
const teaBtnElement = document.querySelector('[data-js-tea-btn]');
const dessertBtnElement = document.querySelector('[data-js-dessert-btn]');

const coffeeContentElement = document.querySelector('[data-js-coffee-content]');
const teaContentElement = document.querySelector('[data-js-tea-content]');
const dessertContentElement = document.querySelector('[data-js-desserts-content]');

if (coffeeBtnElement && teaBtnElement && dessertBtnElement && coffeeContentElement && teaContentElement && dessertContentElement) {
    const switchTab = (activeBtn, activeContent) => {

    coffeeBtnElement.classList.remove('active');
    teaBtnElement.classList.remove('active');
    dessertBtnElement.classList.remove('active');

    coffeeContentElement.classList.remove('active');
    teaContentElement.classList.remove('active');
    dessertContentElement.classList.remove('active');

    activeBtn.classList.add('active');
    activeContent.classList.add('active');
    };
  coffeeBtnElement.addEventListener('click', () => switchTab(coffeeBtnElement, coffeeContentElement));
  teaBtnElement.addEventListener('click', () => switchTab(teaBtnElement, teaContentElement));
  dessertBtnElement.addEventListener('click', () => switchTab(dessertBtnElement, dessertContentElement));
}
