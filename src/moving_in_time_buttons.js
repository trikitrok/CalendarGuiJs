'use strict';

var calendar = calendar || {};

calendar.MovingInTimeButtons = function(buttons, dateRange, config) {
  this.$buttons = $(buttons);
  this.dateRange = dateRange;
  this.config = config;
  this.$buttons.on('click', this._buttonSelector('next'), _.bind(this._next, this));
  this.$buttons.on('click', this._buttonSelector('current'), _.bind(this._current, this));
  this.$buttons.on('click', this._buttonSelector('previous'), _.bind(this._previous, this));
};

calendar.MovingInTimeButtons.prototype._next = function() {
  this.dateRange.next();
};

calendar.MovingInTimeButtons.prototype._current = function() {
  this.dateRange.current();
};

calendar.MovingInTimeButtons.prototype._previous = function() {
  this.dateRange.previous();
};

calendar.MovingInTimeButtons.prototype._buttonSelector = function(period) {
  return '.' + this.config.buttonsSelectors[period];
};
