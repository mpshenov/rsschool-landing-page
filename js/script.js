// slider
let index = 0;
const trackElement = document.querySelector('[data-js-slider-track]');
const nextBtnElement = document.querySelector('[data-js-next-btn]');
const prevBtnElement = document.querySelector('[data-js-prev-btn]');
const sliderWindowElement = document.querySelector('[data-js-slider-window]');
const dotElements = document.querySelectorAll('[data-js-dot]');

let totalSlides;
if(trackElement) {
  totalSlides = trackElement.children.length;
} else {
  totalSlides = 0;
}

function updateDots() {
  dotElements.forEach(element => { element.classList.remove('active'); }); // Исправлена скобка )
  if (dotElements[index]) {
    dotElements[index].classList.add('active');
  }
}


if (trackElement && nextBtnElement && prevBtnElement) {
nextBtnElement.onclick = function() {
  if (index < totalSlides - 1) {
      index = index + 1;
  } else {
      index = 0; 
  }
    updateDots();
    trackElement.style.transform = `translateX(-${index * sliderWindowElement.clientWidth}px)`;
};

prevBtnElement.onclick = function() {
  if (index > 0) {
      index = index - 1;
  } else {
      index = totalSlides - 1; 
  }
    updateDots();
    trackElement.style.transform = `translateX(-${index * sliderWindowElement.clientWidth}px)`;
  }
};


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


//burger btn
const burgerBtnElement = document.querySelector('[data-js-burger-btn]');
const headerNavElement = document.querySelector('[data-js-header-nav]');
const navListElement = document.querySelector('.nav-list'); 
const navLinksElement = document.querySelectorAll('.nav-link');

if (burgerBtnElement && headerNavElement && navListElement) {

    function toggleMenu() {
        headerNavElement.classList.toggle('open');
        navListElement.classList.toggle('open');
        
        if (headerNavElement.classList.contains('open')) {
            burgerBtnElement.textContent = '✕';
        } else {
            burgerBtnElement.textContent = '☰';
        }
    }

    burgerBtnElement.onclick = toggleMenu;

    navLinksElement.forEach(link => {
        link.onclick = function() {
            if (headerNavElement.classList.contains('open')) {
                toggleMenu();
            }
        };
    });
}


