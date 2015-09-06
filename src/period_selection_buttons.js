'use strict';

var calendar = calendar || {};

calendar.PeriodSelectionButtons = (function() {
  return {
    create: create
  };

  function create(buttons, dateRange, config) {
    var self = {
      $buttons: $(buttons),
      config: config,
      dateRange: dateRange
    };

    self.$buttons.on('click', buttonSelector('week'), useWeek);
    self.$buttons.on('click', buttonSelector('month'), useMonth);
    self.$buttons.on('click', buttonSelector('year'), useYear);

    return self;

    function useWeek() {
      highlightOnlyButton("week");
      self.dateRange.useWeek();
    }

    function useMonth() {
      highlightOnlyButton("month");
      self.dateRange.useMonth();
    }

    function useYear() {
      highlightOnlyButton("year");
      self.dateRange.useYear();
    }

    function highlightOnlyButton(period) {
      downPlayAllButtons();
      highlightButton(period);
    }

    function highlightButton(period) {
      self.$buttons.find(buttonSelector(period))
        .addClass(self.config.activePeriodCssClass);
    }

    function downPlayAllButtons() {
      var activePeriodCssClass = self.config.activePeriodCssClass;
      _.each(
        self.$buttons.find('button'),
        function(elem) {
          $(elem).removeClass(activePeriodCssClass);
        }
      );
    }

    function buttonSelector(period) {
      return '.' + self.config.buttonsSelectors[period];
    }
  }
})();
