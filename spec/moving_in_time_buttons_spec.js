describe("Moving-in-time buttons", function() {
  var $movingInTimeButtons,
    fakeDateRange,
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
    fakeDateRange = {
      next: function() {},
      current: function() {},
      previous: function() {},
    };
    movingInTimeButtons = new MovingInTimeButtons(
      $movingInTimeButtons, fakeDateRange, config
    );
    clickOnButton = makeClickOnButtonFn($movingInTimeButtons, config.buttonsSelectors);
  });

  it("tells the date range to move to the next period when the next button is clicked", function() {
    spyOn(fakeDateRange, next);

    clickOnButton(next);

    expect(fakeDateRange.next).toHaveBeenCalled();
  });

  it("tells the date range to move to the current period when the current button is clicked", function() {
    spyOn(fakeDateRange, current);

    clickOnButton(current);

    expect(fakeDateRange.current).toHaveBeenCalled();
  });

  it("tells the date range to move to the previous period when the previous button is clicked", function() {
    spyOn(fakeDateRange, previous);

    clickOnButton(previous);

    expect(fakeDateRange.previous).toHaveBeenCalled();
  });
});
