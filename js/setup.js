'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var wizardNames = WIZARD_NAMES.slice(0);
var wizardSurnames = WIZARD_SURNAMES.slice(0);

var setup = document.querySelector('.setup');


/**
 * забирает из массива случайный элемент
 * @param {array} array массив значений
 * @return {*}
 */
var getRandomElement = function (array) {
  var randomElementIndex = Math.floor(Math.random() * array.length);
  return array[randomElementIndex];
};

/**
 * забирает из массива случайный уникальный элемент
 * @param {array} array массив значений
 * @return {*}
 */
var getUniqueELement = function (array) {
  var randomElementIndex = Math.floor(Math.random() * array.length);
  return array.splice(randomElementIndex, 1);
};

/**
 * создает массив объектов - волшебников
 * @param  {array} wizardsNames      массив имен волшебников
 * @param  {array} wizardsSurnames   массив фамилий волшебников
 * @param  {array} wizardsCoatColors массив цветов глаз волшебников
 * @param  {array} wizardsEyesColors массив цветов одежды волшебников
 * @return {array.<Object>}          массив готовых объектов
 */
var createWizards = function (wizardsNames, wizardsSurnames, wizardsCoatColors, wizardsEyesColors) {
  var wizards = [];
  for (var i = 0; i < wizardsNames.length; i++) {
    wizards[i] = {
      name: (getUniqueELement(wizardsNames) + ' ' + getUniqueELement(wizardsSurnames)),
      coatColor: getRandomElement(wizardsCoatColors),
      eyesColor: getRandomElement(wizardsEyesColors)
    };
  }
  return wizards;
};

var wizards = createWizards(wizardNames, wizardSurnames, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').
    content.querySelector('.setup-similar-item');

/**
 * создает элемент с похожим волшебником в шаблон
 * @param {string} wizard свойства волшебника
 * @return {Element}
 */
var insertWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(insertWizard(wizards[i]));
}
similarListElement.appendChild(fragment);


setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

/**
 * закрывает окно диалога
 * @param  {Object} evt объект событий
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', onPopupEnterPress);

/**
 * меняет цвет по клику на выбранном элементе волшебника
 * @param  {Element} elem  элемент разметки
 * @param  {array} color массив цветовых значений
 */
var changeElementColor = function (elem, color) {
  elem.addEventListener('click', function () {
    var elementColor = getRandomElement(color);
    this.style.backgroundColor = elementColor;
    this.style.fill = elementColor;
  });
};

changeElementColor(wizardCoat, WIZARD_COAT_COLORS);
changeElementColor(wizardEyes, WIZARD_EYES_COLORS);
changeElementColor(fireballWrap, FIREBALL_COLORS);
