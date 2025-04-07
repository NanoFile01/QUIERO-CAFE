import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function App() {
  const menu = [
    {
      id: '1',
      name: 'Especial Quiero Café',
      price: 20.0,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_2K8PRAUDsscQACWAfy_8Yb1XLoZPKiNRQ&s',
    },
    {
      id: '2',
      name: 'Cappuccino Brasileiro',
      price: 9.0,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRPVs2GSNKahBq2Ugas-vD-eJyrxPefZAGeA&s',
    },
    {
      id: '3',
      name: 'Espresso Belga',
      price: 15.0,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBHHkbkSNt6SUU6DDwfxp29GvPhP9MycX2Q&s',
    },
    {
      id: '4',
      name: 'Croissant',
      price: 4.0,
      image:
        'data:image/jpeg;base64,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',
    },

    {
      id: '5',
      name: 'Pancake Frutas Vermelhas',
      price: 18.5,
      image:
        'https://quierocafe.com.br/wp-content/uploads/2023/06/QUIERO_CAFE_62.jpg',
    },
  ];

  const [pedido, setPedido] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const adicionarAoPedido = (item) => {
    setPedido((prevPedido) => [...prevPedido, item]);
  };

  const removerDoPedido = (id) => {
    setPedido((prevPedido) => prevPedido.filter((item) => item.id !== id));
  };

  const calcularTotal = () => {
    return pedido.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const abrirMapa = () => {
    const url = `https://www.google.com.br/maps/place/Quiero+Caf%C3%A9/@-20.7193793,-46.6158557,17z/data=!3m1!4b1!4m6!3m5!1s0x94b6c34d796a1035:0x8d2cc7b7e5d45757!8m2!3d-20.7193843!4d-46.6132808!16s%2Fg%2F11rpft0yf0?hl=pt-BR&entry=ttu&g_ep=EgoyMDI1MDQwMS4wIKXMDSoASAFQAw%3D%3D`;
    Linking.openURL(url);
  };

  const finalizarPedido = () => {
    setModalVisible(false);
    alert('Pedido Finalizado com Sucesso!');
  };
      const [Lobster] = useFonts({
  'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
  });

  if (!Lobster) {
    return null; // Ou uma tela de loading
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho da Landing Page */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Q U I E R O{''}
        <Text style={styles.headerCafe}>CAFÉ</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Somos para todos os momentos! Opções de café da manhã, almoço, cafés,
          doces, lanches, happy hour e jantar!
        </Text>
      </View>

      {/* Menu da Cafeteria */}
      
      <LinearGradient colors={['#ffffff', '#e5a474', '#000']}
      start={{x: 0.7, y: 10.5}} 
      end={{x: 1.5, y: 0}}
      style={styles.container}>
      <Text style={styles.menuTitle}>Menu</Text>
      
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            <Button
              title="Adicionar ao Pedido"
              onPress={() => adicionarAoPedido(item)}
              color="#000"
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
        

      {/* Resumo do Pedido */}
      <View style={styles.pedido}>
        <Text style={styles.pedidoTitle}>Seu Pedido:</Text>
        {pedido.length === 0 ? (
          <Text style={styles.pedidoText}>Nenhum item adicionado</Text>
        ) : (
          pedido.map((item, index) => (
            <View key={index} style={styles.pedidoItem}>
              <Text style={styles.pedidoText}>
                {item.name} - R$ {item.price.toFixed(2)}
              </Text>
              <TouchableOpacity onPress={() => removerDoPedido(item.id)}>
                <Text style={styles.removerText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.startButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Pedido</Text>
            <Text style={styles.modalText}>
              Você está pronto para finalizar seu pedido?
            </Text>
            <Button
              title="Confirmar"
              onPress={finalizarPedido}
              color="#6f4f1f"
            />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="gray"
            />
          </View>
        </View>
      </Modal>

      {/* Localização */}
      <View style={styles.localizacao}>
        <Text style={styles.localizacaoTitle}>Onde nos encontrar</Text>
        <Text style={styles.localizacaoText}>
          Endereço: Rua Exemplo, 123, Centro, São Paulo, SP
        </Text>
        <TouchableOpacity style={styles.mapButton} onPress={abrirMapa}>
          <Text style={styles.mapButtonText}>Abrir no Google Maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 0,
  },
  header: {
    backgroundColor: '#800000',
    padding: 20,
    textAlign: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerCafe: {
    backgroundColor: '#800000',
    fontSize: 32.5,
    padding: 10,
    textAlign: 'center',
    fontFamily: 'Monoton',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 30,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#db6711',
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemImage: {
    width: 200,
    height: 160,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#000',
    marginBottom: 3,
  },
  pedido: {
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: '#fff',
    padding: 15,
  },
  pedidoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pedidoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pedidoText: {
    fontSize: 16,
    color: '#333',
  },
  removerText: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'underline',
  },
  total: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000',
  },
  startButton: {
    backgroundColor: '#db6711',
    borderWidth: 0.4,
    padding: 10,
    borderRadius: 8,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  localizacao: {
    marginTop: 0,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  localizacaoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  localizacaoText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  mapButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
  },
});
