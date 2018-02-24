'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardNames = window.constants.WIZARD_NAMES.slice(0);
  var wizardSurnames = window.constants.WIZARD_SURNAMES.slice(0);
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').
      content.querySelector('.setup-similar-item');

  // /**
  //  * создает массив объектов - волшебников
  //  * @param  {array} wizardsNames      массив имен волшебников
  //  * @param  {array} wizardsSurnames   массив фамилий волшебников
  //  * @param  {array} wizardsCoatColors массив цветов глаз волшебников
  //  * @param  {array} wizardsEyesColors массив цветов одежды волшебников
  //  * @return {array.<Object>}          массив готовых объектов
  //  */
  // var createWizards = function (wizardsNames, wizardsSurnames, wizardsCoatColors, wizardsEyesColors) {
  //   var wizards = [];
  //   for (var i = 0; i < wizardsNames.length; i++) {
  //     wizards[i] = {
  //       name: (window.util.getUniqueELement(wizardsNames) + ' ' + window.util.getUniqueELement(wizardsSurnames)),
  //       colorCoat: window.util.getRandomElement(wizardsCoatColors),
  //       colorEyes: window.util.getRandomElement(wizardsEyesColors)
  //     };
  //   }
  //   return wizards;
  // };

  // var wizards = createWizards(wizardNames, wizardSurnames, window.constants.WIZARD_COAT_COLORS, window.constants.WIZARD_EYES_COLORS);

  document.querySelector('.setup-similar').classList.remove('hidden');

  /**
   * создает элемент с похожим волшебником в шаблон
   * @param {string} wizard свойства волшебника
   * @return {Element}
   */
  var insertWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.constants.wizardsNumb; i++) {
      fragment.appendChild(insertWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // перетаскивание элементов
  var shop = setup.querySelector('.setup-artifacts-shop');
  var boxItem = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

  /**
   * обработчик событий при старте перетаскивания
   * @param  {Object} evt объект событий
   */
  var onDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      event.dataTransfer.effectAllowed = 'copy';
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  };

  /**
   * обработчик событий при старте перетаскивания
   * @param  {Object} evt объект событий
   */
  var onDragOver = function (evt) {
    evt.preventDefault();
    return false;
  };

  /**
   * обработчик событий при входе в зону броска
   * @param  {Object} evt объект событий
   */
  var onDragEnter = function (evt) {
    evt.target.classList.add('over');
      evt.preventDefault();
  };

  /**
   * обработчик событий при оставлении зоны броска
   * @param  {Object} evt объект событий
   */
  var onDragLeave = function (evt) {
    evt.target.classList.remove('over');
    evt.preventDefault();
  };

  /**
   * обработчик событий при броске
   * @param  {Object} evt объект событий
   */
  var onDrop = function (evt) {
    evt.target.classList.remove('over');
      if (draggedItem !== evt.target) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      }
    evt.preventDefault();
  };

  shop.addEventListener('dragstart', onDragStart);
  boxItem.addEventListener('dragenter', onDragEnter);
  boxItem.addEventListener('dragover', onDragOver);
  boxItem.addEventListener('dragleave', onDragLeave);
  boxItem.addEventListener('drop', onDrop);
})();
