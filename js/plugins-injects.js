/* busuanzi */
!(function () {
  const parent = document.querySelector(".busuanzi");
  const child = document.querySelector("#busuanzi_value_site_uv");
  setTimeout(function timer(count = 5) {
    if (child.innerText) {
      parent.style.display = "block";
      return;
    }
    setTimeout(() => {
      if (count-- > 0) {
        timer(count);
      }
    }, count * 1000);
  }, 0);
})();

/* ip */
!(function () {
  const ip = document.querySelector(".access-ip");
  try {
    ip.innerText = `访问IP: ${returnCitySN["cip"]} ${returnCitySN["cname"]}`;
    ip.style.display = "block";
  } catch (error) {
    console.error(
      "Script 加载失败：GET“https://pv.sohu.com/cityjson?ie=utf-8”。",
      error
    );

    fetch("https://ipapi.co/ip/")
      .then(function (response) {
        response.text().then((txt) => {
          ip.innerText = `访问IP: ${txt}`;
          ip.style.display = "block";
        });
      })
      .catch(function (error) {
        console.error("Fetch 加载失败：GET“https://ipapi.co/ip/”。", error);
      });
  }
})();

/* runtime */
!(function () {
  // 引入 luxon 处理时间
  const DateTime = luxon.DateTime;
  // 缓存 DOM 查询
  const runtime = document.querySelector(".runtime");

  customizeSetInterval(addRunTime, 1000);

  function customizeSetInterval(fn, interval) {
    let startTime = Date.now();
    function loop() {
      let endTime = Date.now();
      let delay = endTime - startTime;
      if (delay >= interval) {
        startTime = endTime = Date.now();
        fn();
      }
      window.requestAnimationFrame(loop);
    }
    loop();
  }

  function addRunTime() {
    // 建站时间
    const since = "2020-05-01T12:00:00";
    // 固定时区，不受系统时区影响
    const timeZone = "Asia/Shanghai";

    const dateNow = DateTime.now().setZone(timeZone);
    const dateSince = DateTime.fromISO(since).setZone(timeZone);
    const dateInterval = dateNow
      .diff(dateSince, [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
      ])
      .toObject();

    runtime.innerText = `悠然前行${dateInterval.years}年${
      dateInterval.months
    }个月${dateInterval.days}天${dateInterval.hours}小时${
      dateInterval.minutes
    }分${
      dateInterval.seconds.toFixed() < 10
        ? "0" + dateInterval.seconds.toFixed()
        : dateInterval.seconds.toFixed()
    }秒`;
  }
})();

/* pjax - 修正 busuanzi 统计 */
!(function () {
  // 缓存 DOM 查询
  const ibruce = document.querySelector("#busuanzi-script");

  document.addEventListener("pjax:success", function (event) {
    const flag = new RegExp("posts", "g").test(event.target.URL);
    if (flag) {
      const busuanzi = document.createElement("script");
      busuanzi.setAttribute("src", ibruce.getAttribute("src"));
      busuanzi.setAttribute("async", true);
      busuanzi.setAttribute("id", ibruce.getAttribute("id"));
      document.body.replaceChild(busuanzi, ibruce);
    }
  });
})();
