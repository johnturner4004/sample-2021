$(document).ready(onReady);
let open = '<i class="fas fa-bars"></i>';

function onReady() {
  console.log("JS");
  remove_hash_from_url();
  // $('.menu').toggle(menuState);
  $(".toggle-menu").on("click", menuOpen);
  $(".toggle-icon").append(open);
  $(".toggle-expand").on("click", expand);
}

function remove_hash_from_url() {
  var uri = window.location.toString();

  if (uri.indexOf("#") > 0) {
    var clean_uri = uri.substring(0, uri.indexOf("#"));

    window.history.replaceState({}, document.title, clean_uri);
  }
}

let menuState = false;
let close = '<i class="fas fa-times"></i>';

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

// function offsetAnchor() {
//   console.log('in offset anchor');

//   if (location.hash.length !== 0) {
//     var x = window.scrollX;
//     var y = window.scrollY + 1000;
//     window.scrollTo(x, y);
//   }
// }

// $(document).on('click', 'a[href^="#"]', function(event) {
//   window.setTimeout(function() {
//     offsetAnchor();
//   }, 0);
// });

// window.setTimeout(offsetAnchor, 0);
