const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.createElement('p');
gameContainer.appendChild(timeDisplay);

let score = 0;
let gameDuration = 30; // Giới hạn thời gian chơi (30 giây)
let gameInterval;
let targetInterval;
let targetCount = 1; // Số mục tiêu xuất hiện mỗi giây
let startBtn = document.getElementById('startBtn');

// Hàm tạo mục tiêu mới
function createTargets() {
    for (let i = 0; i < targetCount; i++) {
        const target = document.createElement('div');
        target.classList.add('target');

        // Vị trí ngẫu nhiên
        const x = Math.random() * (gameContainer.offsetWidth - 50); // giá trị 50px là độ rộng của mục tiêu để tránh tràn ra ngoài vùng chơi
        const y = Math.random() * (gameContainer.offsetHeight - 50);

        target.style.left = `${x}px`;
        target.style.top = `${y}px`;

        // Khi click vào mục tiêu
        target.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngừng sự kiện lan truyền lên vùng gameContainer
            score++;
            scoreDisplay.textContent = score;
            target.remove(); // Xóa mục tiêu
        });

        // Tự động xóa mục tiêu sau 2 giây nếu không bắn
        setTimeout(() => {
            if (gameContainer.contains(target)) {
                target.remove();
            }
        }, 2000);

        gameContainer.appendChild(target);
    }
}

// Hàm cập nhật thời gian
function updateTime() {
    timeDisplay.textContent = `Thời gian: ${gameDuration}s`;
    gameDuration--;
    if (gameDuration < 0) {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
        alert('Thời gian hết! Bạn đã có ' + score + ' điểm.');
    }
}

// Khởi tạo trò chơi
function startGame() {
    gameInterval = setInterval(updateTime, 1000); // Cập nhật thời gian mỗi giây
    targetInterval = setInterval(createTargets, 1000); // Tạo nhiều mục tiêu mỗi giây
}

// Hàm reset trò chơi
function resetGame() {
    // Reset điểm và thời gian
    score = 0;
    gameDuration = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = `Thời gian: ${gameDuration}s`;

    // Xóa tất cả mục tiêu còn lại
    const targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());

    // Bắt đầu lại trò chơi
    startGame();

}

gameContainer.addEventListener('click', (event) => {
    // Kiểm tra nếu sự kiện click không xảy ra trên một mục tiêu
    if (!event.target.classList.contains('target')) {
        score--; // Trừ 1 điểm khi click vào vùng không phải mục tiêu
        scoreDisplay.textContent = score;
    }
});



// Thêm sự kiện click cho nút bắt đầu trò chơi
startBtn.addEventListener('click', () => {
    // Nếu trò chơi đã bắt đầu, reset lại trò chơi
    if (gameInterval) {
        clearInterval(gameInterval);
        clearInterval(targetInterval);
    }
    resetGame(); // Reset và bắt đầu lại trò chơi
});
