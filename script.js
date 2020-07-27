let theme = localStorage.getItem('theme');

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

  localStorage.setItem('theme', mode);
}
