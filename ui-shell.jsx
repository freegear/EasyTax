// EasyTax — shared UI primitives
// Status bar, app bar, tab bar, phone shell.

// Navigation context — created here so ui-shell (loaded first) owns it.
// app.jsx wraps the tree in NavCtx.Provider with real state.
window.NavCtx = React.createContext({ screen: 'home', go: () => {} });

const Icon = {
  back: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  bell: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 8a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  search: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  home: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 11l8-7 8 7v8a2 2 0 01-2 2h-3v-6h-6v6H6a2 2 0 01-2-2v-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  homeFill: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 10.5l8-7 8 7V19a2 2 0 01-2 2h-3.5v-6.5h-5V21H6a2 2 0 01-2-2v-8.5z"/>
    </svg>
  ),
  calc: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="5" y="3" width="14" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="8" y="6" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="9" cy="13" r="1" fill="currentColor"/>
      <circle cx="12" cy="13" r="1" fill="currentColor"/>
      <circle cx="15" cy="13" r="1" fill="currentColor"/>
      <circle cx="9" cy="17" r="1" fill="currentColor"/>
      <circle cx="12" cy="17" r="1" fill="currentColor"/>
      <circle cx="15" cy="17" r="1" fill="currentColor"/>
    </svg>
  ),
  chart: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="7" y="11" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="12" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="17" y="13" width="3" height="4" rx="1" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  user: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  doc: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 3h8l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 3v4h4M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  chevR: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  spark: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  arrowUp: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowDown: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 12l2.2 2.2L15 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pig: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 13c0-4 3-7 8-7 3 0 5 1 6 3l3-1-1 4c1 1 1 2 1 3 0 4-4 7-9 7-1 0-2 0-3-.3L7 22l-1-3c-1-1-2-3-2-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
};

function AppBar({ title, onBack, right, transparent }) {
  return (
    <div className="et-appbar" style={{ background: transparent ? 'transparent' : undefined }}>
      {onBack !== undefined && (
        <div className="et-appbar-icon" onClick={onBack}>
          <Icon.back/>
        </div>
      )}
      <div className="et-appbar-title" style={{ flex: 1 }}>{title}</div>
      {right}
    </div>
  );
}

function TabBar({ active }) {
  const { screen, go } = React.useContext(window.NavCtx);
  const tabs = [
    { id: 'home',   label: '홈',       icon: Icon.home,  activeIcon: Icon.homeFill },
    { id: 'sim',    label: '시뮬레이터', icon: Icon.calc },
    { id: 'report', label: '리포트',    icon: Icon.chart },
    { id: 'mypage', label: 'MY',        icon: Icon.user },
  ];
  return (
    <div className="et-tabbar">
      {tabs.map(t => {
        const isActive = (screen || active) === t.id;
        const I = isActive && t.activeIcon ? t.activeIcon : t.icon;
        return (
          <div key={t.id}
               className={'et-tab' + (isActive ? ' active' : '')}
               onClick={() => go(t.id)}
               style={{ cursor: 'pointer' }}>
            <I/>
            <span>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Phone wrapper sized exactly to 375x812 with home indicator.
// On real mobile devices (≤600px) the .et-phone CSS overrides make it full-screen.
function Phone({ children, bg }) {
  return (
    <div className="et-phone" style={{ background: bg || undefined }}>
      {children}
    </div>
  );
}

// Logo image with text fallback
function LogoBrand({ size = 28, light = false }) {
  const [imgError, setImgError] = React.useState(false);
  if (!imgError) {
    return (
      <img
        src="/image/logo.png"
        alt="EasyTax"
        style={{ height: size, width: 'auto', objectFit: 'contain' }}
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: Math.round(size * 0.28),
        background: light ? '#fff' : 'var(--et-primary)',
        color: light ? 'var(--et-primary)' : '#fff',
        display: 'grid', placeItems: 'center',
        fontWeight: 800, fontSize: Math.round(size * 0.55),
      }}>E</div>
      <span style={{
        fontWeight: 700, fontSize: Math.round(size * 0.6),
        color: light ? '#fff' : 'var(--et-text-strong)',
        letterSpacing: '-0.02em',
      }}>EasyTax</span>
    </div>
  );
}

// Currency formatting
function formatKRW(n, opts={}) {
  if (n == null) return '0';
  const v = Math.round(n);
  if (opts.compact) {
    if (Math.abs(v) >= 100000000) return (v/100000000).toFixed(1).replace(/\.0$/, '') + '억';
    if (Math.abs(v) >= 10000) return (v/10000).toFixed(0) + '만';
  }
  return v.toLocaleString('ko-KR');
}

// Convert won → "1억 2,400만" Korean compact
function formatKor(n) {
  const v = Math.round(n);
  const eok = Math.floor(v / 100000000);
  const man = Math.floor((v % 100000000) / 10000);
  if (eok > 0 && man > 0) return `${eok}억 ${man.toLocaleString()}만`;
  if (eok > 0) return `${eok}억`;
  if (man > 0) return `${man.toLocaleString()}만`;
  return v.toLocaleString();
}

Object.assign(window, {
  Icon, StatusBar, AppBar, TabBar, Phone, LogoBrand, formatKRW, formatKor,
});
