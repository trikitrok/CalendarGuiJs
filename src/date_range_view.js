'use strict';

var calendar = calendar || {};

calendar.DateRangeView = createClassInitializedBy(
  function create(elem) {
    var self = {
      $elem: $(elem),
      render: render
    };

    pubsub.subscribe(CustomEvents.DateRangeChanged, update);

    return self;

    function render(dateRange) {
      $('<li>', {
        text: dateRange.start
      }).appendTo(self.$elem);

      $('<li>', {
        text: dateRange.end
      }).appendTo(self.$elem);
    }

    function update(event, dateRange) {
      render(dateRange);
    }
  }
);
