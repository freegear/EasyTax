// Screen 3 — Results: hero, before/after, breakdown

const RESULT = {
  currentTax: 14820000,
  optimizedTax: 12973000,
  saving: 1847000,
  totalContribution: 12000000,
  breakdown: [
    { name: '연금저축', current: 3000000, recommended: 6000000, taxSave: 990000, color: '#3182F6', desc: '세액공제 13.2~16.5% (총급여 기준)' },
    { name: '퇴직연금 IRP', current: 0, recommended: 3000000, taxSave: 495000, color: '#00C896', desc: '연금저축과 합산 한도 900만원' },
    { name: 'ISA (만기 환승)', current: 0, recommended: 20000000, taxSave: 0, color: '#FFB800', desc: '비과세·분리과세 + 만기 시 연금계좌 이체로 추가 공제' },
    { name: '주택청약저축', current: 2400000, recommended: 3000000, taxSave: 99000, color: '#FF6B6B', desc: '무주택 세대주, 총급여 7천만원 이하 (적용 대상 아님)', disabled: true },
    { name: '보장성보험', current: 1200000, recommended: 1000000, taxSave: 132000, color: '#9D7AFF', desc: '연 100만원 한도, 12% 세액공제' },
    { name: '월세 세액공제', current: 0, recommended: 0, taxSave: 0, color: '#999', desc: '총급여 8천만원 초과로 미해당', disabled: true },
    { name: '기부금', current: 0, recommended: 1000000, taxSave: 131000, color: '#FF8A4C', desc: '지정기부금 15% 세액공제' },
  ],
};

function fmt(n) { return n.toLocaleString('ko-KR'); }
function fmtMan(n) {
  if (n >= 10000) {
    const man = n / 10000;
    return man % 1 === 0 ? `${man.toLocaleString('ko-KR')}만` : `${man.toFixed(1)}만`;
  }
  return n.toLocaleString('ko-KR');
}

