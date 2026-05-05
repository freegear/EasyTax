// EasyTax — Onboarding screen
// Hero gradient, value props, "시작하기" CTA

function ScreenOnboarding({ variant = 'A' }) {
  const { go } = React.useContext(window.NavCtx);
  const isB = variant === 'B';
  const bg = isB
    ? 'linear-gradient(180deg, #0b1f4d 0%, #1d4ed8 60%, #2563eb 100%)'
    : 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 60%, #f5f7fa 100%)';
  const txt = isB ? '#fff' : 'var(--et-text-strong)';
  const sub = isB ? 'rgba(255,255,255,0.78)' : 'var(--et-text-soft)';

  return (
    <Phone statusLight={isB} bg={isB ? '#0b1f4d' : '#eff6ff'}>
      <div className="et-screen" style={{ background: bg }}>
        <div className="et-scroll" style={{ padding: '8px 24px 0' }}>
          {/* logo + brand */}
          <div style={{ marginTop: 20 }}>
            <LogoBrand size={32} light={isB} />
          </div>

          {/* hero */}
          <div style={{ marginTop: 56 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999,
              background: isB ? 'rgba(255,255,255,0.14)' : 'rgba(37,99,235,0.1)',
              color: isB ? '#bfdbfe' : '#1d4ed8',
              fontSize: 12, fontWeight: 700,
              border: isB ? '1px solid rgba(255,255,255,0.18)' : 'none',
            }}>
              <Icon.spark width={14} height={14}/>
              연 1억+ 직장인 전용
            </div>
            <h1 style={{
              margin: '14px 0 0', fontSize: 32, fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.2, color: txt,
            }}>
              올해 더 낼 뻔한 세금,<br/>
              <span style={{ color: isB ? '#93c5fd' : '#2563eb' }}>1,240만원</span> 돌려받자
            </h1>
            <p style={{
              margin: '14px 0 0', fontSize: 15, lineHeight: 1.55,
              color: sub, fontWeight: 500,
            }}>
              연봉·공제·자산을 입력하면<br/>
              나에게 맞는 절세 포트폴리오를 추천해드려요.
            </p>
          </div>

          {/* preview card */}
          <div style={{
            marginTop: 36,
            background: isB ? 'rgba(255,255,255,0.08)' : '#fff',
            borderRadius: 20,
            padding: 20,
            border: isB ? '1px solid rgba(255,255,255,0.14)' : '1px solid #e5e9f0',
            boxShadow: isB ? 'none' : '0 10px 40px rgba(15,23,42,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: isB ? 'rgba(255,255,255,0.7)' : '#64748b' }}>예상 환급액</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: isB ? '#86efac' : '#059669',
                background: isB ? 'rgba(34,197,94,0.18)' : '#d1fae5',
                padding: '3px 8px', borderRadius: 999,
              }}>+18%</span>
            </div>
            <div style={{
              fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em',
              color: isB ? '#fff' : '#0f172a', marginTop: 4,
              fontFeatureSettings: '"tnum" on',
            }}>
              12,400,000<span style={{ fontSize: 18, fontWeight: 700, marginLeft: 2 }}>원</span>
            </div>
            {/* mini bars */}
            <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
              {[40, 70, 55, 85, 100, 75, 90].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: 36, display: 'flex', alignItems: 'flex-end',
                }}>
                  <div style={{
                    width: '100%', height: `${h}%`,
                    background: isB
                      ? `linear-gradient(180deg, #93c5fd, #60a5fa)`
                      : `linear-gradient(180deg, #2563eb, #60a5fa)`,
                    borderRadius: 3, opacity: 0.4 + (h/100)*0.6,
                  }}/>
                </div>
              ))}
            </div>
          </div>

          {/* features */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: Icon.calc, title: '맞춤 시뮬레이션', desc: '내 연봉·공제로 절세액 즉시 계산' },
              { icon: Icon.pig, title: 'AI 포트폴리오', desc: 'IRP·연금·ISA 최적 비중 추천' },
              { icon: Icon.shield, title: '연말정산 가이드', desc: '놓친 공제 항목 체크리스트' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: isB ? 'rgba(255,255,255,0.12)' : '#dbeafe',
                  color: isB ? '#bfdbfe' : '#1d4ed8',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <f.icon/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: txt, letterSpacing: '-0.01em' }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: sub, marginTop: 1 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '12px 20px 16px' }}>
          <button className="et-btn et-btn-primary"
            style={{ background: isB ? '#fff' : '#2563eb', color: isB ? '#1d4ed8' : '#fff' }}
            onClick={() => go('input')}>
            1분만에 시작하기
          </button>
          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: sub, fontWeight: 500 }}>
            이미 회원이신가요?{' '}
            <span style={{ color: isB ? '#93c5fd' : '#2563eb', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => go('home')}>로그인</span>
          </div>
        </div>
      </div>
    </Phone>
  );
}

window.ScreenOnboarding = ScreenOnboarding;
