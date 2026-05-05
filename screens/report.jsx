// EasyTax — Portfolio result report
// Hero refund, donut allocation, monthly cashflow, recommendations, action items.

function ScreenReport() {
  const { go } = React.useContext(window.NavCtx);

  const items = [
    { name: 'IRP 추가납입', amount: 7000000, save: 1155000, ratio: 33, color: '#2563eb', emoji: '🏦', tag: '핵심' },
    { name: '연금저축펀드', amount: 6000000, save: 990000, ratio: 28, color: '#8b5cf6', emoji: '📈', tag: '핵심' },
    { name: 'ISA 적립식', amount: 4500000, save: 720000, ratio: 21, color: '#10b981', emoji: '💎', tag: '추천' },
    { name: '주택청약', amount: 3000000, save: 480000, ratio: 14, color: '#f59e0b', emoji: '🏠', tag: '추천' },
    { name: '기부금', amount: 1000000, save: 165000, ratio: 4, color: '#ef4444', emoji: '🤝', tag: '선택' },
  ];

  // Donut: cumulative angles for SVG arcs
  const total = items.reduce((s, x) => s + x.ratio, 0);
  let cum = 0;
  const segments = items.map(x => {
    const start = cum;
    cum += x.ratio;
    return { ...x, start: (start/total)*360, end: (cum/total)*360 };
  });

  const polar = (cx, cy, r, deg) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + r*Math.cos(a), cy + r*Math.sin(a)];
  };
  const arcPath = (cx, cy, rOuter, rInner, start, end) => {
    const [x1, y1] = polar(cx, cy, rOuter, start);
    const [x2, y2] = polar(cx, cy, rOuter, end);
    const [x3, y3] = polar(cx, cy, rInner, end);
    const [x4, y4] = polar(cx, cy, rInner, start);
    const large = (end - start) > 180 ? 1 : 0;
    return `M${x1},${y1} A${rOuter},${rOuter} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${large} 0 ${x4},${y4} Z`;
  };

  return (
    <Phone>
      <div className="et-screen" style={{ background: 'var(--et-bg)' }}>
        <AppBar title="포트폴리오 리포트" onBack={() => go('home')} right={
          <div className="et-appbar-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        }/>

        <div className="et-scroll" style={{ paddingBottom: 100 }}>
          {/* Hero */}
          <div style={{ padding: '4px 16px 0' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #60a5fa 100%)',
              borderRadius: 24, padding: '24px 22px', color: '#fff',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 14px 36px rgba(37,99,235,0.30)',
            }}>
              <div style={{ position: 'absolute', right: -50, bottom: -50, width: 200, height: 200, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)' }}/>
              <span style={{
                background: 'rgba(255,255,255,0.18)', padding: '5px 10px', borderRadius: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              }}>김민준님 맞춤 포트폴리오</span>
              <div style={{ marginTop: 14, fontSize: 13, opacity: 0.85 }}>예상 절세액</div>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', fontFeatureSettings: '"tnum" on', lineHeight: 1.05, marginTop: 2 }}>
                3,510,000<span style={{ fontSize: 20, fontWeight: 700, marginLeft: 2 }}>원</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.arrowUp width={12} height={12}/>
                연봉 대비 2.9% · 동일 소득 평균보다 +18%
              </div>
            </div>
          </div>

          {/* Donut allocation */}
          <div style={{ padding: '20px 16px 0' }}>
            <div className="et-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 18, borderRadius: 3, background: 'var(--et-primary)' }}/>
                <h3 className="et-h3" style={{ margin: 0 }}>자산 배분</h3>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--et-text-mute)', fontWeight: 600 }}>총 21,500,000원</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    {segments.map((s, i) => (
                      <path key={i} d={arcPath(70, 70, 64, 42, s.start, s.end)} fill={s.color}/>
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, color: 'var(--et-text-mute)', fontWeight: 600 }}>총 절세</span>
                    <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--et-text-strong)', letterSpacing: '-0.02em', fontFeatureSettings: '"tnum" on' }}>351만</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(x => (
                    <div key={x.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: x.color }}/>
                      <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: 'var(--et-text)' }}>{x.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--et-text-soft)', fontFeatureSettings: '"tnum" on' }}>{x.ratio}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div style={{ padding: '20px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 10px', alignItems: 'baseline' }}>
              <h3 className="et-h3" style={{ margin: 0 }}>추천 절세 상품</h3>
              <span style={{ fontSize: 13, color: 'var(--et-text-soft)', fontWeight: 600 }}>{items.length}개</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((x, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16, padding: 16,
                  display: 'flex', alignItems: 'center', gap: 12,
                  boxShadow: 'var(--et-shadow-sm)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: x.color + '1a', color: x.color,
                    display: 'grid', placeItems: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>{x.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--et-text-strong)' }}>{x.name}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: x.tag === '핵심' ? '#dbeafe' : x.tag === '추천' ? '#d1fae5' : '#f1f3f7',
                        color: x.tag === '핵심' ? '#1d4ed8' : x.tag === '추천' ? '#047857' : '#64748b',
                      }}>{x.tag}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--et-text-mute)', marginTop: 2, fontFeatureSettings: '"tnum" on' }}>
                      월 {Math.round(x.amount/12/10000).toLocaleString()}만원 · 연 {(x.amount/10000).toLocaleString()}만원
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--et-text-mute)', fontWeight: 600 }}>절세액</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: x.color, fontFeatureSettings: '"tnum" on', letterSpacing: '-0.01em' }}>
                      +{(x.save/10000).toFixed(0)}만
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight card */}
          <div style={{ padding: '20px 16px 0' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: 16, padding: 18,
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#f59e0b', color: '#fff',
                display: 'grid', placeItems: 'center', flexShrink: 0,
              }}>
                <Icon.spark/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#78350f' }}>AI 인사이트</div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#92400e', lineHeight: 1.55 }}>
                  현재 IRP 한도의 78%만 사용 중이에요. <b>월 16만원</b>씩 추가 납입 시 <b>165만원</b>을 더 절세할 수 있어요.
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div style={{ padding: '20px 24px 4px', textAlign: 'center', fontSize: 11, color: 'var(--et-text-mute)', lineHeight: 1.6 }}>
            본 리포트는 입력하신 정보를 기준으로 산출된 예상치이며,<br/>
            실제 절세액은 개인 상황에 따라 달라질 수 있습니다.
          </div>
        </div>

        {/* Sticky CTA */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 16px 20px',
          background: 'linear-gradient(180deg, rgba(245,247,250,0) 0%, #f5f7fa 30%)',
          display: 'flex', gap: 10,
        }}>
          <button className="et-btn et-btn-ghost" style={{ flex: 1 }}>리포트 저장</button>
          <button className="et-btn et-btn-primary" style={{ flex: 1.4 }}>지금 가입하기</button>
        </div>
      </div>
    </Phone>
  );
}

window.ScreenReport = ScreenReport;
