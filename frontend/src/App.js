import React, { useState, useEffect } from 'react';
import PopUpAlert from './components/popups-add.js';
import DemoPie from './components/graph-chart.js';
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    console.log(currentMonth);
    const currentYear = currentDate.getFullYear();
    console.log(currentYear);
    let mesAtual;

    switch (currentMonth){
      case 1:
        setSelectedMonth('janeiro');
        break;
      case 2:
        setSelectedMonth('fevereiro');
        break;
      case 3:
        setSelectedMonth('março');
        break;
      case 4:
        setSelectedMonth('abril');
        break;
      case 5:
        setSelectedMonth('maio');
        break;
      case 6:
        setSelectedMonth('junho');
        break;
      case 7:
        setSelectedMonth('julho');
        break;
      case 8:
        setSelectedMonth('agosto');
        break;
      case 9:
        setSelectedMonth('setembro');
        break;
      case 10:
        setSelectedMonth('outubro');
        break;
      case 11:
        setSelectedMonth('novembro');
        break;
      case 12:
        setSelectedMonth('dezembro');
        break;   
    }
    setSelectedYear(currentYear.toString());
  }, []);




  const dashboardData = [/* lógica para tratar os dados e enviar para fazer o gráfico de pizza*/];

  return (
    
    <div id="app">

      <aside className="sidebar">
        <img className="foto-pet" src={ fotoPet } alt="Foto pet" />
        <strong className="nome-pet">Zeus</strong>
        <div className='button-elements'> 
        <div className="button-group">
          <PopUpAlert nameButton="Adicionar"
                      title="Adicionar Despesa"
                      message="Indique a categoria e o valor da sua despesa."
                      confirmLabel="Confirmar"
                      cancelLabel="Cancelar" 
                      show={show} handleClose={handleClose} />

          <PopUpAlert nameButton="Listar"
                      title="Lista de Despesas"
                      message="Exempo de lista:
                                  -
                                  -
                                  -
                                  -"
                      confirmLabel="Confirmar"
                      cancelLabel="Cancelar" 
                      show={show} handleClose={handleClose} />
        </div>

        <div className="separator"></div>
        
        <div className='perfil-sidebar'>
          <PopUpAlert nameButton="Perfil"
                        title="Perfil"
                        message="Alterar propriedades do perfil"
                        confirmLabel="Confirmar"
                        cancelLabel="Cancelar" 
                        show={show} handleClose={handleClose} />
          <button className="logoff-button">Sair</button>
        </div>
        </div>
      </aside>

      <div className='screen-container'> 
        <h1>Categorias</h1>
        
        <div className='period-selecter'>
          <h2>Período</h2>
          
          <form>
            <label htmlFor="periodo-mes">Mês: </label>
            <select id="periodo-mes" name="periodo-mes" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
            <label for="periodo-ano">Ano: </label>
            <select id="periodo-ano" name="periodo-ano"value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </form>
        </div>


        <div className="category-box-container">
          <div className="category-box">             
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
            <div className='dashboard-graph'>
              { <DemoPie data={dashboardData}/> }
            </div>

            <div className='dashboard-recents'>
              Recentes
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
