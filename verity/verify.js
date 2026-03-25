// 状态变量
let isVerified = false;
let selectedCount = 0;

// 获取元素
const verifyLayer = document.querySelector('.verify-layer');
const checkBoxBorder = document.querySelector('.verify-check-box-border');
const spinner = document.querySelector('.spinner');
const tickBox = document.querySelector('.tick-box');
const validationText = document.getElementById('validation');

// 1. 点击复选框
function onOpenverify() {
    const account = document.getElementById('account').value;
    const pass = document.getElementById('password').value;
    if (!account || !pass) {
        alert("请先输入账号和密码");
        return;
    }
    if (isVerified) return;
    checkBoxBorder.classList.add('close');
    spinner.classList.remove('close');
    setTimeout(() => {
        spinner.classList.add('close');
        checkBoxBorder.classList.remove('close');
        verifyLayer.classList.remove('close');
    }, 800);
}

// 2. 图片点击选中逻辑
document.querySelectorAll('.image-box').forEach(box => {
    box.addEventListener('click', function() {
        const img = this.querySelector('.img');
        const ico = this.querySelector('.checked-ico');
        if (img.classList.contains('checked')) {
            img.classList.remove('checked');
            ico.classList.remove('checked');
            selectedCount--;
        } else {
            img.classList.add('checked');
            ico.classList.add('checked');
            selectedCount++;
        }
    });
});

// 3. 点击验证层里的"验证"按钮
function onCheckverify() {
    if (selectedCount === 0) {
        alert("请选择符合描述的图片");
        return;
    }
    verifyLayer.classList.add('close');
    checkBoxBorder.classList.add('close');
    tickBox.classList.remove('close');
    isVerified = true;
    validationText.innerText = "身份已确认";
    validationText.style.color = "#20af46";
}

// 4. 最终登录按钮
async function finalLogin() {
    const isTickVisible = !document.querySelector('.tick-box').classList.contains('close');
    if (!isTickVisible) {
        alert("请先完成人机身份验证");
        return;
    }

    const account = document.getElementById('account').value.trim();
    const password = document.getElementById('password').value.trim();

    // 检查账号密码是否为空
    if (!account || !password) {
        alert("请输入账号和密码");
        return;
    }

    try {
        const response = await fetch('./users.txt');
        if (!response.ok) throw new Error("找不到用户文件");
        const text = await response.text();

        // 解析账号密码（每行格式：账号:密码）
        const users = text.trim().split('\n').map(line => {
            const [u, p] = line.split(':');
            return { username: u?.trim(), password: p?.trim() };
        });

        const match = users.find(u => u.username === account && u.password === password);

        if (match) {
            // 登录成功
            document.querySelector('.login-card').style.opacity = '0';
            document.querySelector('.login-card').style.transition = '0.5s';
            setTimeout(() => {
                window.location.replace("https://rueyyuan.github.io/yz/verity/index.html");
            }, 500);
        } else {
            alert("账号或密码错误");
        }

    } catch (err) {
        alert("验证失败：" + err.message);
    }
}

// 点击空白处关闭弹窗
window.addEventListener('click', (e) => {
    if (!verifyLayer.contains(e.target) && !checkBoxBorder.contains(e.target)) {
        verifyLayer.classList.add('close');
    }
});
