import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/global.css';
import './styles/sidebar.css';
import './styles/category-box.css';
import './styles/dashboard.css';
import fotoPet from './img/foto-pet-default.jpg';
import iconeRacao from './img/icone-ração.png';
import iconeHigiene from './img/icone-higiene.png';
import iconeBrinquedos from './img/icone-brinquedos.png';
import iconeVeterinario from './img/icone-veterinario.png';

function App() {
  //importando toggleFlag
  const [isFlagged, setFlag] = useState(true);
  const toggleFlag = () => { setFlag(!isFlagged); };

  return (
    
    <div id="app">

      <aside className="sidebar">
        <img className="foto-pet" src={ fotoPet } alt="Foto pet" />
        <strong className="nome-pet">Zeus</strong>

        <div className="button-group">
          <button className="sidebar-button">Adicionar</button>
          <button className="sidebar-button">Alterar</button>
          <button className="sidebar-button">Apagar</button>
        </div>

        <div className="separator"></div>

        <button className="logoff-button">Logoff</button>
      </aside>

      <div className='screen-container'> 
        <h1>Categorias</h1>
        
        <div className='period-selecter'>
          <h2>Período</h2>
          
          <form>
            <label for="periodo-mes">Mês:</label>
            <select id="periodo-mes" name="periodo-mes">
              <option value="janeiro">janeiro</option>
              <option value="fevereiro">fevereiro</option>
              <option value="março">março</option>
              <option value="abril">abril</option>
              <option value="maio">maio</option>
              <option value="junho">junho</option>
              <option value="julho">julho</option>
              <option value="agosto">agosto</option>
              <option value="setembro">setembro</option>
              <option value="outubro">outubro</option>
              <option value="novembro">novembro</option>
              <option value="dezembro">dezembro</option>
            </select>
          </form>

          <form>
            <label for="periodo-ano">Ano:</label>
            <select id="periodo-ano" name="periodo-ano">
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </form>
        </div>


        <div className="category-box-container">
          <div className="category-box">
              <div className='flag-button-container'>

                <button className="flag-button" onClick={() => toggleFlag()}>
                    <i className="fas fa-flag"></i>
                  </button>
                </div>
                
                <strong className='category-title'>
                  Alimentação
                  <img className="category-icon" src={ iconeRacao } alt="icone de ração" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">1000,00</span>
                </div>
              </div>

              <div className="category-box">
                <div className='flag-button-container'>

                <button className="flag-button" onClick={() => toggleFlag()}>
                    <i className="fas fa-flag"></i>
                  </button>
                </div>
                
                <strong className='category-title'>
                  Higiene
                  <img className="category-icon" src={ iconeHigiene } alt="icone de Higiene" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">200,00</span>
                </div>
              </div>

              <div className="category-box">
                <div className='flag-button-container'>

                <button className="flag-button" onClick={() => toggleFlag()}>
                    <i className="fas fa-flag"></i>
                  </button>
                </div>
                
                <strong className='category-title'>
                  Brinquedos
                  <img className="category-icon" src={ iconeBrinquedos } alt="icone de brinquedos" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">200,00</span>
                </div>
              </div>

              <div className="category-box">
                <div className='flag-button-container'>

                <button className="flag-button" onClick={() => toggleFlag()}>
                    <i className="fas fa-flag"></i>
                  </button>
                </div>
                
                <strong className='category-title'>
                  Veterinário
                  <img className="category-icon" src={ iconeVeterinario } alt="icone de veterinário" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">200,00</span>
                </div>
          </div>
        </div>

        <div className='dashboard'>

          <h3>Dashboard</h3>

          <div className='dashboard-container'>
            conteudo
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
