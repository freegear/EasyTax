// EasyTax — Info input (3-step wizard)
// Step 2: 연봉/소득 입력. Show progress + sticky CTA.

function ScreenInputInfo() {
  return (
    <Phone>
      <div className="et-screen">
        {/* App bar */}
        <div className="et-appbar" style={{ background: 'transparent' }}>
          <div className="et-appbar-icon"><Icon.back/></div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--et-text-mute)', fontWeight: 600 }}>2 / 4</span>
          </div>
          <div className="et-appbar-icon" style={{ fontSize: 13, fontWeight: 600, color: 'var(--et-text-soft)', width: 'auto' }}>건너뛰기</div>
        </div>

        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div className="et-progress">
            <div className="et-progress-fill" style={{ width: '50%' }}/>
          </div>
        </div>

        <div className="et-scroll" style={{ padding: '24px 20px 100px' }}>
          <h1 className="et-h1" style={{ margin: 0 }}>연봉과 소득을<br/>알려주세요</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--et-text-soft)', fontSize: 14, lineHeight: 1.55 }}>
            국세청 연계로 자동 입력하거나<br/>직접 입력할 수 있어요.
          </p>

          {/* auto-import card */}
          <div style={{
            marginTop: 22,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: 16, padding: 18,
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85, letterSpacing: '0.02em' }}>RECOMMENDED</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>홈택스에서 자동 불러오기</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 3 }}>30초만에 정확한 정보로 채워드려요</div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,255,255,0.18)',
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <Icon.chevR/>
            </div>
          </div>

          {/* Or — manual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 18px' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--et-divider)' }}/>
            <span style={{ fontSize: 12, color: 'var(--et-text-mute)', fontWeight: 600 }}>직접 입력</span>
            <div style={{ flex: 1, height: 1, background: 'var(--et-divider)' }}/>
          </div>

          <label className="et-input-label">연봉 (세전)</label>
          <div style={{ position: 'relative' }}>
            <input className="et-input" defaultValue="120,000,000" style={{
              border: '1.5px solid var(--et-primary)', background: '#fff',
              fontSize: 18, fontWeight: 700, paddingRight: 50,
            }}/>
            <span style={{
              position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--et-text-soft)', fontSize: 16, fontWeight: 600,
            }}>원</span>
          </div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'var(--et-primary)',
            marginTop: 8, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            1억 2,000만원 · 상위 3% 소득자
          </div>

          {/* Quick chips */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {['+100만', '+500만', '+1,000만'].map((c, i) => (
              <span key={i} className="et-chip et-chip-neutral" style={{ height: 32, fontSize: 13, padding: '0 14px' }}>{c}</span>
            ))}
          </div>

          <div style={{ height: 18 }}/>

          <label className="et-input-label">기타 소득 <span style={{ color: 'var(--et-text-mute)', fontWeight: 500 }}>(선택)</span></label>
          <input className="et-input" placeholder="배당·임대 등" style={{ color: 'var(--et-text-mute)' }}/>

          <div style={{ height: 18 }}/>

          <label className="et-input-label">부양가족 수</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['0', '1', '2', '3', '4+'].map((n, i) => (
              <div key={n} style={{
                flex: 1, height: 48, display: 'grid', placeItems: 'center',
                background: i === 2 ? 'var(--et-primary)' : 'var(--et-surface-alt)',
                color: i === 2 ? '#fff' : 'var(--et-text)',
                borderRadius: 12, fontWeight: 700, fontSize: 15,
                border: i === 2 ? 'none' : '1.5px solid transparent',
              }}>{n}</div>
            ))}
          </div>

          <div style={{ height: 18 }}/>

          <label className="et-input-label">현재 가입 절세 상품 <span style={{ color: 'var(--et-text-mute)', fontWeight: 500 }}>(중복 가능)</span></label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { name: 'IRP', sel: true },
              { name: '연금저축', sel: true },
              { name: 'ISA', sel: false },
              { name: '청약통장', sel: false },
              { name: '주택담보', sel: false },
              { name: '없음', sel: false },
            ].map(p => (
              <span key={p.name} style={{
                height: 36, padding: '0 14px',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                borderRadius: 999, fontSize: 13, fontWeight: 700,
                background: p.sel ? 'var(--et-primary-soft)' : '#fff',
                color: p.sel ? 'var(--et-primary-strong)' : 'var(--et-text-soft)',
                border: p.sel ? 'none' : '1.5px solid var(--et-border)',
              }}>
                {p.sel && <Icon.check width={14} height={14}/>}
                {p.name}
              </span>
            ))}
          </div>
        </div>

        {/* CTA sticky */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 20px 24px',
          background: 'linear-gradient(180deg, rgba(245,247,250,0) 0%, #f5f7fa 30%)',
        }}>
          <button className="et-btn et-btn-primary">다음</button>
        </div>
      </div>
    </Phone>
  );
}

window.ScreenInputInfo = ScreenInputInfo;
