// 在网站底部添加网站运行时间

const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

function intervalToDuration() {
  let result = Interval.fromDateTimes(
    DateTime.local(2016, 6, 9, 12, 0, 0),
    DateTime.local()
  )
    .toDuration(["years", "months", "days", "hours", "minutes", "seconds"])
    .toObject();

  let runtime = document.createElement("p");
  runtime.setAttribute("class", "runtime");
  runtime.innerHTML = `网站陆续运行${result.years}年${result.months}月${
    result.days
  }天${result.hours}时${result.minutes}分${parseInt(result.seconds)}秒`;

  return runtime;
}

function query2add() {
  window.setTimeout(query2add, 1000);
  let page = document.getElementsByClassName("runtime")[0];
  if (page) {
    document.getElementsByClassName("footer-inner")[0].removeChild(page);
  }
  document
    .getElementsByClassName("footer-inner")[0]
    .appendChild(intervalToDuration());
}

query2add();
