// EasyTax — mobile app entry point
// NavCtx is created in ui-shell.jsx (loaded first)

const TAB_SCREENS = ['home', 'sim', 'report', 'mypage'];

function App() {
  const [screen, setScreen] = React.useState('home');
  const go = React.useCallback((s) => setScreen(s), []);

  return (
    <window.NavCtx.Provider value={{ screen, go }}>
      {screen === 'onboarding' && <ScreenOnboarding />}
      {screen === 'input'      && <ScreenInputInfo />}
      {screen === 'home'       && <ScreenHome />}
      {screen === 'sim'        && <ScreenSimulator />}
      {screen === 'report'     && <ScreenReport />}
      {screen === 'mypage'     && <ScreenMyPage />}
    </window.NavCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
