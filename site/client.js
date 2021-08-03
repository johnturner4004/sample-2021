$(document).ready(onReady);
let open = '<i class="fas fa-bars"></i>';

function onReady() {
  console.log('JS');
  $('.menu').toggle(menuState);
  $('.toggle-menu').on('click', menuOpen);
  $('.toggle-icon').append(open);
}

let menuState = false;
let close = '<i class="fas fa-times"></i>';

function menuOpen() {
  $('.menu').animate({width: 'toggle'}, 500, 'swing');
  menuState = !menuState;
  if (menuState) {
    $('.toggle-icon').fadeOut(100, function(){
      $('.toggle-icon').empty().append(close).fadeIn();
    });
  } else {
    $('.toggle-icon').fadeOut(100, function(){
      $('.toggle-icon').empty().append(open).fadeIn();
    });
  }
}