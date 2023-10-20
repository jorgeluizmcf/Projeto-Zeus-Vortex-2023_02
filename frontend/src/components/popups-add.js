import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import api from "../services/api";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../styles/popups-add.css";

const PopUpAdd = (props) => {
  const { nameButton, title, confirmLabel, cancelLabel } = props;

  const [category, setCategory] = useState("");
  const [value, setValue] = useState();

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

    await api
      .post("/despesas", {
        tipoDespesa: category,
        valorDespesa: value,
      })
      .then(() => {
        alert("Despesa cadastrada com sucesso!");
      })
      .catch((error) => {
        alert("erro ao salvar despesa");
        console.log("Erro ao salvar despesa: ", error);
      });
  }

  const openInputs = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className="inteface-popup"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Centralizar verticalmente
              justifyContent: "center", // Centralizar horizontalmente
              background: "white",
              padding: "0 30px 30px 0", // Adiciona 32px de espaço interno
              borderRadius: "16px", // Arredonda as bordas com 16px
              color: "#666",
            }}
          >
            <h1>{title}</h1>
            <form className="add-group">
              <label for="categoria-despesa">Inserir categoria: </label>
              <select
                id="categoria-despesa"
                name="categoria-despesa"
                onChange={handleCategoryChange}
              >
                <option value="0">Alimentação</option>
                <option value="1">Higiene</option>
                <option value="2">Brinquedos</option>
                <option value="3">Veterinário</option>
              </select>
              
              <input className="input-teste" type={"number"} value={value} style={{"color":"black"}}onChange={(e)=>{setValue(e.target.value)}}/>
              <div className="add-button-group">
                <button className="cancel-button" onClick={onClose}>
                  Cancelar
                </button>
                <button
                  className="confirm-button"
                  onClick={(e) => {
                    handleSubmit(e);
                    onClose();
                    
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </form>
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
