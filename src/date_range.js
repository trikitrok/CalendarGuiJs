'use strict';

var calendar = calendar || {};

calendar.DateRange = createClassInitializedBy(
  function create(clock, periods) {
    var month = periods.Month.create(),
      week = periods.Week.create(),
      year = periods.Year.create(),
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
      pubsub.publish(CustomEvents.DateRangeChanged, dateRange);
    }

    function previous() {
      currentDate = period.previousDate(currentDate);
      dateRange = period.rangeFor(currentDate);
      pubsub.publish(CustomEvents.DateRangeChanged, dateRange);
    }

    function next() {
      currentDate = period.nextDate(currentDate);
      dateRange = period.rangeFor(currentDate);
      pubsub.publish(CustomEvents.DateRangeChanged, dateRange);
    }

    function updateRangeUsingNewPeriod(newPeriod) {
      period = newPeriod;
      dateRange = period.rangeFor(currentDate);
      pubsub.publish(CustomEvents.DateRangeChanged, dateRange);
    }
  }
);
