printIP();
function printIP() {
  fetch("https://ipapi.co/json/").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const ip = data.ip;
        let foot = document.getElementsByClassName("footer-inner")[0];
        let node = document.createElement("div");
        node.setAttribute("class", "ip");
        node.innerHTML = "本次访问IP: " + ip;
        if (foot) {
          foot.appendChild(node);
        }
        return ip;
      });
    }
  });
}
