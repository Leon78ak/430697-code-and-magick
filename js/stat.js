'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var CLOUD_X_0 = 110;
var CLOUD_X_1 = CLOUD_X_0 + CLOUD_WIDTH / 2;
var CLOUD_X_2 = CLOUD_X_0 + CLOUD_WIDTH;
var CLOUD_X_3 = CLOUD_X_2 - GAP;
var CLOUD_X_4 = CLOUD_X_3 - GAP;
var CLOUD_X_5 = CLOUD_X_1;
var CLOUD_X_6 = CLOUD_X_0 + GAP * 2;
var CLOUD_X_7 = CLOUD_X_0 + GAP;
var CLOUD_Y_0 = 20;
var CLOUD_Y_1 = CLOUD_Y_0 - GAP;
var CLOUD_Y_2 = CLOUD_Y_0;
var CLOUD_Y_3 = CLOUD_Y_0 * 4;
var CLOUD_Y_4 = CLOUD_HEIGHT - GAP * 2;
var CLOUD_Y_5 = CLOUD_HEIGHT;
var CLOUD_Y_6 = CLOUD_Y_4;
var CLOUD_Y_7 = CLOUD_Y_3;
var TEXT_OFFSET = 20;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 120;
var BAR_OFFSET = 50;
var FONT_GAP = 20;

var shadowPoints = [
  [CLOUD_X_0 - GAP, CLOUD_Y_0 - GAP],
  [CLOUD_X_1, CLOUD_Y_1 - GAP],
  [CLOUD_X_2 + GAP, CLOUD_Y_0 - GAP],
  [CLOUD_X_3 + GAP, CLOUD_Y_3],
  [CLOUD_X_4 + GAP, CLOUD_Y_4 + GAP],
  [CLOUD_X_5, CLOUD_Y_5 + GAP],
  [CLOUD_X_6 - GAP, CLOUD_Y_6 + GAP],
  [CLOUD_X_7 - GAP, CLOUD_Y_7 + GAP],
  [CLOUD_X_0 - GAP, CLOUD_Y_0 - GAP]
];

var cloudPoints = [
  [CLOUD_X_0, CLOUD_Y_0],
  [CLOUD_X_1, CLOUD_Y_1],
  [CLOUD_X_2, CLOUD_Y_2],
  [CLOUD_X_3, CLOUD_Y_3],
  [CLOUD_X_4, CLOUD_Y_4],
  [CLOUD_X_5, CLOUD_Y_5],
  [CLOUD_X_6, CLOUD_Y_6],
  [CLOUD_X_7, CLOUD_Y_7],
  [CLOUD_X_0, CLOUD_Y_0]
];

/**
 * отрисовывает окно вывода результатов
 * @param  {[type]} ctx   канвас
 * @param  {array} arr   массив координат точек отрисовки
 * @param  {string} color цвет заливки
 */
var drawRect = function (ctx, arr, color) {
  var len = arr.length;

  ctx.beginPath();
  ctx.moveTo(arr[0][0], arr[0][1]);

  for (var i = 0; i < len; i++) {
    ctx.lineTo(arr[i][0], arr[i][1]);
  }

  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

/**
 * отрисовывает окно статистики
 * @param  {obj} ctx     canvas
 * @param  {array} players массив с именами игроков
 * @param  {array} times   массив времени прохождения игры
 */
window.renderStatistics = function (ctx, players, times) {
  drawRect(ctx, shadowPoints, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, cloudPoints, 'rgba(256, 256, 256, 1.0)');

  var message = 'Ура вы победили!\nСписок результатов:';
  var cloudCenter = CLOUD_X_0 + CLOUD_WIDTH / 2;

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  message.split('\n').forEach(function (line, i) {
    ctx.fillText(line, cloudCenter, CLOUD_Y_0 + GAP * 2 + TEXT_OFFSET * i);
  });

  var initGistX = CLOUD_X_6 + CLOUD_WIDTH / 10;
  var initGistY = CLOUD_HEIGHT - GAP * 3;
  var maxTime = Math.floor(Math.max.apply(Math, times));

  /**
   * выбирает случайное число из заданного диапазона
   * @param  {number} min минимальное
   * @param  {number} max максимальное
   * @return {number}
   */
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.floor(rand) / 10;
    return rand;
  };

  var sortedTimes = times.slice(0);
  sortedTimes.sort(function (first, second) {
    return second - first;
  });

  var renderColumnGist = function (players, times) {
    for (var i = 0; i < players.length; i++) {
      var initialNewColumnX = initGistX + (BAR_OFFSET + BAR_WIDTH) * i;
      var initialNewColumnY = initGistY - FONT_GAP;
      var barHeight = times[i] * GIST_HEIGHT / maxTime;
      var initialTimesY = initialNewColumnY - GAP - barHeight;

      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomInteger(1, 10) + ')';
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(initialNewColumnX, initialNewColumnY, BAR_WIDTH, -1 * barHeight);
      ctx.fillStyle = '#000';
      ctx.fillText(players[i], initialNewColumnX, initGistY);
      ctx.fillText(Math.floor(times[i]), initialNewColumnX, initialTimesY);
    }
  };

  renderColumnGist(players, sortedTimes);
};
