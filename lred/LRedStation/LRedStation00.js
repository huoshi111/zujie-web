function showContent(id) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function() {
    showContent('war');
});

document.addEventListener("DOMContentLoaded", function () {
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

});

function toggleMenu() {
document.getElementById("navbar").classList.toggle("show");
};



    // 禁止右键菜单（只对视频元素）
    document.getElementById('myVideo').addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });

    // 禁止拖动视频文件
    document.getElementById('myVideo').addEventListener('dragstart', function(e) {
      e.preventDefault();
    });

    // 可选：防止用户通过快捷键尝试下载
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    });