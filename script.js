let theme = localStorage.getItem('theme');
const cards = document.querySelectorAll('.box');
const button = document.querySelector('.button');

const themeButs = document.querySelectorAll('.theme');

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
  if (mode == 'dark') {
    document.getElementById('theme-style').href = 'style.css';
  }
  if (mode == 'light') {
    document.getElementById('theme-style').href = 'light.css';
  }
  if (mode == 'gold') {
    document.getElementById('theme-style').href = 'gold.css';
  }

  localStorage.setItem('theme', mode);
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
