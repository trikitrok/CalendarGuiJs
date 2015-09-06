var DateRangeView = function(elem) {
  var self = this;
  this.$elem = $(elem);
  $(document).on('DateRangeChanged', function(event, dateRange) {
    self.render(dateRange);
  });
};

DateRangeView.prototype.render = function(dateRange) {
  $('<li>', {
    text: dateRange.start
  }).appendTo(this.$elem);

  $('<li>', {
    text: dateRange.end
  }).appendTo(this.$elem);
};
