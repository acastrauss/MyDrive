import './App.css';
import './Grid.css';
import { User } from './LoginComponents/User';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='grid-container'>
          <div className='grid-loginRegister'>
            <User/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
