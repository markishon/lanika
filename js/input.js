(function (global) {
  'use strict';

  const KEY_MAP = {
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right',
    ArrowDown: 'down',
    KeyS: 'down',
    Space: 'go',
    Enter: 'go'
  };

  const active = new Set();
  const goHandlers = [];

  function press(action) {
    if (action === 'go') {
      goHandlers.forEach(function (handler) {
        handler();
      });
      return;
    }
    active.add(action);
  }

  function release(action) {
    active.delete(action);
  }

  window.addEventListener('keydown', function (event) {
    const action = KEY_MAP[event.code];
    if (!action) return;
    event.preventDefault();
    if (action === 'go' && event.repeat) return;
    press(action);
  });

  window.addEventListener('keyup', function (event) {
    const action = KEY_MAP[event.code];
    if (!action) return;
    release(action);
  });

  global.Input = {
    isDown: function (action) {
      return active.has(action);
    },
    axisX: function () {
      let axis = 0;
      if (active.has('left')) axis -= 1;
      if (active.has('right')) axis += 1;
      return axis;
    },
    axisY: function () {
      return active.has('down') ? 1 : 0;
    },
    onGo: function (handler) {
      goHandlers.push(handler);
    },
    bindButton: function (element, action) {
      element.addEventListener('pointerdown', function (event) {
        event.preventDefault();
        element.classList.add('is-pressed');
        press(action);
      });

      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (type) {
        element.addEventListener(type, function () {
          element.classList.remove('is-pressed');
          release(action);
        });
      });

      element.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });
    }
  };
})(window);
