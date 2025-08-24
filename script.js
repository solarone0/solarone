document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const progressText = document.getElementById('progress-text');
    const completionRateText = document.getElementById('completion-rate');
    const calendarGrid = document.getElementById('calendar-grid');
    const weekLabelsContainer = document.getElementById('week-labels');
    const modal = document.getElementById('goal-modal');
    const modalDate = document.getElementById('modal-date');
    const goalInput = document.getElementById('goal-input');
    const saveGoalButton = document.getElementById('save-goal-button');
    const closeButton = document.querySelector('.close-button');

    // 목표 데이터 로드 (localStorage)
    let goals = JSON.parse(localStorage.getItem('goals')) || {};

    // 1. 주요 날짜 계산
    const now = new Date();
    const todayString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const totalDaysInYear = isLeapYear ? 366 : 365;
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

    // 2. 남은 날짜 및 진행률 계산 및 표시
    const daysRemaining = totalDaysInYear - dayOfYear;
    const percentagePassed = ((dayOfYear / totalDaysInYear) * 100).toFixed(2);
    progressText.textContent = `올해는 ${percentagePassed}% 지났고, ${daysRemaining}일 남았습니다.`;

    // 3. 캘린더 그리드 및 주차 라벨 생성
    function renderCalendar() {
        calendarGrid.innerHTML = '';
        weekLabelsContainer.innerHTML = '';

        const firstDayOfWeek = startOfYear.getDay(); // 0:Sun, 1:Mon, ..., 6:Sat

        // 첫 주 시작 전 빈 칸 채우기
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // 날짜 채우기
        let currentWeek = 1;
        for (let i = 1; i <= totalDaysInYear; i++) {
            const dayCell = document.createElement('div');
            const date = new Date(year, 0, i);
            const dateString = date.toISOString().split('T')[0];

            dayCell.classList.add('day');
            dayCell.dataset.date = dateString;

            // 툴팁 설정
            const tooltipString = date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
            dayCell.setAttribute('data-tooltip', tooltipString);

            // 지난 날, 오늘, 미래 구분
            if (i < dayOfYear) {
                dayCell.classList.add('past');
            } else if (i === dayOfYear) {
                dayCell.classList.add('today');
            }

            // 목표 데이터 렌더링
            if (goals[dateString]) {
                dayCell.classList.add('goal-set');
                const checkbox = document.createElement('span');
                checkbox.classList.add('checkbox-icon');
                checkbox.textContent = goals[dateString].completed ? '✔' : '□';
                dayCell.appendChild(checkbox);

                if (goals[dateString].completed) {
                    dayCell.classList.add('completed');
                }
            }
            
            calendarGrid.appendChild(dayCell);
            
            // 주차 라벨 생성 (매주 월요일마다)
            if (date.getDay() === 1) { // Monday
                 const weekLabel = document.createElement('div');
                 weekLabel.textContent = `${currentWeek}주`;
                 weekLabelsContainer.appendChild(weekLabel);
                 currentWeek++;
            }
        }
        updateCompletionRate();
    }


    // 4. 완료율 계산 및 업데이트
    function updateCompletionRate() {
        const totalGoals = Object.keys(goals).length;
        if (totalGoals === 0) {
            completionRateText.textContent = '목표 완료율: 0%';
            return;
        }
        const completedGoals = Object.values(goals).filter(goal => goal.completed).length;
        const rate = ((completedGoals / totalGoals) * 100).toFixed(1);
        completionRateText.textContent = `목표 완료율: ${rate}% (${completedGoals}/${totalGoals})`;
    }

    // 5. 모달 관련 이벤트 리스너
    let selectedDate = null;
    calendarGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('day')) {
            selectedDate = e.target.dataset.date;
            const date = new Date(selectedDate);
            modalDate.textContent = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
            
            // 목표가 있으면 불러오기, 없으면 빈칸
            goalInput.value = goals[selectedDate] ? goals[selectedDate].text : '';
            modal.style.display = 'block';
        } else if (e.target.classList.contains('checkbox-icon')) {
             // 체크박스 클릭으로 완료 상태 토글
            const parentDay = e.target.parentElement;
            const date = parentDay.dataset.date;
            goals[date].completed = !goals[date].completed;
            localStorage.setItem('goals', JSON.stringify(goals));
            renderCalendar(); // 화면 다시 그리기
        }
    });

    closeButton.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (e) => { if (e.target == modal) { modal.style.display = 'none'; } };

    saveGoalButton.onclick = () => {
        const goalText = goalInput.value.trim();
        if (goalText) {
            if (!goals[selectedDate]) { // 새 목표
                goals[selectedDate] = { text: goalText, completed: false };
            } else { // 목표 수정
                goals[selectedDate].text = goalText;
            }
        } else {
            delete goals[selectedDate]; // 목표 내용 지우면 삭제
        }
        
        localStorage.setItem('goals', JSON.stringify(goals));
        modal.style.display = 'none';
        renderCalendar(); // 변경사항 반영하여 다시 그리기
    };

    // 초기 실행
    renderCalendar();
});
