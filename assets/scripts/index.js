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
let xWins = 0;
let oWins = 0;
let ties = 0;

let newGame = function() {
  $('.board').children().on('click', function(event) {
    if (turnCount === 0) {
      $(this).text('x');
    } else {
      $(this).text('o');
    }
    turnCount++
  });
}
/*
let move = function() {

  while (turnCount <= 8) {
    if (turnCount % 2 === 0) {
      $(this).text('x');
    } else {
      $(this).text('o');
    }
    turnCount++;
  }
}; */

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
      } else if (turnCount === 8) {
        winner = ties;
      }
};

if (winner === 'x') {
  xWins++;
} else if (winner === 'o') {
  oWins++;
} else {
  ties++;
}

/* let board = [[null, null, null],
            [null, null, null],
            [null, null, null]];

let winConditions = [[1, 2, 3], [4 ,5, 6], [7, 8, 9],
                    [1, 4, 7], [2, 5, 8], [3, 6, 9],
                    [1, 5, 9], [3, 5, 7]];

let turnCount = 0; // even = x, odd = o
let xWins = 0;
let oWins = 0;
let ties = 0;
let player;
let winner;

let clearBoard = function() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = null;
    }
  }
};

if (turnCount % 2 === 0) {
  player = 'x';
} else {
  player = 'o';
}

let move = function(player) {
  while (turnCount <= 8) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === null) {
        board[i][j] = player;
        }
      }
    } turnCount++;
  }
};

let checkWin = function() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === winConditions[i]) {
      winner = player;
    }
  }

  if (player === 'x') {
    alert('X wins!');
    xWins++;
  } else if (player === 'o'){
    alert('O wins!');
    oWins++;
  } else {
    ties++;
  }
};

$('#newgame').on('click', clearBoard()); */

$(document).ready(() => {
  console.log('It works.');
  newGame();
  victory();
});
