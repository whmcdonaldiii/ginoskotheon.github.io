let theme = localStorage.getItem('theme');
const cards = document.querySelectorAll('.box');
const button = document.querySelector('.button');
let btnWrap = document.querySelector('#custom-substack-embed');

const aboutCircle = document.querySelector('.circleAbout');


const skillContent = document.querySelector('.skillSectionContent');
window.addEventListener('scroll', function(e) {
  var scroll = window.pageYOffset || document.documentElement.scrollTop ||
                document.body.scrollTop || 0;
                skillContent.style.opacity = 1 - Math.max(0, Math.min(1, -scroll / 200 + 2));
});


if (theme == null) {
  setTheme('dark');
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName('theme');

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener('click', function () {
    let mode = this.dataset.mode;
    console.log('Option clicked: ', mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  switch(mode){
    case 'dark': 
      document.getElementById('theme-style').href = 'style.css';
      break;
    case 'light': 
      document.getElementById('theme-style').href = 'light.css';
      break;
    case 'gold': 
      document.getElementById('theme-style').href = 'gold.css';
      break;
    default: 
      document.getElementById('theme-style').href = 'style.css';
  }
  localStorage.setItem('theme', mode);
}

function GrowHero()
{
  heroBox = document.querySelector('.imageBox');
  heroBox.classList.add('growHeroImg');
}


button.addEventListener('mouseover', function (e) {
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;
  let ripples = document.createElement('span');
  ripples.className = 'ripple';

  ripples.style.left = x + 'px';
  ripples.style.top = y + 'px';
  this.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 500);
});


aboutCircle.addEventListener('mouseover', function () {
  this.classList.add('bounce');
  setTimeout(() => {
    this.classList.remove('bounce');
  }, 2000);
});
