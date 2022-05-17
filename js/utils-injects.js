// busuanzi
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

// ip
!(function () {
  const ip = document.querySelector(".access-ip");
  try {
    ip.innerText = `当前访问IP: ${returnCitySN["cip"]} ${returnCitySN["cname"]}`;
    ip.style.display = "block";
  } catch (error) {
    console.error(
      "Script 加载失败：GET“https://pv.sohu.com/cityjson?ie=utf-8”。",
      error
    );

    fetch("https://ipapi.co/ip/")
      .then(function (response) {
        response.text().then((txt) => {
          ip.innerText = `当前访问IP: ${txt}`;
          ip.style.display = "block";
        });
      })
      .catch(function (error) {
        console.error("Fetch 加载失败：GET“https://ipapi.co/ip/”。", error);
      });
  }
})();

// runtime
!(function () {
  addRunTime();

  function addRunTime() {
    // 建站时间
    const since = "2020-05-01 12:00:00";

    const dateNow = moment(new Date());
    const dateSince = moment(since);
    const dateDiff = moment.duration(dateNow.diff(dateSince));
    const dateInterval = dateDiff._data;

    // 前导 0
    for (let key in dateInterval) {
      dateInterval[key] =
        dateInterval[key] < 10
          ? "0" + dateInterval[key]
          : "" + dateInterval[key];
    }
    // 添加
    const runtime = document.querySelector(".runtime");
    runtime.innerText = `本站已重建 ${dateInterval.years} 年 ${dateInterval.months} 个月 ${dateInterval.days} 天 ${dateInterval.hours} 小时 ${dateInterval.minutes} 分 ${dateInterval.seconds} 秒`;
  }

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
  customizeSetInterval(addRunTime, 1000);
})();

// pjax - busuanzi
!(function () {
  document.addEventListener("pjax:success", function () {
    const ibruce = document.querySelector("#busuanzi-script");
    const busuanzi = document.createElement("script");
    busuanzi.setAttribute("src", ibruce.getAttribute("src"));
    busuanzi.setAttribute("async", true);
    busuanzi.setAttribute("id", ibruce.getAttribute("id"));
    document.body.replaceChild(busuanzi, ibruce);
    console.log("pjax:complete");
  });
})();
