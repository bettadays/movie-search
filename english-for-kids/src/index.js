const mode = document.querySelector('.mode');
const modeName = document.querySelector('.mode__name');
const toggle = document.querySelector('.mode__toggle');

mode.addEventListener('click', () => {
  if(mode.classList.contains('mode_toggled')){
    modeName.innerHTML = 'TRAIN';
  } else modeName.innerHTML = 'PLAY';
   mode.classList.toggle('mode_toggled');
   modeName.classList.toggle('mode__name_toggled');
   toggle.classList.toggle('mode__toggle_toggled');


})
