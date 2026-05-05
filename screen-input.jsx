// Screen 1 — Input: income, family, current deductions

function ScreenInput({ onNext }) {
  return (
    <div className="page fade-up">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="eyebrow mb-8">STEP 1 · 소득·공제 입력</div>
        <h1 className="h-page mb-16">
          내 소득과 공제 내역을<br/>입력해 주세요
        </h1>
        <p className="body mb-32" style={{ fontSize: 16 }}>
          작년 원천징수영수증 기준으로 입력하면 가장 정확해요.
          AI가 약 30초 안에 절세 가능 금액을 계산해 드려요.
        </p>

        {/* Section: 소득 */}
        <div className="card mb-16">
          <div className="flex items-center justify-between mb-24">
            <h3 className="h-card">소득 정보</h3>
            <span className="badge badge-success">자동 불러옴</span>
          </div>

          <div className="col gap-16">
            <div className="field">
              <label className="field-label">총급여액 (작년 기준)</label>
              <div className="input-group">
                <input className="input" defaultValue="120,000,000" style={{ width: '100%', paddingRight: 50 }} />
                <span className="input-suffix">원</span>
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label className="field-label">근로소득 외 기타소득</label>
                <div className="input-group">
                  <input className="input" defaultValue="0" style={{ width: '100%', paddingRight: 50 }} />
                  <span className="input-suffix">원</span>
                </div>
              </div>
              <div className="field">
                <label className="field-label">현재 결정세액</label>
                <div className="input-group">
                  <input className="input" defaultValue="14,820,000" style={{ width: '100%', paddingRight: 50 }} />
                  <span className="input-suffix">원</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: 가족 */}
        <div className="card mb-16">
          <h3 className="h-card mb-24">가족 구성</h3>

          <div className="col gap-20">
            <div className="field">
              <label className="field-label">혼인 여부</label>
              <div className="chip-group">
                <button className="chip active">기혼</button>
                <button className="chip">미혼</button>
                <button className="chip">한부모</button>
              </div>
            </div>

            <div className="field">
              <label className="field-label">배우자 소득</label>
              <div className="chip-group">
                <button className="chip active">연 100만원 이하</button>
                <button className="chip">100만원 초과</button>
                <button className="chip">없음</button>
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label className="field-label">부양 자녀</label>
                <div className="chip-group">
                  <button className="chip">0명</button>
                  <button className="chip">1명</button>
                  <button className="chip active">2명</button>
                  <button className="chip">3명+</button>
                </div>
              </div>
              <div className="field">
                <label className="field-label">부양 부모</label>
                <div className="chip-group">
                  <button className="chip">0명</button>
                  <button className="chip active">1명</button>
                  <button className="chip">2명</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: 현재 공제 */}
        <div className="card mb-32">
          <div className="flex items-center justify-between mb-8">
            <h3 className="h-card">현재 가입 중인 절세 상품</h3>
          </div>
          <p className="body mb-24" style={{ fontSize: 14 }}>
            이미 가입한 상품이 있다면 입력해 주세요. 추가 납입 여력을 정확히 계산해 드려요.
          </p>

          <div className="col gap-12">
            {[
              { label: '연금저축', placeholder: '0', current: '3,000,000', limit: '600만원' },
              { label: '퇴직연금 (IRP)', placeholder: '0', current: '0', limit: '900만원 한도' },
              { label: 'ISA', placeholder: '0', current: '0', limit: '연 2,000만원' },
              { label: '주택청약종합저축', placeholder: '0', current: '2,400,000', limit: '연 300만원' },
              { label: '보장성보험료', placeholder: '0', current: '1,200,000', limit: '연 100만원' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 200px',
                gap: 16, alignItems: 'center',
                padding: '4px 0',
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>{item.limit}</div>
                </div>
                <div className="input-group">
                  <input
                    className="input"
                    defaultValue={item.current}
                    style={{ width: '100%', paddingRight: 40, height: 48, fontSize: 15 }}
                  />
                  <span className="input-suffix" style={{ fontSize: 13 }}>원</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="btn btn-primary btn-lg btn-block" onClick={onNext}>
          AI로 절세 진단 시작하기
          <ArrowIcon size={18} />
        </button>
        <p className="body text-center mt-12" style={{ fontSize: 13, color: 'var(--text-3)' }}>
          입력하신 정보는 분석 후 즉시 폐기되며, 외부로 전송되지 않아요.
        </p>
      </div>
    </div>
  );
}

window.ScreenInput = ScreenInput;
