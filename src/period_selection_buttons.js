var PeriodSelectionButtons = function(buttons, dateRange, config) {
  this.$buttons = $(buttons);
  this.config = config;
  this.dateRange = dateRange;
  this.$buttons.on('click', this._buttonSelector('week'), _.bind(this._useWeek, this));
  this.$buttons.on('click', this._buttonSelector('month'), _.bind(this._useMonth, this));
  this.$buttons.on('click', this._buttonSelector('year'), _.bind(this._useYear, this));
};

PeriodSelectionButtons.prototype._useWeek = function() {
  this._highlightOnlyButton("week");
  this.dateRange.useWeek();
};

PeriodSelectionButtons.prototype._useMonth = function() {
  this._highlightOnlyButton("month");
  this.dateRange.useMonth();
};

PeriodSelectionButtons.prototype._useYear = function() {
  this._highlightOnlyButton("year");
  this.dateRange.useYear();
};

PeriodSelectionButtons.prototype._highlightOnlyButton = function(period) {
  this._downPlayAllButtons();
  this._highlightButton(period);
};

PeriodSelectionButtons.prototype._highlightButton = function(period) {
  this.$buttons.find(this._buttonSelector(period))
    .addClass(this.config.activePeriodCssClass);
};

PeriodSelectionButtons.prototype._downPlayAllButtons = function() {
  var activePeriodCssClass = this.config.activePeriodCssClass;
  _.each(
    this.$buttons.find('button'),
    function(elem) {
      $(elem).removeClass(activePeriodCssClass);
    }
  );
};

PeriodSelectionButtons.prototype._buttonSelector = function(period) {
  return '.' + this.config.buttonsSelectors[period];
};
