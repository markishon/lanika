(function () {
  'use strict';

  const canvas = document.getElementById('game');
  const scoreEl = document.getElementById('score');
  const game = new window.Game(canvas);

  game.onScoreChange = function (value) {
    scoreEl.textContent = String(value);
  };

  document.querySelectorAll('.key').forEach(function (button) {
    window.Input.bindButton(button, button.dataset.action);
  });

  window.Input.onGo(function () {
    game.go();
  });

  window.addEventListener('resize', function () {
    game.resize();
  });

  game.resize();
})();
