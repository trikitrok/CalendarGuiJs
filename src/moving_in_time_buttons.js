'use strict';

var calendar = calendar || {};

calendar.MovingInTimeButtons = createClassInitializedBy(
  function create(buttons, dateRange, config) {
    var self = {
      $buttons: $(buttons),
      dateRange: dateRange,
      config: config
    };

    self.$buttons.on('click', buttonSelector('next'), next);
    self.$buttons.on('click', buttonSelector('current'), current);
    self.$buttons.on('click', buttonSelector('previous'), previous);

    return self;

    function next() {
      self.dateRange.next();
    }

    function current() {
      self.dateRange.current();
    }

    function previous() {
      self.dateRange.previous();
    }

    function buttonSelector(period) {
      return '.' + self.config.buttonsSelectors[period];
    }
  }
);