function ScreenResult({ onNext }) {
  return (
    <div className="page fade-up">
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="eyebrow mb-8">STEP 3 · 절세 결과</div>
        <h1 className="h-page mb-32">
          김민준 님은 올해<br/>
          <span style={{ color: 'var(--accent)' }}>{fmt(RESULT.saving)}원</span>까지 절세할 수 있어요
        </h1>

        {/* HERO */}
        <div className="card-hero mb-24">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="badge badge-accent mb-12" style={{ fontSize: 13 }}>
                예상 환급액 · 작년 대비
              </div>
              <div className="big-number num" style={{ color: 'var(--accent)' }}>
                +{fmt(RESULT.saving)}<span style={{ fontSize: 32, fontWeight: 700, marginLeft: 6 }}>원</span>
              </div>
              <p className="body mt-12" style={{ fontSize: 16 }}>
                현재 결정세액의 <b style={{ color: 'var(--text-1)' }}>{((RESULT.saving / RESULT.currentTax) * 100).toFixed(1)}%</b>를 줄일 수 있어요.<br/>
                내년 5월 종합소득세 신고 또는 연말정산 시 환급으로 받을 수 있어요.
              </p>
              <div className="row gap-12 mt-24">
                <span className="badge" style={{ fontSize: 12, padding: '6px 12px' }}>
                  📅 적용 시기 · 2026년 연말정산
                </span>
                <span className="badge" style={{ fontSize: 12, padding: '6px 12px' }}>
                  💼 추가 납입 · {fmt(RESULT.totalContribution)}원
                </span>
              </div>
            </div>

            <BeforeAfter />
          </div>
        </div>

        {/* Allocation chart + summary */}
        <div className="grid-2 mb-24" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
          <div className="card">
            <div className="flex items-center justify-between mb-16">
              <h3 className="h-card">추천 포트폴리오 구성</h3>
              <span className="muted" style={{ fontSize: 13 }}>총 추가 납입 {fmtMan(RESULT.totalContribution)}원</span>
            </div>
            <AllocationBar />
            <div className="grid-2 mt-24" style={{ gap: 12 }}>
              {RESULT.breakdown.filter(b => !b.disabled && b.recommended > 0).map(b => (
                <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: b.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 600, flex: 1 }}>{b.name}</span>
                  <span className="num" style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 700 }}>
                    {fmtMan(b.recommended)}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="h-card mb-16">절세 효과 한눈에</h3>
            <div className="col gap-16">
              <SummaryRow label="현재 결정세액" value={fmt(RESULT.currentTax)} unit="원" />
              <hr className="hr" />
              <SummaryRow label="포트폴리오 적용 후" value={fmt(RESULT.optimizedTax)} unit="원" muted />
              <hr className="hr" />
              <SummaryRow
                label="절감 세액"
                value={`-${fmt(RESULT.saving)}`}
                unit="원"
                accent
              />
            </div>

            <div style={{
              marginTop: 20, padding: 16,
              background: 'var(--accent-soft)', borderRadius: 12,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: 18 }}>💡</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-strong)', marginBottom: 2 }}>
                  세액공제율 {RESULT.currentTax > 5500000 ? '13.2%' : '16.5%'} 적용
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  총급여 5,500만원 초과 구간에 해당하여 13.2% 세액공제율이 적용돼요.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed breakdown table */}
        <div className="card mb-32">
          <div className="flex items-center justify-between mb-24">
            <h3 className="h-card">상품별 상세 분석</h3>
            <div className="row gap-8">
              <span className="badge" style={{ fontSize: 12 }}>총 7개 항목 검토</span>
              <span className="badge badge-success" style={{ fontSize: 12 }}>5개 추천</span>
            </div>
          </div>

          <div className="col gap-8">
            {RESULT.breakdown.map((b, i) => (
              <BreakdownRow key={i} item={b} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="btn btn-primary btn-lg btn-block" onClick={onNext}>
          실행 플랜 보기
          <ArrowIcon size={18} />
        </button>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const max = Math.max(RESULT.currentTax, RESULT.optimizedTax);
  const beforeH = (RESULT.currentTax / max) * 200;
  const afterH = (RESULT.optimizedTax / max) * 200;
  return (
    <div style={{
      background: 'var(--surface-2)', borderRadius: 20, padding: 28,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div className="muted" style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
        결정세액 비교
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, height: 220 }}>
        <Bar label="현재" value={RESULT.currentTax} height={beforeH} color="var(--text-3)" />
        <Bar label="적용 후" value={RESULT.optimizedTax} height={afterH} color="var(--accent)" highlight />
      </div>
    </div>
  );
}

function Bar({ label, value, height, color, highlight }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div className="num" style={{
        fontSize: 13, fontWeight: 700,
        color: highlight ? 'var(--accent)' : 'var(--text-2)',
      }}>
        {fmtMan(value)}원
      </div>
      <div style={{
        width: 64, height,
        background: color,
        borderRadius: '8px 8px 0 0',
        transition: 'height .8s',
      }} />
      <div style={{
        fontSize: 13, fontWeight: 600,
        color: highlight ? 'var(--accent)' : 'var(--text-3)',
      }}>{label}</div>
    </div>
  );
}

function AllocationBar() {
  const items = RESULT.breakdown.filter(b => !b.disabled && b.recommended > 0);
  const total = items.reduce((s, b) => s + b.recommended, 0);
  return (
    <div>
      <div style={{
        display: 'flex',
        height: 36,
        borderRadius: 10,
        overflow: 'hidden',
        gap: 2,
      }}>
        {items.map(b => {
          const pct = (b.recommended / total) * 100;
          return (
            <div key={b.name} style={{
              flex: pct,
              background: b.color,
              display: 'grid', placeItems: 'center',
              color: 'white',
              fontSize: 12, fontWeight: 700,
            }}>
              {pct >= 8 ? `${pct.toFixed(0)}%` : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, unit, accent, muted }) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 600 }}>{label}</span>
      <span className="num" style={{
        fontSize: accent ? 22 : 18, fontWeight: 800,
        color: accent ? 'var(--accent)' : muted ? 'var(--text-2)' : 'var(--text-1)',
        letterSpacing: '-0.02em',
      }}>
        {value}<span style={{ fontSize: 13, fontWeight: 700, marginLeft: 2, opacity: 0.7 }}>{unit}</span>
      </span>
    </div>
  );
}

function BreakdownRow({ item }) {
  const delta = item.recommended - item.current;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '20px 1fr 130px 130px 140px',
      gap: 16, alignItems: 'center',
      padding: '16px 4px',
      borderBottom: '1px solid var(--line)',
      opacity: item.disabled ? 0.5 : 1,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{item.desc}</div>
      </div>
      <div className="text-right">
        <div className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>현재</div>
        <div className="num" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', marginTop: 2 }}>
          {fmt(item.current)}원
        </div>
      </div>
      <div className="text-right">
        <div className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>추천</div>
        <div className="num" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', marginTop: 2 }}>
          {fmt(item.recommended)}원
        </div>
      </div>
      <div className="text-right">
        <div className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>절감 세액</div>
        <div className="num" style={{
          fontSize: 15, fontWeight: 800, marginTop: 2,
          color: item.taxSave > 0 ? 'var(--accent)' : 'var(--text-3)',
        }}>
          {item.taxSave > 0 ? `+${fmt(item.taxSave)}원` : '—'}
        </div>
      </div>
    </div>
  );
}

window.ScreenResult = ScreenResult;
window.RESULT = RESULT;
window.fmt = fmt;
window.fmtMan = fmtMan;
