'use strict';

var getClockInstance = function() {
  return {
    currentDate: function() {
      return new Date();
    }
  };
}
