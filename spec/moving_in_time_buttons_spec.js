describe("Moving-in-time buttons", function() {
  var $movingInTimeButtons,
    dateRange,
    movingInTimeButtons,
    config = {
      buttonsSelectors: {
        next: 'week-btn',
        current: 'month-btn',
        previous: 'year-btn'
      },
    },
    next = "next",
    current = "current",
    previous = "previous";

  beforeEach(function() {
    $movingInTimeButtons = $(
      "<ul>" +
      "<li> <button class='" + config.buttonsSelectors.next + "'>Next</button> </li>" +
      "<li> <button class='" + config.buttonsSelectors.current + "'>Current</button> </li>" +
      "<li> <button class='" + config.buttonsSelectors.previous + "'>Previous</button> </li>" +
      "</ul>"
    );
    dateRange = new DateRange();
    movingInTimeButtons = new MovingInTimeButtons(
      $movingInTimeButtons, dateRange, config
    );
    clickOnButton = makeClickOnButtonFn($movingInTimeButtons, config.buttonsSelectors);
  });

  it("tells the date range to move to the next period when the next button is clicked", function() {
    spyOn(dateRange, next);

    clickOnButton(next);

    expect(dateRange.next).toHaveBeenCalled();
  });

  it("tells the date range to move to the current period when the current button is clicked", function() {
    spyOn(dateRange, current);

    clickOnButton(current);

    expect(dateRange.current).toHaveBeenCalled();
  });

  it("tells the date range to move to the previous period when the previous button is clicked", function() {
    spyOn(dateRange, previous);

    clickOnButton(previous);

    expect(dateRange.previous).toHaveBeenCalled();
  });
});
