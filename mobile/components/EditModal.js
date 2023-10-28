import React, {useState} from 'react';
import {Alert, Modal, Image, StyleSheet, Text, TouchableOpacity, Pressable, View, ActivityIndicator} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import CurrencyInput from 'react-native-currency-input';
import Api from '../Api/Api';

const EditModal = ( {refresh, setRefresh, despesa} ) => {
    const [editFormData, setEditFormData] = useState({
        tipoDespesa: despesa.tipoDespesa,
        valorDespesa: despesa.valorDespesa,
        mesDespesa: despesa.mesDespesa,
        anoDespesa: despesa.anoDespesa,
    }); 

    const [modalVisible, setModalVisible] = useState(false);
    const categorias = ["Alimentação", "Higiene", "Brinquedos", "Veterinário"]
    const month = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const year = ["2023", "2022"];
    const [value, setValue] = useState(despesa.valorDespesa);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(despesa.tipoDespesa);
    const [mesSelecionado, setMesSelecionado] = useState(despesa.mesDespesa);
    const [anoSelecionado, setAnoSelecionado] = useState(despesa.anoDespesa);

  const handleSubmit = async () => {

    const data = {
      tipoDespesa: categoriaSelecionada,
      valorDespesa: value,
      mesDespesa: mesSelecionado,
      anoDespesa: anoSelecionado,
    };

    console.log("data ", data);

    if (value === 0 || value === null) {
      console.log('O valor da despesa não pode ser zero.');
      return; // Saia da função se o valor for zero
    }
    // Realize a solicitação POST para o seu servidor
      Api.post(`/despesas/${despesa._id}`, data)
      .then((response) => {
        // Lidar com a resposta de sucesso, se necessário
        console.log('Despesa cadastrada com sucesso!', response.data);
        setValue(0);
        setModalVisible(false); // Feche o modal após o sucesso
        setRefresh(true);
      })
      .catch((error) => {
        // Lidar com erros, se necessário
        console.error('Erro ao salvar despesa:', error);
      });
      alert("Despesa adicionada!")
   };


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 28, fontWeight: "bold", color: "#504c50"}}>Editar Despesa</Text>
            <Text style={styles.modalText}>Editar categoria:</Text>
            <SelectDropdown
                  data={categorias}
                  onSelect={(selectedItem, index) => {setCategoriaSelecionada(index)}}
                  buttonStyle={styles.ButtonDropDown}
                  buttonTextStyle={styles.ButtonTextDropDown}
                  defaultValue={categorias[editFormData.tipoDespesa]}
                />
            <Text style={styles.modalText}>Editar valor:</Text>
            <CurrencyInput
                            style={{ backgroundColor: "#e0d9d2", height: 50, width: 150, borderRadius: 20, paddingLeft: 20}}
                            value={value}
                            editable={true}
                            onChangeValue={setValue}
                            prefix="R$ "
                            delimiter="."
                            separator=","
                            precision={2}
                            minValue={0}
                            maxValue={11111}
                            />
            
            <Text style={styles.modalText}>Editar mês:</Text>
                <SelectDropdown
                  data={month}
                  onSelect={(selectedItem, index) => {setMesSelecionado(selectedItem)}}
                  buttonStyle={styles.ButtonDropDown}
                  buttonTextStyle={styles.ButtonTextDropDown}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  defaultValue={editFormData.mesDespesa}
                />

            <Text style={styles.modalText}>Editar ano:</Text>
                <SelectDropdown
                  data={year}
                  onSelect={(selectedItem, index) => {setAnoSelecionado(selectedItem)}}
                  buttonStyle={styles.ButtonDropDown}
                  buttonTextStyle={styles.ButtonTextDropDown}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  defaultValue={editFormData.anoDespesa}
                />
            
            <View style={{flexDirection: "row", gap: 24}}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleSubmit}
                >
                <Text style={styles.textStyleConfirm}>Confirmar</Text>
                </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 350,
    height: 520,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#e0d9d2",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonConfirm: {
    backgroundColor: "#d7503d",
  },
  
  buttonEdit: {
    backgroundColor: '#e0d9d2',
    width: 80,
    alignItems: "center"
  },

  textStyle: {
    color: '#504c50',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textStyleConfirm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    margin: 4,
    textAlign: 'center',
  },

  add: {
    width: 55, // Largura da imagem
    height: 55, // Altura da imagem
    backgroundColor: "#6098a8",
    borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
  },

  footerButton: {
    // Estilos para os botões no rodapé
    backgroundColor: "#6098a8", // Cor de fundo do botão
    marginLeft: 93,
    marginBottom: 10,
    padding: 5, // Espaçamento interno do botão
    borderRadius: 50, // Bordas arredondadas do botão
  },

  ButtonDropDown: {
    marginBottom: 10,
    backgroundColor: "#e0d9d2",
    borderRadius: 20,
    width: 150
  },

});

export default EditModal;