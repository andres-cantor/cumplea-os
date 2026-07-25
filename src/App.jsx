import InteractiveBook from './components/InteractiveBook';
import './styles/index.css';

function App() {
  return (
    <div className="app-shell">
      <div className="app-shell__background" />
      <div className="game-shell">
        <InteractiveBook />
      </div>
    </div>
  );
}

export default App;
