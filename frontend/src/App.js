import logo from './logo.svg';
import './styles/App.css';
import './styles/global.css';
import './styles/sidebar.css';
import './styles/category-box.css';
import fotoPet from './img/foto-pet-default.jpg';

function App() {
  return (
    
    // Implementação default do React

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div id="app">

      <>
        <aside className="sidebar">
          <img className="foto-pet" src={ fotoPet } alt="Foto pet" />
          <strong className="nome-pet">Zeus</strong>

          <div className="button-group">
            <button className="sidebar-button">Botão 1</button>
            <button className="sidebar-button">Botão 2</button>
            <button className="sidebar-button">Botão 3</button>
          </div>

          <div className="separator"></div>

          <button className="logoff-button">Logoff</button>
        </aside>
      </>

      <aside className="category-box-container">
        <>
          <aside className="category-box">
            <strong>Alimentação</strong>
            <form>

              <div className="input-block">
                <label htmlFor="title">Alimentação</label>
                <input />
              </div>

              <div className="input block">
                <label htmlFor="nota">Valor</label>
                <textarea></textarea>
              </div>

              <button type="submit">Salvar</button>
            </form>
          </aside>
        </>

        <>
          <aside className="category-box">
            <strong>Higiene</strong>
            <form>

              <div className="input-block">
                <label htmlFor="title">Higiene</label>
                <input />
              </div>

              <div className="input block">
                <label htmlFor="nota">Valor</label>
                <textarea></textarea>
              </div>

              <button type="submit">Salvar</button>
            </form>
          </aside>
        </>

        <>
          <aside className="category-box">
            <strong>Brinquedos e Acessórios</strong>
            <form>

              <div className="input-block">
                <label htmlFor="title">Brinquedos e Acessórios</label>
                <input />
              </div>

              <div className="input block">
                <label htmlFor="nota">Valor</label>
                <textarea></textarea>
              </div>

              <button type="submit">Salvar</button>
            </form>
          </aside>
        </>

        <>
          <aside className="category-box">
            <strong>Veterinário</strong>
            <form>

              <div className="input-block">
                <label htmlFor="title">Veterinário</label>
                <input />
              </div>

              <div className="input block">
                <label htmlFor="nota">Valor</label>
                <textarea></textarea>
              </div>

              <button type="submit">Salvar</button>
            </form>
          </aside>
        </>
      </aside>

    </div>


  );
}

export default App;
