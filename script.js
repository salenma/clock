// 시계
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const noon = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  document.getElementById('lbl-noon').textContent = noon;
  document.getElementById('lbl-time').textContent = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  document.getElementById('date').textContent = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
}
setInterval(updateClock, 1000);
updateClock();

// 메뉴 전환
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  const target = [...document.querySelectorAll('.sidebar li')].find(li => li.textContent.includes(id === 'clock' ? '시계' : id === 'timer' ? '타이머' : id === 'stopwatch' ? '스톱워치' : '자명종'));
  if (target) target.classList.add('active');
}

// 공유
function copyURL() {
  navigator.clipboard.writeText(window.location.href).then(() => alert("URL이 복사되었습니다!"));
}

// 작게/크게
let fontSize = 120;
function shrinkClock() {
  fontSize = Math.max(60, fontSize - 10);
  document.getElementById('lbl-time').style.fontSize = `${fontSize}px`;
}
function enlargeClock() {
  fontSize += 10;
  document.getElementById('lbl-time').style.fontSize = `${fontSize}px`;
}

// 전체화면
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// 스톱워치
let stopwatchInterval;
let stopwatchTime = 0;
function updateStopwatch() {
  const h = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  const m = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  const s = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById('stopwatch-display').textContent = `${h}:${m}:${s}`;
}
document.getElementById('start-stopwatch').onclick = () => {
  if (!stopwatchInterval) stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
};
document.getElementById('stop-stopwatch').onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};
document.getElementById('reset-stopwatch').onclick = () => {
  stopwatchTime = 0;
  updateStopwatch();
};

// 타이머
let timerInterval;
document.getElementById('start-timer').onclick = () => {
  let seconds = parseInt(document.getElementById('timer-input').value);
  if (isNaN(seconds) || seconds <= 0) return;
  clearInterval(timerInterval);
  document.getElementById('timer-display').textContent = '';
  timerInterval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timerInterval);
      alert('타이머 종료!');
    } else {
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      document.getElementById('timer-display').textContent = `${m}:${s}`;
      seconds--;
    }
  }, 1000);
};

// 자명종
let alarmTimeout;
function setAlarm() {
  const time = document.getElementById('alarm-time').value;
  if (!time) return alert("시간을 설정하세요.");
  const now = new Date();
  const [h, m] = time.split(':');
  const alarm = new Date();
  alarm.setHours(h);
  alarm.setMinutes(m);
  alarm.setSeconds(0);
  const delay = alarm.getTime() - now.getTime();
  if (delay <= 0) return alert("미래 시간을 선택하세요.");

  clearTimeout(alarmTimeout);
  alarmTimeout = setTimeout(() => {
    alert("⏰ 자명종 알림!");
  }, delay);
  document.getElementById('alarm-status').textContent = `${time} 알람이 설정됨`;
}

// 광고
const ads = [
  { type: 'text', content: '📢 오늘의 특가! 전자시계 최대 50% 할인!' },
  { type: 'text', content: '⏰ 시간은 금! 생산성을 높이는 시간 관리 앱을 만나보세요.' },
  { type: 'text', content: '💡 똑똑한 시간 관리로 하루를 바꾸세요. 지금 바로 시작!' }
];
function loadAd() {
  const ad = ads[Math.floor(Math.random() * ads.length)];
  const adContainer = document.getElementById('advertisement');
  if (adContainer && document.getElementById('clock').classList.contains('hidden') === false) {
    if (ad.type === 'text') {
      adContainer.innerHTML = `<p>${ad.content}</p>`;
    } else if (ad.type === 'image') {
      adContainer.innerHTML = `<img src="${ad.content}" alt="광고" style="max-width: 100%;">`;
    }
  }
}
loadAd();
setInterval(loadAd, 30000);
