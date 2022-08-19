import './App.css';
import React  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Modal } from './components/modal/index.js';

function App() {
  

  return (
    <div className="App">
      <div className='nav-bar'>
        <label>Logotipo</label>
        <button className='button-login'>Entrar</button>
      </div>
      <div>
        <Cadastro>
          <Modal/>
        </Cadastro>
      </div>
    </div>
  );
}

export default App;
