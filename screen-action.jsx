// Screen 4 — Action plan: recommended products with deep links

const ACTIONS = [
  {
    name: '연금저축펀드 가입',
    sub: '미래에셋 글로벌 멀티에셋',
    amount: 6000000,
    monthly: 500000,
    save: 990000,
    badge: '가장 큰 절세 효과',
    badgeColor: 'badge-accent',
    color: '#3182F6',
    why: '총급여 1.2억 구간에선 연금저축 600만원 한도가 가장 효율적이에요. 13.2% 세액공제로 즉시 79.2만원 환급, 추가로 운용수익 비과세 혜택까지.',
    steps: ['미래에셋증권 앱 접속', '연금저축계좌 개설', '월 50만원 자동이체 설정', '글로벌 멀티에셋 70% / 채권 30% 배분'],
  },
  {
    name: 'IRP 추가 납입',
    sub: '연금저축과 합산 900만원까지',
    amount: 3000000,
    monthly: 250000,
    save: 495000,
    badge: '기존 가입자 추천',
    badgeColor: 'badge',
    color: '#00C896',
    why: '회사 퇴직연금 IRP에 본인이 추가로 300만원 더 납입하면, 연금저축과 합산해 900만원 한도가 모두 채워져요.',
    steps: ['회사 IRP 계좌 확인', '본인 추가 납입 등록', '월 25만원 자동이체', 'TDF 2045 100% 배분'],
  },
  {
    name: 'ISA 계좌 개설',
    sub: '서민형 또는 일반형',
    amount: 20000000,
    monthly: 1666000,
    save: 0,
    saveNote: '비과세·분리과세',
    badge: '만기 시 추가 절세',
    badgeColor: 'badge',
    color: '#FFB800',
    why: '3년 만기 후 연금계좌로 이체하면, 이체액의 10% (최대 300만원)까지 추가 세액공제. 운용 중 수익은 200만원까지 비과세.',
    steps: ['ISA 계좌 개설 (1인 1계좌)', '연 2,000만원 한도 내 납입', '국내 ETF 60% / 해외 ETF 40% 배분', '3년 만기 후 연금계좌 이체'],
  },
  {
    name: '지정기부금',
    sub: '관심 단체에 기부',
    amount: 1000000,
    monthly: 83000,
    save: 131000,
    badge: '의미 있는 절세',
    badgeColor: 'badge',
    color: '#FF8A4C',
    why: '지정기부금은 15% 세액공제 (1천만원 이하). 응원하는 단체에 기부하면서 13.1만원 절세까지 가능해요.',
    steps: ['관심 비영리 단체 선정', '월 정기 후원 신청', '기부금 영수증 자동 수령 설정'],
  },
];

