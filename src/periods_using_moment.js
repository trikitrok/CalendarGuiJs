'use strict';

var periodsUsingMoment = (function() {
  var DAYS = "days",
    YEARS = "years",
    MONTHS = "months",
    WEEKS = "weeks";

  return {
    Month: Month,
    Year: Year,
    Week: Week
  };

  function Month() {
    this.rangeFor = rangeBetween(
      dateOf(firstDayOfMonth), dateOf(lastDayOfMonth)
    );
    this.nextDate = dateOf(ahead(1, MONTHS));
    this.previousDate = dateOf(back(1, MONTHS));
  }

  function Week() {
    this.rangeFor = rangeBetween(
      dateOf(firstDayOfWeek), dateOf(lastDayOfWeek)
    );
    this.nextDate = dateOf(ahead(1, WEEKS));
    this.previousDate = dateOf(back(1, WEEKS));
  }

  function Year() {
    this.rangeFor = rangeBetween(
      dateOf(firstDayOfYear), dateOf(lastDayOfYear)
    );
    this.nextDate = dateOf(ahead(1, YEARS));
    this.previousDate = dateOf(back(1, YEARS));
  }

  function dateOf(fn) {
    return function(date) {
      return fn(date).toDate();
    };
  }

  function rangeBetween(getStartDate, getEndDate) {
    return function(date) {
      return {
        startDate: getStartDate(date),
        endDate: getEndDate(date)
      };
    };
  }

  function firstDayOfYear(date) {
    return moment(date).dayOfYear(1);
  }

  function lastDayOfYear(date) {
    return firstDayOfYear(date).add(1, YEARS).add(-1, DAYS);
  }

  function firstDayOfWeek(date) {
    return moment(date).day("Monday");
  }

  function lastDayOfWeek(date) {
    return firstDayOfWeek(date).add(6, DAYS);
  }

  function firstDayOfMonth(date) {
    return moment(date).date(1);
  }

  function lastDayOfMonth(date) {
    var daysInMonth = moment(date).daysInMonth();
    return firstDayOfMonth(date).add(daysInMonth - 1, DAYS);
  }

  function ahead(num, period) {
    return function(date) {
      return moment(date).add(num, period);
    };
  }

  function back(num, period) {
    return function(date) {
      return moment(date).add(-num, period);
    };
  }
})();
