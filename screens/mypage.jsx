// EasyTax — My Page

function ScreenMyPage() {
  const [status, setStatus] = React.useState('');

  const clearCache = async () => {
    setStatus('삭제 중...');
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      setStatus('완료! 새로고침 중...');
      setTimeout(() => location.reload(true), 600);
    } catch {
      setStatus('오류가 발생했습니다. 수동으로 새로고침 해주세요.');
    }
  };

  return (
    <Phone>
      <div className="et-screen" style={{ background: 'var(--et-bg)' }}>
        <div className="et-appbar" style={{ background: 'var(--et-surface)' }}>
          <div className="et-appbar-title">MY</div>
        </div>

        <div className="et-scroll" style={{ padding: '20px 20px 100px' }}>

          <div className="et-card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--et-text-soft)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>앱 설정</div>

            <div className="et-row" style={{ paddingTop: 0 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--et-text-strong)' }}>캐시 삭제 및 새로고침</div>
                <div style={{ fontSize: 12, color: 'var(--et-text-mute)', marginTop: 3 }}>화면이 최신 버전으로 업데이트됩니다</div>
              </div>
              <button
                onClick={clearCache}
                disabled={!!status}
                style={{
                  height: 36, padding: '0 16px',
                  background: status ? 'var(--et-surface-alt)' : 'var(--et-primary-soft)',
                  color: status ? 'var(--et-text-mute)' : 'var(--et-primary-strong)',
                  border: 'none', borderRadius: 10,
                  fontSize: 13, fontWeight: 700,
                  cursor: status ? 'default' : 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--et-font)',
                  transition: 'background .15s',
                }}
              >
                {status || '초기화'}
              </button>
            </div>
          </div>

          <div className="et-card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--et-text-soft)', marginBottom: 16, letterSpacing: '0.04em', textTransform: 'uppercase' }}>앱 정보</div>
            <div className="et-row" style={{ paddingTop: 0 }}>
              <div style={{ fontSize: 14, color: 'var(--et-text-soft)' }}>버전</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--et-text)' }}>1.0.0</div>
            </div>
            <div className="et-row">
              <div style={{ fontSize: 14, color: 'var(--et-text-soft)' }}>서비스</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--et-text)' }}>EasyTax</div>
            </div>
          </div>

        </div>

        <TabBar />
      </div>
    </Phone>
  );
}
