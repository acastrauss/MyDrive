import './App.css';
import './Grid.css';
import { LoginRegisterContainer } from './LoginComponents/LoginRegisterContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='grid-container'>
          <div className='grid-loginRegister'>
            <LoginRegisterContainer/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
