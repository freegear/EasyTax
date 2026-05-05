// EasyTax — Home dashboard
// Hero summary card, quick actions, portfolio snapshot, todo list, products

function ScreenHome() {
  return (
    <Phone>
      <div className="et-screen" style={{ background: 'var(--et-bg)' }}>
        <div className="et-scroll" style={{ paddingBottom: 90 }}>
          {/* Top brand row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 20px 4px',
          }}>
            <LogoBrand size={26} />
            <div style={{ display: 'flex', gap: 6 }}>
              <div className="et-appbar-icon"><Icon.search/></div>
              <div className="et-appbar-icon" style={{ position: 'relative' }}>
                <Icon.bell/>
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 8, height: 8, borderRadius: 999, background: 'var(--et-danger)',
                  border: '1.5px solid #fff',
                }}/>
              </div>
            </div>
          </div>

          {/* Hero card — refund summary */}
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
              borderRadius: 22,
              padding: 22,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(37,99,235,0.28)',
            }}>
              {/* glow circle */}
              <div style={{
                position: 'absolute', right: -40, top: -40,
                width: 180, height: 180, borderRadius: 999,
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
              }}/>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, letterSpacing: '0.01em' }}>
                    김민준님의 2025년 예상 환급
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.18)', height: 24, padding: '0 10px',
                  borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 11, fontWeight: 700,
                }}>
                  <Icon.arrowUp width={11} height={11}/>
                  지난해보다 +428만
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', fontFeatureSettings: '"tnum" on' }}>
                12,400,000<span style={{ fontSize: 18, fontWeight: 700, marginLeft: 2 }}>원</span>
              </div>
              <div style={{ marginTop: 4, fontSize: 13, opacity: 0.9 }}>
                추천 포트폴리오 적용 시
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button style={{
                  flex: 1, height: 46, border: 'none',
                  background: '#fff', color: '#1d4ed8',
                  borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: 'inherit',
                  cursor: 'pointer',
                }}>
                  포트폴리오 보기
                </button>
                <button style={{
                  width: 46, height: 46, border: 'none',
                  background: 'rgba(255,255,255,0.18)', color: '#fff',
                  borderRadius: 12, display: 'grid', placeItems: 'center',
                  cursor: 'pointer',
                }}>
                  <Icon.chevR/>
                </button>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ padding: '20px 16px 0' }}>
            <div style={{
              background: '#fff', borderRadius: 18,
              padding: '6px 4px',
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              boxShadow: 'var(--et-shadow-sm)',
            }}>
              {[
                { icon: Icon.calc, label: '시뮬레이터', color: '#2563eb', bg: '#dbeafe' },
                { icon: Icon.chart, label: '리포트', color: '#8b5cf6', bg: '#ede9fe' },
                { icon: Icon.doc, label: '연말정산', color: '#059669', bg: '#d1fae5' },
                { icon: Icon.spark, label: '상품추천', color: '#d97706', bg: '#fef3c7' },
              ].map((q, i) => (
                <div key={i} style={{
                  padding: '14px 4px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: q.bg, color: q.color,
                    display: 'grid', placeItems: 'center',
                  }}>
                    <q.icon/>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--et-text)' }}>{q.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio snapshot */}
          <div style={{ padding: '24px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px 10px' }}>
              <h3 className="et-h3" style={{ margin: 0 }}>내 절세 포트폴리오</h3>
              <span style={{ fontSize: 13, color: 'var(--et-text-soft)', fontWeight: 600 }}>전체보기</span>
            </div>
            <div className="et-card" style={{ padding: 18 }}>
              {/* allocation bar */}
              <div style={{ display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ flex: 35, background: '#2563eb' }}/>
                <div style={{ flex: 28, background: '#8b5cf6' }}/>
                <div style={{ flex: 22, background: '#10b981' }}/>
                <div style={{ flex: 15, background: '#f59e0b' }}/>
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { name: 'IRP 추가납입', amount: 7000000, ratio: 35, color: '#2563eb', save: 1155000 },
                  { name: '연금저축펀드', amount: 6000000, ratio: 28, color: '#8b5cf6', save: 990000 },
                  { name: 'ISA', amount: 4500000, ratio: 22, color: '#10b981', save: 720000 },
                  { name: '주택청약', amount: 3000000, ratio: 15, color: '#f59e0b', save: 480000 },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: p.color }}/>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--et-text)' }}>{p.name}</span>
                    <span style={{ fontSize: 13, color: 'var(--et-text-mute)', fontWeight: 600, fontFeatureSettings: '"tnum" on' }}>
                      {formatKor(p.amount)}원
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--et-success)', minWidth: 70, textAlign: 'right', fontFeatureSettings: '"tnum" on' }}>
                      −{formatKor(p.save)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Todo / checklist */}
          <div style={{ padding: '24px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 4px 10px' }}>
              <h3 className="et-h3" style={{ margin: 0 }}>오늘의 할 일</h3>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--et-primary)' }}>3개 남음</span>
            </div>
            <div className="et-card" style={{ padding: '4px 18px' }}>
              {[
                { done: true, label: 'IRP 한도 확인 완료', sub: '900만원 한도' },
                { done: false, label: '연금저축 추가납입', sub: '11월 30일까지 · 절세 165만원' },
                { done: false, label: '신용카드 사용액 점검', sub: '소득공제 한도 312만원' },
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
                  borderBottom: i < 2 ? '1px solid var(--et-divider)' : 'none',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 999,
                    background: t.done ? 'var(--et-success)' : 'transparent',
                    border: t.done ? 'none' : '2px solid var(--et-border)',
                    color: '#fff', display: 'grid', placeItems: 'center',
                    flexShrink: 0,
                  }}>
                    {t.done && <Icon.check width={14} height={14}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 600,
                      color: t.done ? 'var(--et-text-mute)' : 'var(--et-text-strong)',
                      textDecoration: t.done ? 'line-through' : 'none',
                    }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--et-text-mute)', marginTop: 2 }}>{t.sub}</div>
                  </div>
                  {!t.done && <Icon.chevR style={{ color: 'var(--et-text-faint)' }}/>}
                </div>
              ))}
            </div>
          </div>

          {/* Products carousel */}
          <div style={{ padding: '24px 0 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 20px 10px' }}>
              <h3 className="et-h3" style={{ margin: 0 }}>맞춤 상품 추천</h3>
              <span style={{ fontSize: 13, color: 'var(--et-text-soft)', fontWeight: 600 }}>전체보기</span>
            </div>
            <div style={{
              display: 'flex', gap: 12, padding: '0 20px',
              overflowX: 'auto',
            }}>
              {[
                { tag: '추천', tagBg: '#2563eb', tagFg: '#fff', name: '신한 IRP 안정형', save: '1,155,000', rate: '연 4.2%' },
                { tag: 'HOT', tagBg: '#fef3c7', tagFg: '#b45309', name: 'KB 연금저축펀드', save: '990,000', rate: '연 7.8%' },
                { tag: 'NEW', tagBg: '#d1fae5', tagFg: '#047857', name: '삼성 ISA 적립식', save: '720,000', rate: '연 5.5%' },
              ].map((p, i) => (
                <div key={i} style={{
                  minWidth: 220, background: '#fff',
                  borderRadius: 16, padding: 16,
                  border: '1px solid var(--et-border)',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <span style={{
                    alignSelf: 'flex-start', height: 22, padding: '0 8px',
                    background: p.tagBg, color: p.tagFg,
                    fontSize: 11, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center',
                    borderRadius: 6, letterSpacing: '0.02em',
                  }}>{p.tag}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--et-text-strong)' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: 'var(--et-text-mute)', fontWeight: 600 }}>절세</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--et-primary)', fontFeatureSettings: '"tnum" on', letterSpacing: '-0.02em' }}>
                      {p.save}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--et-text-mute)' }}>원</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--et-text-soft)' }}>예상 수익률 <b style={{ color: 'var(--et-text-strong)' }}>{p.rate}</b></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TabBar active="home"/>
      </div>
    </Phone>
  );
}

window.ScreenHome = ScreenHome;
