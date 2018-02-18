'use strict';

(function () {

  window.util = {
    /**
     * выбирает случайное число из заданного диапазона
     * @param  {number} min минимальное
     * @param  {number} max максимальное
     * @return {number}
     */
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max - min);
      rand = Math.floor(rand) / 10;
      return rand;
    },
    /**
     * забирает из массива случайный элемент
     * @param {array} array массив значений
     * @return {*}
     */
    getRandomElement: function (array) {
      var randomElementIndex = Math.floor(Math.random() * array.length);
      return array[randomElementIndex];
    },
    /**
     * забирает из массива случайный уникальный элемент
     * @param {array} array массив значений
     * @return {*}
     */
    getUniqueELement: function (array) {
      var randomElementIndex = Math.floor(Math.random() * array.length);
      return array.splice(randomElementIndex, 1);
    },
    /**
     * проверяет валидность поля формы
     * @param  {Element} input поле формы для валидации
     */
    validateInput: function (input) {
      if (input.validity.tooShort) {
        input.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (input.validity.tooLong) {
        input.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле');
      } else {
        input.setCustomValidity('');
      }
    }
  };
})();
