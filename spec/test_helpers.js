'use strict';

function clickOn(buttons, buttonSelector) {
  buttons.find(buttonSelector).click()
}

function onlyHasCssClass(css_class, selector_key, selectors_by_key, buttons) {
  expect(
    buttonWith(selector_key).hasClass(css_class)
  ).toBeTruthy();

  _.each(
    otherButtonsKeys(),
    function(key) {
      expect(
        buttonWith(key).hasClass(css_class)
      ).toBeFalsy();
    }
  );

  function buttonWith(key) {
    return buttons.find('.' + selectors_by_key[key]);
  }

  function otherButtonsKeys() {
    return _.filter(
      _.keys(selectors_by_key),
      function(key) {
        return key !== selector_key
      }
    );
  }
}

function makeClickOnButtonFn(buttons, buttonsSelectors) {
  return function(period) {
    clickOn(buttons, '.' + buttonsSelectors[period]);
  };
}
