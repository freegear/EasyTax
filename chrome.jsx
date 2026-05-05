// Shared chrome — top app bar + stepper

function getCookie(name) {
  const match = document.cookie.split(';').find(c => c.trim().startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/login';
}

function AppBar({ step }) {
  const username = getCookie('username') || '사용자';
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="appbar">
      <div className="appbar-inner">
        <div className="brand">
          <div className="brand-dot">E</div>
          <span>EasyTax</span>
        </div>
        <nav className="appbar-nav">
          <a href="#">절세 진단</a>
          <a href="#">상품 찾기</a>
          <a href="#">세무 가이드</a>
          <a href="#">고객센터</a>
        </nav>
        <div className="appbar-cta">
          <span style={{fontSize: 14, color: 'var(--text-2)', fontWeight: 600}}>{username} 님</span>
          <div className="appbar-avatar">{initial}</div>
          <button
            onClick={handleLogout}
            style={{
              background: 'var(--surface-2)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-2)',
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { key: 'input', label: '소득·공제 입력' },
  { key: 'analyze', label: 'AI 분석' },
  { key: 'result', label: '절세 결과' },
  { key: 'action', label: '실행 플랜' },
];

function Stepper({ current, onJump }) {
  const idx = STEPS.findIndex(s => s.key === current);
  return (
    <div className="stepper">
      {STEPS.map((s, i) => {
        const state = i < idx ? 'done' : i === idx ? 'active' : '';
        return (
          <React.Fragment key={s.key}>
            <button
              className={`step ${state}`}
              onClick={() => onJump && onJump(s.key)}
              style={{ border: 'none', cursor: onJump ? 'pointer' : 'default' }}
            >
              <span className="step-num">
                {i < idx ? <CheckIcon /> : i + 1}
              </span>
              <span>{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7.5L6 10.5L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InfoIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="7" cy="4.3" r="0.8" fill="currentColor"/>
    </svg>
  );
}

Object.assign(window, { AppBar, Stepper, STEPS, CheckIcon, ArrowIcon, InfoIcon });
