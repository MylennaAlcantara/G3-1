import './App.css';
import React  from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Modal } from './components/modal/index.js';

function App() {
  

  return (
    <div className="App">
      <Cadastro>
        <Modal/>
      </Cadastro>
      
    </div>
  );
}

export default App;
