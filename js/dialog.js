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
   * обработчик закрытия окна диалога по ESC,
   * если поле заполнения имени персонажа в фокусе - отмена закрытия
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

  /**
   * закрытие окна настроек по Enter, если
   * фокус на крестике
   * @param  {Object} evt [description]
   */
  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      closePopup();
    }
  };

  /**
   * показывает окно настроек
   */
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
   * закрывает окно настроек,
   * делает сброс в начальную позицию окна
   */
  var closePopup = function () {
    setup.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.util.resetPosition(setup);
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

  var form = setup.querySelector('.setup-wizard-form');
  var onSubmit = function (evt) {
    window.backend.save(new FormData(form), function (response) {
      closePopup();
    });
    evt.preventDefault();
  };
  form.addEventListener('submit', onSubmit);
  // form.removeEventListener('submit', onSubmit);

  setupClose.addEventListener('keydown', onPopupEnterPress);
  setupClose.removeEventListener('keydown', onPopupEnterPress);

  window.colorize(wizardCoat, window.constants.WIZARD_COAT_COLORS);
  window.colorize(wizardEyes, window.constants.WIZARD_EYES_COLORS);
  window.colorize(fireballWrap, window.constants.FIREBALL_COLORS);

  //  module5-task2
  var dialogHandler = setup.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    /**
     * обработчик событий при движении мыши
     * @param  {Object} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    /**
     * обработчик событий при отпускании мыши
     * @param  {[type]} upEvt [description]
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
