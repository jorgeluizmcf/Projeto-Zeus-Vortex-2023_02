import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

export default function DespesasSwiper({ cardsData }) {

  return (
      <Swiper style={styles.swiperContainer} showsButtons={false}>
        {cardsData.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={{flexDirection: "row", gap: 24, marginTop: 16}}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Image source={card.image} style={styles.cardImage} />
            </View>

            <View style={{flexDirection: "row", gap: 16, alignItems: 'center'}}>
              <Text style={{fontSize: 24, color: "white", textAlign: 'center',}}>R$</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
            </View>
            
          </View>
        ))}
      </Swiper>
  );
}

const styles = StyleSheet.create({
  swiperContainer: {
    height: 200,
    // borderColor: "green", // Cor da borda
    // borderWidth: 2, // Largura da borda
  },
  card: {
    height: 180,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    backgroundColor: '#d7503d',
    borderRadius: 32,
    margin: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 5,
    // borderColor: "green", // Cor da borda
    // borderWidth: 2, // Largura da borda
  },
  cardImage: {
    width: 70,
    height: 70,
    // borderColor: "green", // Cor da borda
    // borderWidth: 2, // Largura da borda
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
    // borderColor: "green", // Cor da borda
    // borderWidth: 2, // Largura da borda
  },

  cardValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
    // borderColor: "green", // Cor da borda
    // borderWidth: 2, // Largura da borda
  },
});
