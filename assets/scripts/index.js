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

/* let board = [ [$(".box.one"), $(".box.two"), $(".box.three")],
              [$(".box.four"), $(".box.five"), $(".box.six")],
              [$(".box.seven"), $(".box.eight"), $(".box.nine")] ]; */

// starts game, click boxes to set x or o. Turn count will increase after one click
// and change the player.  This should keep going until someone wins.
let newGame = function() {
  $('.board').children().on('click', function() {
    if (turnCount === 0) {
      $(this).text('x');
      $(this).last().addClass('disable');
    } else {
      $(this).text('o');
      $(this).last().addClass('disable');
    }
    turnCount++;
  });
};

// win conditions.  If row or column or diagonal === x or o, then winner = player.
let victory = function () {
  if ($('#one').text() && $('#two').text() && $('#three').text() ||
      $('#four').text() && $('#five').text() && $('#six').text() ||
      $('#seven').text() && $('#eight').text() && $('#nine').text() ||
      $('#one').text() && $('#four').text() && $('#seven').text() ||
      $('#two').text() && $('#five').text() && $('#eight').text() ||
      $('#three').text() && $('#six').text() && $('#nine').text() ||
      $('#one').text() && $('#five').text() && $('#nine').text() ||
      $('#three').text() && $('#five').text() && $('#seven').text() === player) {
        winner = player;
      } else if (turnCount === 8) {
        winner = ties;
      }
};

let score = function() {
  if (winner === 'x') {
    xWins++;
  } else if (winner === 'o') {
    oWins++;
  } else {
    ties++;
  }
};

/* let board = [ [null, null, null],
              [null, null, null],
              [null, null, null] ];

let winConditions = { "topRow": board[0][0], board[0][1], board[0,2];
                      "midRow": board[1][0], board[1][1], board[1][2];
                      "botRow": board[2][0], board[2][1], board[2][2];
                      "leftCol": board[3][0], board[3][1], board[3][2];
                      "midCol": board[4][0], board[4][1], board[4][2];
                      "rightCol": board[5][0], board[5][1], board[5][2];
                      "diagLeft": board[6][0], board[6][1], board[6][2];
                      "diagRight": board[7][0], board[7][1], board[7][2] };

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
    if (board[i] === winConditions.topRow || winConditions.midRow) {
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
  score();
});
