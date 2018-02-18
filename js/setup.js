'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardNames = window.constants.WIZARD_NAMES.slice(0);
  var wizardSurnames = window.constants.WIZARD_SURNAMES.slice(0);
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').
      content.querySelector('.setup-similar-item');

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
        name: (window.util.getUniqueELement(wizardsNames) + ' ' + window.util.getUniqueELement(wizardsSurnames)),
        coatColor: window.util.getRandomElement(wizardsCoatColors),
        eyesColor: window.util.getRandomElement(wizardsEyesColors)
      };
    }
    return wizards;
  };

  var wizards = createWizards(wizardNames, wizardSurnames, window.constants.WIZARD_COAT_COLORS, window.constants.WIZARD_EYES_COLORS);

  document.querySelector('.setup-similar').classList.remove('hidden');

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
})();
