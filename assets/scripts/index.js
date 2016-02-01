'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

let turnCount = 0; // even turnCount = x, odd turnCount = o
let player;
let winner;

let setX = function() {
  if ($(this).html === "") {
    $(this).text('x');
  } else {
    alert('Choose another box!');
  }
};

let setO = function() {
  if ($(this).html() === "") {
  $(this).text('o');
} else {
  alert('Choose another box!');
}
};

let move = function() {
  if (turnCount % 2 === 0) {
    $('.row').on("click", setX());
  } else {
    $('.row').on("click", setO());
  }
  turnCount++;
};

let victory = function () {
  if ($('#one').html() && $('#two').html() && $('three').html() ||
      $('#four').html() && $('#five').html() && $('six').html() ||
      $('#seven').html() && $('#eight').html() && $('nine').html() ||
      $('#one').html() && $('#four').html() && $('seven').html() ||
      $('#two').html() && $('#five').html() && $('eight').html() ||
      $('#three').html() && $('#six').html() && $('nine').html() ||
      $('#one').html() && $('#five').html() && $('nine').html() ||
      $('#three').html() && $('#five').html() && $('seven').html() === player) {
        winner = player;
      } else if (turn === 8) {
        alert("It's a tie!");
      }
};

/*let board = [null,null,null,
            null, null, null,
            null, null, null];

let turnCount = 0; // even = x, odd = o

let move = function() {

}*/

$(document).ready(() => {
  console.log('It works.');
  move();
  victory();
});
