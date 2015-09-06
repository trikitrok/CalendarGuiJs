'use strict';

var expectsThat = (function() {
  return {
    dateRange: expectThatDateRange
  };

  function expectThatDateRange(dateRange) {
    return {
      startsOn: function(startDate) {
        return {
          andEndsOn: function(endDate) {
            var actualStartDate = getDate(dateRange, "startDate"),
              actualEndDate = getDate(dateRange, "endDate");
            expect(actualStartDate).toEqual(moment(startDate).toDate());
            expect(actualEndDate).toEqual(moment(endDate).toDate());
          }
        };
      }
    };

    function getDate(dateRange, dateType) {
      if (typeof dateRange[dateType] == 'function') {
        return dateRange[dateType]();
      } else {
        return dateRange[dateType];
      }
    }
  }
})();
