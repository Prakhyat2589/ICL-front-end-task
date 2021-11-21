AOS.init({
  duration: 800,
  easing: "slide",
  once: true,
});

jQuery(document).ready(function ($) {
  "use strict";

  var searchFunction = function () {
    var input,
      filter,
      yearList,
      year,
      podcastList,
      i,
      input = document.getElementById("searchInput");
    $(input).keyup(function () {
      filter = input.value;
      yearList = document.getElementsByClassName("year");
      podcastList = document.getElementsByClassName("podcast-entry");

      for (i = 0; i < yearList.length; i++) {
        year = yearList[i].textContent;
        if (year.indexOf(filter) > -1) {
          $(podcastList[i]).css({ display: "block" });
          if (!$(podcastList[i]).hasClass("filtered")) {
            $(podcastList[i]).addClass("filtered");
          }
        } else {
          $(podcastList[i]).css({ display: "none" });
          $(podcastList[i]).removeClass("filtered");
        }
      }
    });
  };

  searchFunction();

  var sortByName = function () {
    var sortName = document.getElementById("sortByName");

    $(sortName).click(function () {
      var i,
        switching,
        podcastList,
        shouldSwitch,
        dir,
        nameList,
        switchcount = 0;
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        podcastList = document.getElementsByClassName("filtered");
        nameList = document.getElementsByClassName("name");

        for (i = 0; i < podcastList.length - 1; i++) {
          shouldSwitch = false;
          if (dir === "asc") {
            if (
              nameList[i].textContent.toLowerCase() >
              nameList[i + 1].textContent.toLowerCase()
            ) {
              shouldSwitch = true;
              break;
            }
          } else if (dir === "desc") {
            if (
              nameList[i].textContent.toLowerCase() <
              nameList[i + 1].textContent.toLowerCase()
            ) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          $(nameList[i + 1].closest(".podcast-entry")).insertBefore(
            $(nameList[i]).closest(".podcast-entry")
          );

          switching = true;
          switchcount++;
        } else {
          if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    });
  };

  sortByName();
});
