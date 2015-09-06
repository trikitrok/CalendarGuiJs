'use strict';

describe('DateRange', function() {
  var clock, dateRange;

  beforeEach(function() {
    clock = getClockInstance();
    spyOn(clock, 'currentDate').and.returnValue(moment("2014-11-11").toDate());
    dateRange = calendar.dateRangeFactory.create(clock, calendar.periodsUsingMoment);
  });

  describe('on creation', function() {
    it('should contain the current week', function() {
      expectsThat.dateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when a new period is selected', function() {
    it('should contain the current month in case of a month', function() {
      dateRange.useMonth();

      expectsThat.dateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
    });

    it('should contain the current year in case of a year', function() {
      dateRange.useYear();

      expectsThat.dateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
    });

    it('should contain the current week in case of a week', function() {
      dateRange.useYear();

      dateRange.useWeek();

      expectsThat.dateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });
  });

  describe('when moving to the next period', function() {
    it('should contain the next week in case of using a week period', function() {
      dateRange.next();

      expectsThat.dateRange(dateRange).startsOn("2014-11-17").andEndsOn("2014-11-23");
    });

    it('should contain the next month in case of using a month period', function() {
      dateRange.useMonth();

      dateRange.next();

      expectsThat.dateRange(dateRange).startsOn("2014-12-01").andEndsOn("2014-12-31");
    });

    it('should contain the next year in case of using a year period', function() {
      dateRange.useYear();

      dateRange.next();

      expectsThat.dateRange(dateRange).startsOn("2015-01-01").andEndsOn("2015-12-31");
    });
  });

  describe('when moving two periods ahead', function() {
    it('should contain the week after the next week in case of using a week period', function() {
      dateRange.next();
      dateRange.next();

      expectsThat.dateRange(dateRange).startsOn("2014-11-24").andEndsOn("2014-11-30");
    });
  });

  describe('when moving to the previous period', function() {
    it('should contain the previous week in case of using a week period', function() {
      dateRange.previous();

      expectsThat.dateRange(dateRange).startsOn("2014-11-03").andEndsOn("2014-11-09");
    });

    it('should contain the previous month in case of using a month period', function() {
      dateRange.useMonth();

      dateRange.previous();

      expectsThat.dateRange(dateRange).startsOn("2014-10-01").andEndsOn("2014-10-31");
    });

    it('should contain the previous year in case of using a year period', function() {
      dateRange.useYear();

      dateRange.previous();

      expectsThat.dateRange(dateRange).startsOn("2013-01-01").andEndsOn("2013-12-31");
    });
  });

  describe("when moving back to the current period", function() {
    function moveAwayFromCurrentDate(dateRange) {
      dateRange.previous();
      dateRange.previous();
      dateRange.previous();
      dateRange.previous();
      dateRange.next;
    }

    it('should contain the current week in case of using a week period', function() {
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectsThat.dateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
    });

    it('should contain the current month in case of using a month period', function() {
      dateRange.useMonth();
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectsThat.dateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
    });

    it('should contain the current year in case of using a year period', function() {
      dateRange.useYear();
      moveAwayFromCurrentDate(dateRange);

      dateRange.current();

      expectsThat.dateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
    });
  });

  describe("broadcasting that its state has changed", function() {
    var clock, dateRange;

    beforeEach(function() {
      clock = getClockInstance();
      spyOn(clock, 'currentDate').and.returnValue(moment("2014-11-11").toDate());
      dateRange = calendar.dateRangeFactory.create(clock, calendar.periodsUsingMoment);
    });

    it("emits a date-range-changed event when the period is set to a month", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-11-01").andEndsOn("2014-11-30");
        }
      );

      dateRange.useMonth();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });


    it("emits a date-range-changed event when the period is set to a week", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
        }
      );

      dateRange.useWeek();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });

    it("emits a date-range-changed event when the period is set to a year", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-01-01").andEndsOn("2014-12-31");
        }
      );

      dateRange.useYear();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });

    it("emits a date-range-changed event when it moves to the next period", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-11-17").andEndsOn("2014-11-23");
        }
      );

      dateRange.next();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });

    it("emits a date-range-changed event when it moves to the previous period", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-11-03").andEndsOn("2014-11-09");
        }
      );

      dateRange.previous();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });

    it("emits a date-range-changed event when it moves to the current period", function() {
      pubsub.subscribe(CustomEvents.DateRangeChanged,
        function(event, dateRange) {
          expectsThat.dateRange(dateRange).startsOn("2014-11-10").andEndsOn("2014-11-16");
        }
      );

      dateRange.current();

      pubsub.unsubscribeAll(CustomEvents.DateRangeChanged);
    });
  });
});
