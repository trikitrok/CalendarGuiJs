'use strict';

describe("Period selection buttons", function() {
  var $periodButtons,
    fakeDateRange,
    periodButtons,
    clickOnButton,
    config = {
      activePeriodCssClass: "current-selected-period",
      buttonsSelectors: {
        week: 'week-btn',
        month: 'month-btn',
        year: 'year-btn'
      }
    },
    year = "year",
    month = "month",
    week = "week";

  beforeEach(function() {
    $periodButtons = $(
      "<ul>" +
      "<li> <button class='" + config.buttonsSelectors.week + "'>Week</button> </li>" +
      "<li> <button class='" + config.buttonsSelectors.month + "'>Month</button> </li>" +
      "<li> <button class='" + config.buttonsSelectors.year + "'>Year</button> </li>" +
      "</ul>"
    );
    fakeDateRange = {
      useWeek: function() {},
      useMonth: function() {},
      useYear: function() {},
    };
    periodButtons = new calendar.PeriodSelectionButtons(
      $periodButtons, fakeDateRange, config
    );
    clickOnButton = makeClickOnButtonFn($periodButtons, config.buttonsSelectors);
  });

  it("activates only the week period when the week button is clicked", function() {
    clickOnButton(week);

    onlyHasCssClass(config.activePeriodCssClass, week, config.buttonsSelectors, $periodButtons);
  });

  it("activates only the month period when the month button is clicked", function() {
    clickOnButton(month);

    onlyHasCssClass(config.activePeriodCssClass, month, config.buttonsSelectors, $periodButtons);
  });

  it("activates only the year period when the year button is clicked", function() {
    clickOnButton(year);

    onlyHasCssClass(config.activePeriodCssClass, year, config.buttonsSelectors, $periodButtons);
  });

  it("activates only the period corresponding to the last period button clicked", function() {
    clickOnButton(year);
    clickOnButton(week);
    clickOnButton(month);

    onlyHasCssClass(config.activePeriodCssClass, month, config.buttonsSelectors, $periodButtons);
  });

  it("tells the date range to use a week period when the week button is clicked", function() {
    spyOn(fakeDateRange, 'useWeek')

    clickOnButton(week);

    expect(fakeDateRange.useWeek).toHaveBeenCalled();
  });

  it("tells the date range to use a month period when the month button is clicked", function() {
    spyOn(fakeDateRange, 'useMonth')

    clickOnButton(month);

    expect(fakeDateRange.useMonth).toHaveBeenCalled();
  });

  it("tells the date range to use a year period when the year button is clicked", function() {
    spyOn(fakeDateRange, 'useYear')

    clickOnButton(year);

    expect(fakeDateRange.useYear).toHaveBeenCalled();
  });
});
