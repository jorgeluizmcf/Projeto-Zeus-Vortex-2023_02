import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InputAdornments from './money-input';

const PopUpAdd = (props) => {
  const { nameButton, title, confirmLabel, cancelLabel } = props;

  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const openInputs = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="inteface-popup" style={{ 
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center', // Centralizar verticalmente
                                          justifyContent: 'center', // Centralizar horizontalmente
                                          background: 'white',
                                          padding: '0 30px 30px 0', // Adiciona 32px de espaço interno
                                          borderRadius: '16px', // Arredonda as bordas com 16px
                                          color: '#666'
                                        }}>
            <h1>{title}</h1>
            <label for="categoria-despesa">Inserir categoria: </label>
            <select id="categoria-despesa" name="categoria-despesa">
              <option value="0">Alimentação</option>
              <option value="1">Higiene</option>
              <option value="2">Brinquedos</option>
              <option value="3">Veterinário</option>
            </select>
            <InputAdornments
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
            <div className='add-button-group'>
              <button className="sidebar-button" onClick={onClose}>Cancelar</button>
              <button className="logoff-button"
                onClick={() => {
                  props.onConfirm(category, value);
                  onClose();
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <button className="sidebar-button" onClick={openInputs}>
      {nameButton}
    </button>
  );
};

export default PopUpAdd;
