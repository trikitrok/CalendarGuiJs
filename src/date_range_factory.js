'use strict';

var dateRangeFactory = (function() {
  var api = {};
  api.create = create;
  return api;

  function create(clock, periods) {
    var month = new periods.Month(),
      week = new periods.Week(),
      year = new periods.Year(),
      period = week,
      currentDate = clock.currentDate(),
      dateRange = period.rangeFor(currentDate),
      dateRangeObject = {
        startDate: function() {
          return dateRange.startDate;
        },
        endDate: function() {
          return dateRange.endDate;
        },
        useMonth: function() {
          updateRangeUsingNewPeriod(month);
        },
        useYear: function() {
          updateRangeUsingNewPeriod(year);
        },
        useWeek: function() {
          updateRangeUsingNewPeriod(week);
        },
        next: next,
        previous: previous,
        current: current
      };
    return dateRangeObject;

    function current() {
      currentDate = clock.currentDate();
      dateRange = period.rangeFor(currentDate);
    }

    function previous() {
      currentDate = period.previousDate(currentDate);
      dateRange = period.rangeFor(currentDate);
    }

    function next() {
      currentDate = period.nextDate(currentDate);
      dateRange = period.rangeFor(currentDate);
    }

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      dateRange = period.rangeFor(currentDate);
    }
  };
})();
