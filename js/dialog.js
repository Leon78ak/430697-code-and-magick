'use strict';

(function () {
  var setup = document.querySelector('.setup');
  setup.querySelector('.setup-similar').classList.remove('hidden');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');

  userNameInput.addEventListener('invalid', function () {
    window.util.validateInput(userNameInput);
  });

  /**
   * обработчик закрытия окна диалога по ESC
   * @param  {[type]} evt [description]
   */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      if (document.activeElement === userNameInput) {
        evt.stopPropagation();

        return;
      }
      closePopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
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
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', onPopupEnterPress);

  window.colorize(wizardCoat, window.constants.WIZARD_COAT_COLORS);
  window.colorize(wizardEyes, window.constants.WIZARD_EYES_COLORS);
  window.colorize(fireballWrap, window.constants.FIREBALL_COLORS);

})();
