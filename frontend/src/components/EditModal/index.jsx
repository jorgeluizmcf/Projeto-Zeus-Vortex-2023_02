import React, { useState } from 'react';
import api from "../../services/api";
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles.css';

const EditModal = ({ selectedDespesa, onClose, onUpdate }) => {
  const [editFormData, setEditFormData] = useState({
    tipoDespesa: selectedDespesa.tipoDespesa,
    valorDespesa: selectedDespesa.valorDespesa,
    mesDespesa: selectedDespesa.mesDespesa,
    anoDespesa: selectedDespesa.anoDespesa,
  });
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(0);

  const handleEditChange = (e, fieldName) => {
    const { value } = e.target;
    let editedValue = value;

    if (fieldName === 'valorDespesa') {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/[^0-9]/g, '');
      // Formatar o valor com uma vírgula
      editedValue = formatValue(numericValue);
    }

    setEditFormData({
      ...editFormData,
      [fieldName]: editedValue,
    });
  };

  const formatValue = (numericValue) => {
    if (!numericValue) return '';

    const cents = numericValue.slice(-2);
    const reais = numericValue.slice(0, -2);

    return reais + (cents ? ',' : '.') + cents;
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    console.log("categoria: " + newCategory);
  };

  const handleCancel = () => {
    onClose(); // Fecha o modal de edição
  };

  const handleSave = () => {
    // Construa os dados a serem enviados
    const data = {
      tipoDespesa: editFormData.tipoDespesa,
      valorDespesa: parseValue(editFormData.valorDespesa),
      mesDespesa: editFormData.mesDespesa,
      anoDespesa: editFormData.anoDespesa,
    };

    // Realize a requisição POST para atualizar os dados
    api.post(`/despesas/${selectedDespesa._id}`, data)
      .then((response) => {
        console.log('Dados atualizados:', response.data);
        onUpdate(selectedDespesa._id, data); // Atualiza a lista
        alert('Despesa atualizada!')
        onClose(); // Fecha o modal de edição
      })
      .catch((error) => {
        console.error('Erro ao atualizar dados:', error);
      });
  };

  const parseValue = (formattedValue) => {
    // Remove o símbolo de moeda e qualquer caractere não numérico
    const numericValue = (formattedValue.toString()).replace(/[^0-9,.]/g, '');
    
    // Substitua as vírgulas por pontos (para um formato numérico válido)
    const dotFormattedValue = numericValue.replace(',', '.');
    
    // Parse o valor para um número de ponto flutuante (float)
    const parsedValue = parseFloat(dotFormattedValue);
    
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  return (
    <div className="edit-modal-background">
      <div className="edit-modal-container">
        <h4>Editar Despesa</h4>
        <div>
          <form className={'edit-form'}>
            {
              <>
                <label>Categoria:</label>
                <select
                  className='dropdown-despesas'
                  id="categoria-despesa"
                  name="categoria-despesa"
                  onChange={(e) => {
                    handleEditChange(e, "tipoDespesa")
                  }}
                  value={editFormData.tipoDespesa}
                >
                  <option value="0">Alimentação</option>
                  <option value="1">Higiene</option>
                  <option value="2">Brinquedos</option>
                  <option value="3">Veterinário</option>
                </select>
                <label>Valor:</label>
                <div className='input-container'>
                  <span className="currency-symbol">R$</span>
                  <input
                    className="input-despesa"
                    type="text"
                    value={editFormData.valorDespesa}
                    onChange={(e) => {
                      handleEditChange(e, "valorDespesa")
                    }}
                    placeholder="0,00"
                    maxLength={7}
                  />
                </div>
                <label htmlFor="periodo-mes">Mês: </label>
                <select id="periodo-mes" name="periodo-mes" value={editFormData.mesDespesa} onChange={(e) => { handleEditChange(e, "mesDespesa") }
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
                <label for="periodo-ano">Ano: </label>
                <select id="periodo-ano" name="periodo-ano" value={editFormData.anoDespesa} onChange={(e) => {
                  handleEditChange(e, "anoDespesa")
                }}>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>

                <div className={'edit-button-group'}>
                  <button className={'sidebar-button'} type="button" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button className={'sidebar-button'} type="button" onClick={handleSave}>
                    Salvar
                  </button>
                </div>
              </>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
