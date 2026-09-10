(function (global) {
  'use strict';

  const pressed = new Set();

  window.addEventListener('keydown', function (event) {
    pressed.add(event.code);
  });

  window.addEventListener('keyup', function (event) {
    pressed.delete(event.code);
  });

  global.Input = {
    isDown: function (code) {
      return pressed.has(code);
    },
    axisX: function () {
      let axis = 0;
      if (pressed.has('ArrowLeft') || pressed.has('KeyA')) axis -= 1;
      if (pressed.has('ArrowRight') || pressed.has('KeyD')) axis += 1;
      return axis;
    },
    axisY: function () {
      let axis = 0;
      if (pressed.has('ArrowUp') || pressed.has('KeyW')) axis -= 1;
      if (pressed.has('ArrowDown') || pressed.has('KeyS')) axis += 1;
      return axis;
    }
  };
})(window);
