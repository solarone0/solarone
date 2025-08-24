document.addEventListener('DOMContentLoaded', () => {
    const progressText = document.getElementById('progress-text');
    const calendarGrid = document.getElementById('calendar-grid');

    // 1. 주요 날짜 계산
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 1); // 올해의 첫 날
    const endOfYear = new Date(year, 11, 31); // 올해의 마지막 날

    // 2. 올해가 총 며칠인지 계산 (윤년 고려)
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const totalDaysInYear = isLeapYear ? 366 : 365;

    // 3. 오늘이 올해의 몇 번째 날인지 계산
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

    // 4. 남은 날짜 및 진행률 계산
    const daysRemaining = totalDaysInYear - dayOfYear;
    const percentagePassed = ((dayOfYear / totalDaysInYear) * 100).toFixed(2);

    // 5. 계산된 텍스트를 화면에 표시
    progressText.textContent = `올해는 ${percentagePassed}% 지났고, ${daysRemaining}일 남았습니다.`;

    // 6. 잔디밭 그리드 생성
    calendarGrid.innerHTML = ''; // 기존 내용을 비움

    for (let i = 1; i <= totalDaysInYear; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');

        // 오늘 이전의 날짜는 'past' 클래스 추가
        if (i < dayOfYear) {
            dayCell.classList.add('past');
        }

        // 툴팁에 표시될 날짜 계산
        const date = new Date(year, 0, i);
        const dateString = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        dayCell.setAttribute('data-tooltip', dateString);

        calendarGrid.appendChild(dayCell);
    }
});
