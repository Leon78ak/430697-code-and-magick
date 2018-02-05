'use srict';

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

var wizards = [];

var wizardsNames = WIZARD_NAMES.slice(0);
var wizardsSurnames = WIZARD_SURNAMES.slice(0);
var wizardsNumb = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

/**
 * получает случайный элемент массива
 * @param  {array} array массив значений
 * @return
 */
var getRandomElement = function (array) {
  var randomElementIndex = Math.floor(Math.random() * array.length);
  return array[randomElementIndex];
};

/**
 * получает случайный уникальный элемент массива
 * @param  {array} array массив значений
 * @return
 */
var getUniqueELement = function (array) {
  var randomElementIndex = Math.floor(Math.random() * array.length);
  return array.splice(randomElementIndex, 1);
};

/**
 * создает массив объектов свойств для отрисовки волшебника
 * @param  {number} players количество игроков
 * @return
 */
var createWizards = function (players) {
  for (var i = 0; i < players; i++) {
    wizards[i] = {
      name: (getUniqueELement(wizardsNames) + ' ' + getUniqueELement(wizardsSurnames)),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
    };
  }
};

createWizards(wizardsNumb);

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').
    content.querySelector('.setup-similar-item');


/**
 * создает элемент с похожим волшебником в шаблон
 * @param  {string} wizard свойства волшебника
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
  fragment.appendChild(insertWizard (wizards[i]));
}
similarListElement.appendChild(fragment);


userDialog.querySelector('.setup-similar').classList.remove('hidden');
