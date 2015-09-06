'use strict';

var calendar = calendar || {};

calendar.periodsUsingMoment = (function() {
  var DAYS = "days",
    YEARS = "years",
    MONTHS = "months",
    WEEKS = "weeks";

  return {
    Month: createClassInitializedBy(createMonth),
    Year: createClassInitializedBy(createYear),
    Week: createClassInitializedBy(createWeek)
  };

  function createMonth() {
    var aMonth = {
      rangeFor: rangeBetween(
        dateOf(firstDayOfMonth), dateOf(lastDayOfMonth)
      ),
      nextDate: dateOf(ahead(1, MONTHS)),
      previousDate: dateOf(back(1, MONTHS))
    };
    return aMonth;
  }

  function createWeek() {
    var aWeek = {
      rangeFor: rangeBetween(
        dateOf(firstDayOfWeek), dateOf(lastDayOfWeek)
      ),
      nextDate: dateOf(ahead(1, WEEKS)),
      previousDate: dateOf(back(1, WEEKS))
    };
    return aWeek;
  }

  function createYear() {
    var aYear = {
      rangeFor: rangeBetween(
        dateOf(firstDayOfYear), dateOf(lastDayOfYear)
      ),
      nextDate: dateOf(ahead(1, YEARS)),
      previousDate: dateOf(back(1, YEARS))
    };
    return aYear;
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
