/* utterances 评论插件 */
// 初始化
window.addEventListener("DOMContentLoaded", function () {
  query2add();
});
// pjax 使用 pushState() 不会触发 hashchange 事件，需要拦截
var _wr = function (type) {
  var orig = history[type];
  return function () {
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    // 注意事件监听在url变更方法调用之前 也就是在事件监听的回调函数中获取的页面链接为跳转前的链接
    var rv = orig.apply(this, arguments);
    return rv;
  };
};

history.pushState = _wr("pushState");

/* 监听 change 事件 */
window.addEventListener("pushState", function (e) {
  // e && e.arguments.length > 2 && e.arguments[2]
  query2add();
});

/* 加载 utterance 插件 */
function loadUtterance() {
  let js = document.createElement("script");
  js.setAttribute("src", "https://utteranc.es/client.js");
  js.setAttribute("repo", "Undeio/comments-of-blog");
  js.setAttribute("issue-term", "title");
  js.setAttribute("theme", "github-light");
  js.setAttribute("crossorigin", "anonymous");
  js.setAttribute("async", "async");
  document.getElementsByClassName("main-inner")[0].appendChild(js);
  console.log(js);
}

/* 是否已存在组件 */
function query2add() {
  let postCopyRight = document.getElementsByClassName("post-copyright");
  if (postCopyRight && postCopyRight[0]) {
    let utterances = document.getElementsByClassName("utterances");
    if (utterances && utterances[0]) {
      return;
    }
    loadUtterance();
  }
}
