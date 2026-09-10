(function (global) {
  'use strict';

  const SPEED = 260;

  function Game(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.lastTime = 0;
    this.score = 0;
    this.player = { x: canvas.width / 2, y: canvas.height / 2, size: 24 };
    this.onScoreChange = null;
    this.loop = this.loop.bind(this);
  }

  Game.prototype.start = function () {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  };

  Game.prototype.pause = function () {
    this.running = false;
  };

  Game.prototype.loop = function (time) {
    if (!this.running) return;
    const delta = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.update(delta);
    this.render();
    requestAnimationFrame(this.loop);
  };

  Game.prototype.update = function (delta) {
    const player = this.player;
    const half = player.size / 2;
    player.x += global.Input.axisX() * SPEED * delta;
    player.y += global.Input.axisY() * SPEED * delta;
    player.x = Math.min(Math.max(player.x, half), this.canvas.width - half);
    player.y = Math.min(Math.max(player.y, half), this.canvas.height - half);
  };

  Game.prototype.render = function () {
    const ctx = this.ctx;
    const player = this.player;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#4cc2ff';
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
  };

  Game.prototype.setScore = function (value) {
    this.score = value;
    if (this.onScoreChange) this.onScoreChange(value);
  };

  global.Game = Game;
})(window);
