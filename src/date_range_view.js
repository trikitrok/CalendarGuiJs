'use strict';

var calendar = calendar || {};

calendar.DateRangeView = function(elem) {
  var self = this;
  this.$elem = $(elem);
  pubsub.subscribe(
    CustomEvents.DateRangeChanged,
    function(event, dateRange) {
      self.render(dateRange);
    }
  );
};

calendar.DateRangeView.prototype.render = function(dateRange) {
  $('<li>', {
    text: dateRange.start
  }).appendTo(this.$elem);

  $('<li>', {
    text: dateRange.end
  }).appendTo(this.$elem);
};
