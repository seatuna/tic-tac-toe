'use strict';

let winner;
let player = 'x';
let xWins = 0;
let oWins = 0;
let ties = 0;
let gameStatus = 'active';

let switchPlayer = function() {
  if (player === 'x') {
    player = 'o';
  } else {
    player = 'x';
  }
};

let clearBoard = function() {
    $('.box').text('');
    $('.box').removeClass('disable');
    gameStatus = 'active';
};

$('.button').on('click', function () {
  clearBoard();
});

let score = function() {
  if (winner === 'x') {
    xWins++;
    $('#p1').text(xWins);
  } else if (winner === 'o') {
    oWins++;
    $('#p2').text(oWins);
  } else if (winner === 'tie'){
    ties++;
    $('#ties').text(ties);
    console.log('do ties work');
  }
};

let $BoxId = function(num) {
  return $('#' + num);
};

let checkWinCombo = function(a, b, c) {
  if ($BoxId(a).text() === player && $BoxId(b).text() === player && $BoxId(c).text() === player) {
    return true;
  } else {
    return false;
  }
};

let checkWin = function() {
  if(checkWinCombo(1, 2, 3) ||
    checkWinCombo(4, 5, 6) ||
    checkWinCombo(7, 8, 9) ||
    checkWinCombo(1, 4, 7) ||
    checkWinCombo(2, 5, 8) ||
    checkWinCombo(3, 6, 9) ||
    checkWinCombo(1, 5, 9) ||
    checkWinCombo(3, 5, 7) === true) {
      winner = player;
      gameStatus = 'inactive';
      $('.messages').text('Congrats! ' + player + ' wins!');
      score();
    } else if ($('.box').text().length === 9){
      winner = 'tie';
      $('.messages').text('It\'s a tie!');
      score();
    } else {
      return false;
    }
};

let move = function() {
  $('.box').on('click', function() {
    if(gameStatus === 'active') {
        if ($(this).text() !== '') {
          $('.messages').text('Select another box!');
        } else if (player === 'x') {
          $(this).text('x');
          $(this).last().addClass('disable');
        } else {
          $(this).text('o');
          $(this).last().addClass('disable');
        }
        checkWin();
        switchPlayer();
    }
  });
};

$(document).ready(() => {
  console.log('It works.');
  move();
});
