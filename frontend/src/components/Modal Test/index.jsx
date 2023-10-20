import React, {useState} from 'react';
import api from "../../services/api";
import 'react-confirm-alert/src/react-confirm-alert.css';

import './styles.css';

const ModalTest = ({onShow, handleRefresh}) => {

    const [value, setValue] = useState();

    const [category, setCategory] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    
    const handleShowModal = () =>{
        setModalShow(!modalShow);
    }

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        console.log("categoria: " + newCategory);
    };

    const handleValueChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        console.log('valor: ' + newValue);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("valores a serem passados: " + category, value);

        if (value === undefined || value == 0){
         alert("Digite um valor válido!");
         return null}

        await api
        .post("/despesas", {
            tipoDespesa: category,
            valorDespesa: value,
        })
        .then(() => {
            console.log("Despesa cadastrada com sucesso!");
        })
        .catch((error) => {
            console.log("Erro ao salvar despesa: ", error);
        });

        setValue('');
    }

  return (
      
    <div >
        <button className={'sidebar-button'} onClick={()=>{
            handleShowModal()
            onShow();
            }} >Adicionar</button>

        {modalShow
        ?
        <div className='modal-background'>
            <div className='modal-container'>
                <h1>Adicionar Despesa</h1>
                <form className="add-group">
                <label for="categoria-despesa">Inserir categoria: </label>
                <select
                    className='dropdown-despesas'
                    id="categoria-despesa"
                    name="categoria-despesa"
                    onChange={handleCategoryChange}
                >
                    <option value="0">Alimentação</option>
                    <option value="1">Higiene</option>
                    <option value="2">Brinquedos</option>
                    <option value="3">Veterinário</option>
                </select>
                <div className='input-container'>
                    <span className="currency-symbol">R$</span>
                    <input className="input-despesa" 
                        type={"number"}
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                        step=".01"
                        maxLength = "7"
                        placeholder="0,00"/>
                </div>
                <div className="add-button-group">
                    <button className="cancel-button" onClick={()=>{
                        handleShowModal();
                        onShow();
                    }}>Cancelar</button>
                    <button
                    className="confirm-button"
                    onClick={(e)=>{
                        handleSubmit(e);
                        handleShowModal();
                        onShow();
                        handleRefresh();
                    }}>Confirmar</button>
                </div>
                </form>

            </div>
        </div>
        :
        <></>}


      </div>
  );
};

export default ModalTest;
