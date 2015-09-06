'use strict';

describe("Date Range view", function() {
  var $ul, dateRangeView;

  beforeEach(function() {
    $ul = $("<ul></ul>");
    dateRangeView = new calendar.DateRangeView($ul);
  });

  it("is created showing neither start nor end date", function() {
    expect($ul.find('li').length).toBe(0);
  });

  it("sets both the start and end date", function() {
    var dateRange = {
      start: "2014-12-22",
      end: "2014-12-28"
    };

    dateRangeView.render(dateRange);

    expect($ul.find('li').length).toBe(2);
    expect($ul.find('li').first().html()).toBe("2014-12-22");
    expect($ul.find('li').first().next().html()).toBe("2014-12-28");
  });

  it("changes its start and end date when it listens a date-range-changed event", function() {
    var dateRange = {
      start: "2011-02-07",
      end: "2011-02-13"
    };

    pubsub.publish(CustomEvents.DateRangeChanged, dateRange);

    expect($ul.find('li').length).toBe(2);
    expect($ul.find('li').first().html()).toBe(dateRange.start);
    expect($ul.find('li').first().next().html()).toBe(dateRange.end);
  });
});
