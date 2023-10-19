import React, { useState, useEffect } from 'react';
import api from './services/api';
import PopUpAdd from './components/popups-add.js';
import PopUpAlert from './components/popups-alert.js';
import DemoPie from './components/graph-chart.js';
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

  const [selectedMonth, setSelectedMonth] = useState('outubro');
  const [selectedYear, setSelectedYear] = useState(2023);

  const [despesaAlimentacao, setDespesaAlimentacao] = useState(0);
  const [despesaHigiene, setDespesaHigiene] = useState(0);
  const [despesaBrinquedos, setDespesaBrinquedos] = useState(0);
  const [despesaVeterinario, setDespesaVeterinario] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();

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
      default:
        //apenas para tirar warning
        ;   
    }
    //setSelectedYear(currentYear.toString());
  }, []);

    // Use useEffect para chamar a função de busca de valores quando a página carregar e quando os valores de mês ou ano mudarem
    useEffect(() => {
      fetchCategoriaValues(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);
  
    // Função para buscar os valores das categorias com base no mês e ano selecionados
    const fetchCategoriaValues = (mes, ano) => {
      const categorias = [0, 1, 2, 3]; // Um array de IDs de categoria
    
      categorias.forEach((categoriaId) => {
        api.get(`/calcular-total-mes/${mes}/${ano}/${categoriaId}`).then((response) => {
          // Atualize os estados das despesas com os valores da resposta da API
          switch (categoriaId) {
            case 0:
              setDespesaAlimentacao(response.data.total);
              console.log(despesaAlimentacao);
              break;
            case 1:
              setDespesaHigiene(response.data.total);
              console.log(despesaHigiene);
              break;
            case 2:
              setDespesaBrinquedos(response.data.total);
              console.log(despesaBrinquedos);
              break;
            case 3:
              setDespesaVeterinario(response.data.total);
              console.log(despesaVeterinario);
              break;
            default:
              // Lidar com outros IDs de categoria, se necessário
              break;
          }
        });
      });
    };
  
    // Função para lidar com a mudança nos dropdowns de mês e ano
    const handleDropdownChange = (event) => {
      const { name, value } = event.target;
      if (name === 'mes') {
        setSelectedMonth(value);
      } else if (name === 'ano') {
        setSelectedYear(value);
      }
    };

  const dashboardData = [despesaAlimentacao, despesaHigiene, despesaBrinquedos, despesaVeterinario];
  console.log(dashboardData);

  return (
    
    <div id="app">

      <aside className="sidebar">
        <img className="foto-pet" src={ fotoPet } alt="Foto pet" />
        <strong className="nome-pet">Zeus</strong>
        <div className='button-elements'> 
        <div className="button-group">
          <PopUpAdd nameButton="Adicionar"
                      title="Adicionar Despesa"
                      message="Indique a categoria e o valor da sua despesa."
                      confirmLabel="Confirmar"
                      cancelLabel="Cancelar" 
                      show={show} handleClose={handleClose} />

          <PopUpAdd nameButton="Listar"
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
          <PopUpAdd nameButton="Perfil"
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
          
         
            <label htmlFor="periodo-mes">Mês: </label>
            <select id="periodo-mes" name="periodo-mes" value={selectedMonth} onChange={(e) =>{ 
              setSelectedMonth(e.target.value)
              fetchCategoriaValues(e.target.value,selectedYear)
          }
            }>
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
          

          <form>
            <label for="periodo-ano">Ano: </label>
            <select id="periodo-ano" name="periodo-ano"value={selectedYear} onChange={(e) =>{ setSelectedYear(e.target.value)
            fetchCategoriaValues(selectedMonth,e.target.value)
            }}>
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
                  <span className="calculated-value">{despesaAlimentacao}</span>
                </div>
              </div>

              <div className="category-box">
                <strong className='category-title'>
                  Higiene
                  <img className="category-icon" src={ iconeHigiene } alt="icone de Higiene" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">{despesaHigiene}</span>
                </div>
              </div>

              <div className="category-box">
                <strong className='category-title'>
                  Brinquedos
                  <img className="category-icon" src={ iconeBrinquedos } alt="icone de brinquedos" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">{despesaBrinquedos}</span>
                </div>
              </div>

              <div className="category-box">   
                <strong className='category-title'>
                  Veterinário
                  <img className="category-icon" src={ iconeVeterinario } alt="icone de veterinário" />                
                </strong>

                <div className="price-info">
                  <span>R$</span>
                  <span className="calculated-value">{despesaVeterinario}</span>
                </div>
          </div>
        </div>

        <div className='dashboard'>

          <h3>Dashboard</h3>

          <div className='dashboard-container'>
            <div className='dashboard-graph'>
              { <DemoPie givenData={dashboardData}/> }
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
