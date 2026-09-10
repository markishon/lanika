(function () {
  'use strict';

  const canvas = document.getElementById('game');
  const scoreEl = document.getElementById('score');
  const game = new window.Game(canvas);

  game.onScoreChange = function (value) {
    scoreEl.textContent = String(value);
  };

  document.getElementById('start').addEventListener('click', function () {
    game.start();
  });

  document.getElementById('pause').addEventListener('click', function () {
    game.pause();
  });

  game.render();
})();
