// EasyTax — Tax simulator
// Sliders for IRP/연금저축/ISA, live tax savings recalc visual

function ScreenSimulator() {
  const { go } = React.useContext(window.NavCtx);

  // Visual-only state (interactive but not connected to real calculation engine)
  const [irp, setIrp] = React.useState(700);     // 만원
  const [pension, setPension] = React.useState(600);
  const [isa, setIsa] = React.useState(450);
  const [card, setCard] = React.useState(2400);

  // Approximated savings by bracket (38.5%)
  const rate = 0.385;
  const irpSave = Math.min(irp, 900) * 10000 * rate;
  const pensionSave = Math.min(pension, 600) * 10000 * 0.165;
  const isaSave = Math.min(isa, 500) * 10000 * 0.092;
  const cardSave = Math.max(0, card - 3000) * 10000 * 0.15 * 0.8;
  const total = irpSave + pensionSave + isaSave + cardSave;

  const beforeTax = 28400000;
  const afterTax = beforeTax - total;

  const Slider = ({ label, value, max, onChange, hint, color = '#2563eb' }) => (
    <div style={{ marginTop: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--et-text-strong)' }}>{label}</div>
          <div style={{ fontSize: 11, color: 'var(--et-text-mute)', marginTop: 2 }}>{hint}</div>
        </div>
        <div style={{
          fontSize: 18, fontWeight: 800, color: 'var(--et-text-strong)',
          fontFeatureSettings: '"tnum" on', letterSpacing: '-0.01em',
        }}>
          {value.toLocaleString()}<span style={{ fontSize: 13, fontWeight: 700, color: 'var(--et-text-soft)', marginLeft: 2 }}>만원</span>
        </div>
      </div>
      <div style={{ position: 'relative', marginTop: 14, height: 24 }}>
        {/* track */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
          height: 6, background: 'var(--et-divider)', borderRadius: 999,
        }}/>
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          height: 6, width: `${(value/max)*100}%`,
          background: color, borderRadius: 999,
        }}/>
        {/* thumb */}
        <div style={{
          position: 'absolute', top: '50%',
          left: `calc(${(value/max)*100}% - 12px)`, transform: 'translateY(-50%)',
          width: 24, height: 24, borderRadius: 999,
          background: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.18), 0 0 0 2px ' + color,
        }}/>
        <input type="range" min={0} max={max} value={value} onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}/>
      </div>
    </div>
  );

  return (
    <Phone>
      <div className="et-screen" style={{ background: 'var(--et-bg)' }}>
        <AppBar title="절세 시뮬레이터" onBack={() => go('home')} right={
          <div className="et-appbar-icon" style={{ fontSize: 13, fontWeight: 700, color: 'var(--et-primary)', width: 'auto', padding: '0 4px' }}>
            초기화
          </div>
        }/>

        <div className="et-scroll" style={{ paddingBottom: 24 }}>
          {/* Big result */}
          <div style={{
            margin: '8px 16px 0',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: 20, padding: 22, color: '#fff',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 999, background: 'radial-gradient(circle, rgba(96,165,250,0.32) 0%, transparent 70%)' }}/>

            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>예상 절세액</div>
            <div style={{ marginTop: 6, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', fontFeatureSettings: '"tnum" on' }}>
              {Math.round(total).toLocaleString()}<span style={{ fontSize: 18, fontWeight: 700, marginLeft: 2 }}>원</span>
            </div>

            {/* before/after bar */}
            <div style={{ marginTop: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                <span>적용 전 세금</span>
                <span>적용 후</span>
              </div>
              <div style={{ marginTop: 6, height: 8, background: 'rgba(255,255,255,0.12)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  height: '100%',
                  width: `${(afterTax/beforeTax)*100}%`,
                  background: 'linear-gradient(90deg, #60a5fa, #93c5fd)',
                }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 13, fontWeight: 700, fontFeatureSettings: '"tnum" on' }}>
                <span>{(beforeTax).toLocaleString()}원</span>
                <span style={{ color: '#86efac' }}>{Math.round(afterTax).toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div style={{ margin: '20px 16px 0', background: '#fff', borderRadius: 18, padding: '6px 20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 18 }}>
              <span style={{ width: 6, height: 18, borderRadius: 3, background: 'var(--et-primary)' }}/>
              <h3 className="et-h3" style={{ margin: 0 }}>절세 항목 조정</h3>
            </div>
            <Slider label="IRP 납입액" hint="한도 900만원 · 세액공제 16.5%" value={irp} max={900} onChange={setIrp} color="#2563eb"/>
            <Slider label="연금저축펀드" hint="한도 600만원 · 세액공제 16.5%" value={pension} max={600} onChange={setPension} color="#8b5cf6"/>
            <Slider label="ISA 납입액" hint="한도 2,000만원 · 비과세 한도 200만" value={isa} max={500} onChange={setIsa} color="#10b981"/>
            <Slider label="신용카드 사용액" hint="총급여 25% 초과분 소득공제" value={card} max={5000} onChange={setCard} color="#f59e0b"/>
          </div>

          {/* Breakdown */}
          <div style={{ margin: '20px 16px 0', background: '#fff', borderRadius: 18, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 18, borderRadius: 3, background: 'var(--et-violet)' }}/>
              <h3 className="et-h3" style={{ margin: 0 }}>항목별 절세액</h3>
            </div>
            <div style={{ marginTop: 12 }}>
              {[
                { name: 'IRP', save: irpSave, color: '#2563eb' },
                { name: '연금저축펀드', save: pensionSave, color: '#8b5cf6' },
                { name: 'ISA', save: isaSave, color: '#10b981' },
                { name: '신용카드', save: cardSave, color: '#f59e0b' },
              ].map(r => (
                <div key={r.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0', borderTop: '1px solid var(--et-divider)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: r.color }}/>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--et-text)' }}>{r.name}</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--et-text-strong)', fontFeatureSettings: '"tnum" on' }}>
                    +{Math.round(r.save).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '20px 16px 8px' }}>
            <button className="et-btn et-btn-primary">이 시뮬레이션으로 포트폴리오 만들기</button>
          </div>
        </div>
      </div>
    </Phone>
  );
}

window.ScreenSimulator = ScreenSimulator;
