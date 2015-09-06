'use strict';

var CustomEvents = {
  DateRangeChanged: 'date-range-changed'
}

var pubsub = (function() {
  var api = {
    publish: function publish(event, payload) {
      $(document).trigger(event, payload);
    },
    subscribe: function subscribe(event, callbackFn) {
      $(document).on(event, callbackFn);
    },
    unsubscribeAll: function unsubscribeAll(event) {
      $(document).off(event);
    }
  };
  return api;
})();
