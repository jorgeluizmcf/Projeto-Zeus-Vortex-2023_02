import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles.css';

const ListModal = ({ onShow, handleRefresh }) => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [despesas, setDespesas] = useState([]);

  const [editing, setEditing] = useState(false);
  const [selectedDespesa, setSelectedDespesa] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const [editFormData, setEditFormData] = useState({
    tipoDespesa: '',
    valorDespesa: '',
    mesDespesa: '',
    anoDespesa: '',
  });

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const { _id } = selectedDespesa;
    try {
      await api.put(`/despesas/${_id}`, editFormData); // Substitua pelo endpoint correto
      // Atualize a lista de despesas após a edição
      getDespesas();
      setEditing(false);
      setSelectedDespesa(null);
    } catch (error) {
      console.error('Erro ao editar despesa:', error);
    }
  };

  const handleEdit = (despesa) => {
    setEditing(true);
    setSelectedDespesa(despesa);
  };

  const handleDelete = (despesa) => {
    // Implemente a lógica para deletar a despesa aqui
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedDespesa(null);
  };

  async function getDespesas() {
    try {
      const response = await api.get('/despesas'); // Faça a requisição para listar as despesas
      setDespesas(response.data); // Atualize o estado com os dados obtidos
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    }
  }

  async function getCategories() {
    try {
      const response = await api.get('/categorias'); // Substitua pelo endpoint correto
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }

  useEffect(() => {
    if (modalShow) {
      getDespesas();
      getCategories(); // Obtenha as categorias ao abrir o modal
    }
  }, [modalShow]);

  return (
    <div>
      <button className={'sidebar-button'} onClick={() => {
        handleShowModal();
        onShow();
      }}>Listar</button>

      {modalShow
        ? 
        <div className='list-modal-background'>
          <div className='list-modal-container'>
            <h4>Listar Despesas</h4>

            <div className="despesas-list">
              {despesas.map((despesa) => (
                <div key={despesa._id} className="despesa-card">
                  <div>Tipo: {despesa.tipoDespesa}</div>
                  <div>Valor: R$ {despesa.valorDespesa.toFixed(2).replace('.', ',')}</div>
                  <div>Mês: {despesa.mesDespesa}</div>
                  <div>Ano: {despesa.anoDespesa}</div>
                  <div>
                    <button className='cancel-button' onClick={() => handleEdit(despesa)}>Editar</button>
                    <button className='cancel-button' onClick={() => handleDelete(despesa)}>Excluir</button>
                  </div>
                </div>
              ))}

              {editing && selectedDespesa ? (
                <div className="edit-despesa-form">
                  <h4>Editar Despesa</h4>
                  <form onSubmit={handleSubmitEdit}>
                    <select
                      name="tipoDespesa"
                      value={editFormData.tipoDespesa}
                      onChange={handleEditChange}
                    >
                      <option value="">Selecione a categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria._id} value={categoria._id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="valorDespesa"
                      value={editFormData.valorDespesa}
                      onChange={handleEditChange}
                      // Adicione a máscara de formatação aqui
                    />
                    <input
                      type="text"
                      name="mesDespesa"
                      value={editFormData.mesDespesa}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      name="anoDespesa"
                      value={editFormData.anoDespesa}
                      onChange={handleEditChange}
                    />
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </form>
                </div>
              ) : null}
            </div>

            <div className="add-button-group">
              <button className="cancel-button" onClick={() => {
                handleShowModal();
                onShow();
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        : <></>}
    </div>
  );
};

export default ListModal;
