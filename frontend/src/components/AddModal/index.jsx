import React, { useState } from 'react';
import api from "../../services/api";
import 'react-confirm-alert/src/react-confirm-alert.css';

import './styles.css';

const AddModal = ({ onShow, handleRefresh }) => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => {
    setModalShow(!modalShow);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    console.log("categoria: " + newCategory);
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    // Remove todos os caracteres não numéricos
    const numericValue = newValue.replace(/[^0-9]/g, '');

    // Formatar o valor com uma vírgula
    const formattedValue = formatValue(numericValue);

    setValue(formattedValue);
    console.log('valor: ' + formattedValue);
  };

  const formatValue = (numericValue) => {
    if (!numericValue) return '';

    const cents = numericValue.slice(-2);
    const reais = numericValue.slice(0, -2);

    return reais + (cents ? ',' : '.') + cents;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("valores a serem passados: " + category, value);

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
    <div>
      <button className={'sidebar-button'} onClick={() => {
        handleShowModal();
        onShow();
      }}>Adicionar</button>

      {modalShow
        ? 
        <div className='modal-background'>
          <div className='modal-container'>
            <h1>Adicionar Despesa</h1>
            <form className="add-group">
              <label htmlFor="categoria-despesa">Inserir categoria: </label>
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
                <input
                  className="input-despesa"
                  type="text"
                  value={value}
                  onChange={handleValueChange}
                  placeholder="0,00"
                  maxLength={7}
                />
              </div>
              <div className="add-button-group">
                <button className="cancel-button" onClick={() => {
                  handleShowModal();
                  onShow();
                }}>Cancelar</button>
                <button
                  className="confirm-button"
                  onClick={(e) => {
                    handleSubmit(e);
                    handleShowModal();
                    onShow();
                    handleRefresh();
                  }}>Confirmar</button>
              </div>
            </form>
          </div>
        </div>
        : <></>}
    </div>
  );
};

export default AddModal;
