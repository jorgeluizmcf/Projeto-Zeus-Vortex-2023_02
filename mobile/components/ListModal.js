import React, {useState, useEffect} from 'react';
import {Alert, Modal, Image, StyleSheet, Text, TouchableOpacity, Pressable, View, ScrollView} from 'react-native';
import Api from '../Api/Api';
import EditModal from './EditModal';

const ListModal = ({ refresh, setRefresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [despesas, setDespesas] = useState([]);

  const handleDelete = async (despesa) => {
    const confirmDelete = await new Promise((resolve) => {
      Alert.alert(
        'Confirmação',
        'Tem certeza que deseja excluir?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
          { text: 'Confirmar', onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  
    if (confirmDelete) {
      try {
        const response = await Api.delete(`/despesas/${despesa._id}`);
  
        if (response.status === 200) {
          // Remova a despesa excluída da lista
          setDespesas((prevDespesas) => prevDespesas.filter((d) => d._id !== despesa._id));
          alert("Despesa deletada!")
        }
      } catch (error) {
        console.error('Erro ao excluir despesa:', error);
      }
    }
  };

  useEffect(() => {
    if (modalVisible) {
      // Realize uma requisição GET para obter os dados das despesas
      Api.get('/despesas')
        .then((response) => {
          // Atualize o estado das despesas com os dados obtidos
          setDespesas(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar despesas:', error);
        });
    }
  }, [modalVisible]);


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
            <Text style={{fontSize: 28, fontWeight: "bold", color: "#504c50"}}>Listar Despesas</Text>
          
            <ScrollView style={{height: 400, margin: 16}}>
              {despesas.map((despesa) => (
                <View key={despesa._id} style={styles.despesaCard}>
                  <Text style = {styles.textStyle}>Categoria: {despesa.tipoDespesa}</Text>
                  <Text style = {styles.textStyle}>Valor: R$ {despesa.valorDespesa.toFixed(2).replace('.', ',')}</Text>
                  <Text style = {styles.textStyle}>Mês: {despesa.mesDespesa}</Text>
                  <Text style = {styles.textStyle}>Ano: {despesa.anoDespesa}</Text>
                  <View style={styles.buttonGroup}>

                    <EditModal refresh={refresh} setRefresh={setRefresh} despesa={despesa} />

                    {/* <TouchableOpacity
                      style={[styles.button, styles.buttonEdit]}
                      onPress={() => {
                        // Lógica para editar a despesa
                      }}
                    >
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={[styles.button, styles.buttonDelete]}
                      onPress={()=>handleDelete(despesa)}
                    >
                      <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setRefresh(true);
              }}>
              <Text style={styles.textStyleCancel}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require("../assets/list-icon.png")}
              style={styles.list}
            />
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 350,
    height: 500,
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

  buttonGroup:{
    padding: 4,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#e0d9d2',
  },

  buttonEdit: {
    backgroundColor: '#e0d9d2',
    width: 80,
    alignItems: "center"
  },

  buttonDelete: {
    backgroundColor: '#e0d9d2',
    width: 80,
    alignItems: "center"
  },

  textStyle: {
    color: 'white',
    textAlign: "left",
  },

  textStyleCancel:{
    color: "#504c50",
    fontWeight: "bold"
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  list: {
    width: 40, // Largura da imagem
    height: 40, // Altura da imagem
    backgroundColor: "#468c9c",
    borderRadius: 50, // Bordas arredondadas (metade da largura/altura)
  },

  footerButton: {
    // Estilos para os botões no rodapé
    backgroundColor: "#468c9c", // Cor de fundo do botão
    marginLeft: 70,
    marginBottom: 4,
    padding: 10, // Espaçamento interno do botão
    borderRadius: 50, // Bordas arredondadas do botão
  },

  despesaCard: {
    width: 230,
    height: 160,
    margin:10,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#d7503d",
 }

});

export default ListModal;