function ScreenAction({ onRestart }) {
  const total = ACTIONS.reduce((s, a) => s + a.save, 0);
  return (
    <div className="page fade-up">
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div className="eyebrow mb-8">STEP 4 · 실행 플랜</div>
        <h1 className="h-page mb-12">
          이대로 실행하면<br/>
          <span style={{ color: 'var(--accent)' }}>{fmt(total)}원</span> 절세 완료
        </h1>
        <p className="body mb-32" style={{ fontSize: 16 }}>
          순서대로 4단계만 실행하면 돼요. 각 항목에서 바로 가입·이체 신청을 진행할 수 있어요.
        </p>

        {/* Timeline */}
        <div className="card mb-24" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--line)',
            background: 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="flex items-center gap-12">
              <h3 className="h-card">실행 순서</h3>
              <span className="badge badge-success">평균 12분 소요</span>
            </div>
            <span className="muted" style={{ fontSize: 13 }}>예상 완료 · 2026년 12월 31일까지</span>
          </div>

          <div>
            {ACTIONS.map((a, i) => (
              <ActionCard key={i} item={a} idx={i} last={i === ACTIONS.length - 1} />
            ))}
          </div>
        </div>

        {/* Calendar reminder */}
        <div className="mb-24">
          <div className="card">
            <div className="flex items-center gap-12 mb-16">
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'var(--accent-soft)',
                display: 'grid', placeItems: 'center', fontSize: 20,
              }}>📅</div>
              <h3 className="h-card">자동 리마인더 설정</h3>
            </div>
            <p className="body" style={{ fontSize: 14, marginBottom: 16 }}>
              연말정산 마감 1개월 전, 추가 납입 여력이 남아 있다면 알려드릴게요.
            </p>
            <button className="btn btn-ghost btn-sm">알림 받기 설정</button>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: 20,
          background: 'var(--surface-2)',
          borderRadius: 12,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>
            ⓘ 안내
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6, margin: 0 }}>
            본 분석 결과는 입력하신 정보를 기반으로 한 시뮬레이션이며, 실제 세액은 종합소득세 신고 또는 연말정산 시점의 세법, 추가 소득·공제 항목에 따라 달라질 수 있어요.
            상품 가입 전 각 금융기관의 약관과 위험요소를 반드시 확인해 주세요.
          </p>
        </div>

        <div className="row gap-12">
          <button className="btn btn-ghost btn-lg" style={{ flex: 1 }} onClick={onRestart}>
            처음부터 다시
          </button>
          <button className="btn btn-primary btn-lg" style={{ flex: 2 }}>
            전체 플랜 PDF로 받기
            <ArrowIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ item, idx, last }) {
  const [open, setOpen] = React.useState(idx === 0);
  return (
    <div style={{
      borderBottom: last ? 'none' : '1px solid var(--line)',
      padding: '24px 28px',
      position: 'relative',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 200px 140px',
        gap: 20, alignItems: 'center',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: item.color,
          color: 'white',
          display: 'grid', placeItems: 'center',
          fontWeight: 800, fontSize: 16,
        }}>{idx + 1}</div>

        <div>
          <div className="row gap-8 items-center mb-4" style={{ marginBottom: 4 }}>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
              {item.name}
            </h4>
            <span className={`badge ${item.badgeColor}`} style={{ fontSize: 11 }}>
              {item.badge}
            </span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
            {item.sub} · 월 {fmt(item.monthly)}원
          </div>
        </div>

        <div className="text-right">
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 2 }}>추가 납입</div>
          <div className="num" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)' }}>
            {fmt(item.amount)}원
          </div>
        </div>

        <div className="text-right">
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 2 }}>절감 세액</div>
          <div className="num" style={{
            fontSize: 18, fontWeight: 800,
            color: item.save > 0 ? 'var(--accent)' : 'var(--text-2)',
          }}>
            {item.save > 0 ? `+${fmt(item.save)}원` : item.saveNote || '—'}
          </div>
        </div>
      </div>

      {/* Expandable detail */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: 14, marginLeft: 56,
          background: 'none', border: 'none',
          color: 'var(--accent)', fontSize: 13, fontWeight: 700,
          padding: 0, display: 'flex', alignItems: 'center', gap: 4,
        }}
      >
        {open ? '간략히' : '실행 방법 보기'}
        <span style={{
          display: 'inline-block',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform .2s',
        }}><ArrowIcon size={12} /></span>
      </button>

      {open && (
        <div className="fade-up" style={{
          marginTop: 16, marginLeft: 56,
          background: 'var(--surface-2)',
          borderRadius: 12, padding: 20,
        }}>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16 }}>
            {item.why}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            실행 단계
          </div>
          <div className="col gap-8">
            {item.steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'white', border: `2px solid ${item.color}`,
                  display: 'grid', placeItems: 'center',
                  fontSize: 11, fontWeight: 800, color: item.color,
                  flexShrink: 0,
                }}>{i + 1}</div>
                <span style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
          <div className="row gap-8 mt-16">
            <button className="btn btn-primary btn-sm">
              지금 시작하기
              <ArrowIcon size={12} />
            </button>
            <button className="btn btn-ghost btn-sm">나중에</button>
          </div>
        </div>
      )}
    </div>
  );
}

window.ScreenAction = ScreenAction;
