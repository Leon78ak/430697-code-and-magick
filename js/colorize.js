'use strict';

(function () {
  /**
   * меняет цвет по клику на выбранном элементе волшебника
   * @param  {Element} elem  элемент разметки
   * @param  {array} color массив цветовых значений
   */
  window.colorize = function (elem, color) {
    elem.addEventListener('click', function (evt) {
      var elementColor = window.util.getRandomElement(color);
      evt.target.style.backgroundColor = elementColor;
      evt.target.style.fill = elementColor;
    });
  };
})();

