import './App.css';
import React ,{useState} from 'react';
import { Cadastro } from './components/cadastro/index.js';
import { Modal } from './components/modal/index.js';

function App() {
  return (
    <div className="App">
      <Cadastro/>
      <Modal/>
    </div>
  );
}

export default App;
