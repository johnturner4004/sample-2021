$(document).ready(onReady);
let open = '<i class="fas fa-bars"></i>';

function onReady() {
  console.log("JS");
  remove_hash_from_url();
  $(".toggle-menu").on("click", menuOpen);
  $(".toggle-icon").append(open);
  $(".toggle-expand").on("click", expand);
  $('.js-mode-toggle').on('click', handleClick);
  applySetting();
}

// variables for local storage to save setting for light/dark mode
const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

/**
 * Pass in a custom prop key and this function will return its
 * computed value. 
 */
const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }

  // Return the string response by default
  return response;
};

//click handler for the light/dark mode toggle button
const handleClick = () => {
  applySetting(toggleSetting());
};

/**
 * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
 * If it can’t find the setting in either, it tries to load the CSS color mode,
 * controlled by the media query
 */
const applySetting = passedSetting => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  
  if(currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setButtonLabelAndStatus(currentSetting);
  }
  else {
    setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
  }
}

/**
 * Get’s the current setting > reverses it > stores it
 */
const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);
  console.log(currentSetting);
  console.log('in toggle');
  
  
  switch(currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'light' ? 'dark' : 'light';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }


  localStorage.setItem(STORAGE_KEY, currentSetting);
  console.log(STORAGE_KEY);
  
  return currentSetting;
}

// sets the icon for the light/dark mode toggle button
const setButtonLabelAndStatus = currentSetting => { 
  let text = `${currentSetting === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'}`;
  $('.toggle-button__icon').fadeOut(100, function () {
    $('.toggle-button__icon').empty().append(text).fadeIn();
  });
  $('.js-mode-status').text(`Color mode is now "${currentSetting}"`);
}

//clears the hash from the url on reload
function remove_hash_from_url() {
  var uri = window.location.toString();

  if (uri.indexOf("#") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("#"));

    window.history.replaceState({}, document.title, clean_uri);
  }
}

//variables used to set the icon of the menu button
let menuState = false;
let close = '<i class="fas fa-times"></i>';

//opens and closes the menu for smaller screens
function menuOpen() {
  $(".menu").animate({ width: "toggle" }, 500, "swing");
  menuState = !menuState;
  if (menuState) {
    $(".toggle-icon").fadeOut(100, function () {
      $(".toggle-icon").empty().append(close).fadeIn();
    });
  } else {
    $(".toggle-icon").fadeOut(100, function () {
      $(".toggle-icon").empty().append(open).fadeIn();
    });
  }
}

//holds the current rotation of the icons on the button to collapse/expand buttons
let rotation = {
  "toggle-expand-zeroone": 0,
  "toggle-expand-zerotwo": 0,
  "toggle-expand-zerothree": 0,
};
function expand() {
  $(this).next("div").slideToggle(500);
  let id = $(this).attr("id");
  console.log(id, rotation);
  $(this)
    .children("i")
    .css({
      transform: `rotate(${(rotation[id] = Number((rotation[id] += 180)))}deg)`,
      transition: "all ease 1s",
    });
}