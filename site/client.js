$(document).ready(onReady);

function onReady() {
  console.log('JS');
  $('.menu').toggle(menuState);
  $('.toggle-menu').on('click', menuOpen);
}

let menuState = false;

function menuOpen() {
  $('.menu').animate({width: 'toggle'}, 500, 'swing');
}