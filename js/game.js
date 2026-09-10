(function (global) {
  'use strict';

  const FIELD_SIZE = 480;
  const SPEED = 260;
  const PLAYER_SIZE = 48;

  function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = FIELD_SIZE;
    this.running = false;
    this.frameId = 0;
    this.lastTime = 0;
    this.score = 0;
    this.player = { x: FIELD_SIZE / 2, y: FIELD_SIZE / 2, size: PLAYER_SIZE };
    this.onScoreChange = null;
    this.loop = this.loop.bind(this);
  }

  Game.prototype.go = function () {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.loop);
  };

  Game.prototype.stop = function () {
    this.running = false;
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  };

  Game.prototype.loop = function (time) {
    if (!this.running) return;
    const delta = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.update(delta);
    this.render();
    this.frameId = requestAnimationFrame(this.loop);
  };

  Game.prototype.update = function (delta) {
    const player = this.player;
    const half = player.size / 2;
    player.x += global.Input.axisX() * SPEED * delta;
    player.y += global.Input.axisY() * SPEED * delta;
    player.x = Math.min(Math.max(player.x, half), this.size - half);
    player.y = Math.min(Math.max(player.y, half), this.size - half);
  };

  Game.prototype.resize = function () {
    const ratio = global.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const side = Math.round(Math.min(rect.width, rect.height) * ratio);
    if (side > 0 && this.canvas.width !== side) {
      this.canvas.width = side;
      this.canvas.height = side;
    }
    this.render();
  };

  Game.prototype.render = function () {
    const ctx = this.ctx;
    const player = this.player;
    const scale = this.canvas.width / this.size;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    ctx.fillStyle = '#4cc2ff';
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
  };

  Game.prototype.setScore = function (value) {
    this.score = value;
    if (this.onScoreChange) this.onScoreChange(value);
  };

  global.Game = Game;
})(window);
