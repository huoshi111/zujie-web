        let isMenuOpen = false;
        let isHomeActive = true; // 用于判断是否处于首页

        // 菜单切换函数
        function toggleMenu() {
            const funcButtons = document.querySelectorAll('.func-btn');
            const backBtn = document.getElementById('backBtn');
            const menuBtn = document.getElementById('menuBtn');

            isMenuOpen = !isMenuOpen;

            // 切换按钮文字
            menuBtn.textContent = isMenuOpen ? '隐藏导航' : '打开导航';

            // 切换功能按钮的显示状态
            funcButtons.forEach(btn => {
                btn.classList.toggle('show');
            });

            // 只有在菜单展开且非首页时显示返回按钮
            if (isMenuOpen && !isHomeActive) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        }

        // 显示内容函数
        function showContent(index) {
            // 关闭菜单
            if (isMenuOpen) toggleMenu();

            // 隐藏所有内容
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            // 显示目标内容
            const targetContent = document.getElementById(`content${index}`);
            targetContent.classList.add('active');

            // 更新状态为非首页
            isHomeActive = false;

            // 确保返回按钮隐藏（除非菜单展开）
            const backBtn = document.getElementById('backBtn');
            if (!isMenuOpen) {
                backBtn.classList.remove('show');
            }
        }

        // 返回首页函数
        function goBack() {
            // 关闭菜单
            if (isMenuOpen) toggleMenu();

            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('homeContent').classList.add('active');

            // 更新状态为首页
            isHomeActive = true;

            // 隐藏返回按钮
            const backBtn = document.getElementById('backBtn');
            backBtn.classList.remove('show');
        }


