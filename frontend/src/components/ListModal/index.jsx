import React, { useState, useEffect } from 'react';
import EditModal from '../EditModal';
import api from "../../services/api";
import 'react-confirm-alert/src/react-confirm-alert.css';
import './styles.css';

const ListModal = ({ onShow, handleRefresh }) => {
  const [modalShow, setModalShow] = useState(false);
  const [despesas, setDespesas] = useState([]);
  const [category, setCategory] = useState(0); // Adicione esta linha
  const [value, setValue] = useState(''); // Adicione esta linha

  const [editing, setEditing] = useState(false);
  const [selectedDespesa, setSelectedDespesa] = useState(null);
  // Adicione um estado local para controlar a exibição do EditModal
  const [editModalShow, setEditModalShow] = useState(false);

  const [editFormData, setEditFormData] = useState({
    tipoDespesa: '',
    valorDespesa: '',
    mesDespesa: '',
    anoDespesa: '',
  });

  const [categorias, setCategorias] = useState([]); // Adicione esta linha

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
    setValue(formatValue(numericValue));
  };

  const formatValue = (numericValue) => {
    if (!numericValue) return '';

    const cents = numericValue.slice(-2);
    const reais = numericValue.slice(0, -2);

    return reais + (cents ? ',' : '.') + cents;
  };

  const handleEdit = (despesa) => {
    setEditing(true);
    setSelectedDespesa(despesa);
    // Defina o estado para exibir o EditModal
    setEditModalShow(true);
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
      // Feche o EditModal
      setEditModalShow(false);
    } catch (error) {
      console.error('Erro ao editar despesa:', error);
    }
  };

  const handleDelete = async (despesa) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir?');
  
    if (confirmDelete) {
      try {
        const response = await api.delete(`/despesas/${despesa._id}`);
  
        if (response.status === 200) {
          // Remova a despesa excluída da lista
          setDespesas((prevDespesas) => prevDespesas.filter((d) => d._id !== despesa._id));
        }
      } catch (error) {
        console.error('Erro ao excluir despesa:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedDespesa(null);
    // Feche o EditModal
    setEditModalShow(false);
  };

  async function getDespesas() {
    try {
      const response = await api.get('/despesas'); // Faça a requisição para listar as despesas
      setDespesas(response.data); // Atualize o estado com os dados obtidos
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    }
  }


  useEffect(() => {
    if (modalShow) {
      getDespesas();
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
                  <div>Categoria: {
                    {
                      0: 'Alimentação',
                      1: 'Higiene',
                      2: 'Brinquedos',
                      3: 'Veterinário',
                    }[despesa.tipoDespesa] || 'Desconhecida'
                  }</div>
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
                <EditModal
                  selectedDespesa={selectedDespesa}
                  onClose={() => handleCancel()} // Fecha o EditModal
                  onUpdate={() => getDespesas()} // Atualiza a lista de despesas após a edição
                />
              ) : null}
            </div>

            <div className="add-button-group">
              <button className="cancel-button" onClick={() => {
                handleShowModal();
                onShow();
                window.location.reload();
              }}>Cancelar</button>
            </div>
          </div>
        </div>
        : <></>}
    </div>
  );
};

export default ListModal;
