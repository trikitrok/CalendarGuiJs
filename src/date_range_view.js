'use strict';

var calendar = calendar || {};

calendar.DateRangeView = (function() {
  return {
    create: create
  };

  function create(elem) {
    var self = {
      $elem: $(elem),
      render: render
    };

    pubsub.subscribe(
      CustomEvents.DateRangeChanged,
      function(event, dateRange) {
        render(dateRange);
      }
    );

    return self;

    function render(dateRange) {
      $('<li>', {
        text: dateRange.start
      }).appendTo(self.$elem);

      $('<li>', {
        text: dateRange.end
      }).appendTo(self.$elem);
    }
  }
})();
