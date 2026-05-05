// Screen 2 — Analysis: clean Toss-style processing screen

function ScreenAnalyze({ onNext }) {
  const [progress, setProgress] = React.useState(0);
  const [stage, setStage] = React.useState(0);

  const stages = [
    '소득 구조 분석 중',
    '공제 항목 매칭 중',
    '최적 포트폴리오 계산 중',
    '예상 절세액 산출 중',
  ];

  React.useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        const n = Math.min(100, p + 1.4);
        setStage(Math.min(stages.length - 1, Math.floor(n / 25)));
        if (n >= 100) clearInterval(id);
        return n;
      });
    }, 35);
    return () => clearInterval(id);
  }, []);

  const r = 70;
  const C = 2 * Math.PI * r;
  const offset = C - (progress / 100) * C;

  return (
    <div className="page fade-up" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div className="eyebrow mb-16">STEP 2 · AI 분석</div>

        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 32 }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={r} fill="none" strokeWidth="10" className="ring-track" />
            <circle
              cx="90" cy="90" r={r} fill="none" strokeWidth="10"
              className="ring-fill"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          }}>
            <div className="num" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        <h1 className="h-page mb-12">{stages[stage]}</h1>
        <p className="body" style={{ fontSize: 16, marginBottom: 40 }}>
          김민준 님의 소득 구조에 가장 잘 맞는<br/>
          절세 포트폴리오를 찾고 있어요.
        </p>

        <div className="col gap-8" style={{ textAlign: 'left' }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px',
              background: i <= stage ? 'var(--accent-soft)' : 'var(--surface-2)',
              borderRadius: 12,
              transition: 'all .3s',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: i < stage ? 'var(--success)' : i === stage ? 'var(--accent)' : 'var(--line)',
                display: 'grid', placeItems: 'center',
                flexShrink: 0,
              }}>
                {i < stage ? <CheckIcon /> : i === stage ?
                  <div className="spinner" style={{ width: 12, height: 12, borderWidth: 2, borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.4)', borderTopColor: '#fff' }}/> :
                  null
                }
              </div>
              <div style={{
                fontSize: 14, fontWeight: 600,
                color: i <= stage ? 'var(--text-1)' : 'var(--text-3)',
                flex: 1,
              }}>{s}</div>
              {i < stage && <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 700 }}>완료</span>}
            </div>
          ))}
        </div>

        {progress >= 100 && (
          <button className="btn btn-primary btn-lg btn-block fade-up mt-32" onClick={onNext}>
            결과 보기
            <ArrowIcon size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

window.ScreenAnalyze = ScreenAnalyze;
