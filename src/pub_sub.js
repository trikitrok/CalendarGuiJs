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
    }
  };
  return api;
})();
