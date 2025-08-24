/* Pretendard 폰트 및 기본 스타일 */
body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f6f8fa;
    color: #24292e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
}

.container {
    text-align: center;
    background-color: #ffffff;
    padding: 30px 40px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
}

h1 { font-size: 2em; margin-bottom: 0.5em; }
#progress-text { font-size: 1.2em; color: #586069; margin-bottom: 0.5em; }
#completion-rate { font-size: 1.1em; color: #28a745; font-weight: bold; margin-bottom: 2em; }

/* 캘린더 레이아웃 */
.calendar-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.week-labels {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 10px;
    color: #586069;
    margin-top: 2px; /* 그리드와 정렬 맞추기 */
}

.week-labels > div {
    height: 16px;
    display: flex;
    align-items: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr); /* 1행에 7개 */
    grid-auto-rows: 16px;
    gap: 4px;
}

.day {
    width: 16px;
    height: 16px;
    background-color: #ebedf0;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
}

.day:hover {
    transform: scale(1.2);
}

.day.past { background-color: #9be9a8; }
.day.level-2 { background-color: #40c463; }
.day.level-3 { background-color: #30a14e; }
.day.level-4 { background-color: #216e39; }

/* 오늘 날짜 하이라이트 */
.day.today {
    background-color: #ffc107; /* 노란색 배경 */
    border: 1px solid #ff9800;
    box-shadow: 0 0 8px 2px rgba(255, 193, 7, 0.7); /* Glow 효과 */
}

/* 목표 완료 스타일 */
.day.goal-set .checkbox-icon { display: block; }
.day.completed { background-color: #4863ad !important; }

/* 목표 체크박스 (JS로 생성) */
.checkbox-icon {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* 툴팁 */
.day:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 130%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #24292e;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
}

/* 팝업(모달) 스타일 */
.modal {
    display: none;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.6);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 25px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    border-radius: 8px;
    text-align: left;
    position: relative;
}

.close-button {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal-content h3 { margin-top: 0; }
.modal-content textarea { width: 100%; height: 80px; margin: 10px 0; padding: 10px; box-sizing: border-box; border-radius: 4px; border: 1px solid #ccc; }
.modal-content button {
    background-color: #28a745;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

footer { margin-top: 2em; font-size: 0.9em; color: #6a737d; }
