import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  
  constructor() {
    super();
    this.state = {
        data: new Date(),
        peso: 0
    }
  }
  
  static navigationOptions = {
    title: 'Registrar nova medida de peso',
  };

  render() {
    
    return(
      //NEcessário para alinhar todos no centro da tela
      <View style={[styles.tela, styles.vertical]}>
        <View>
          
          <View style={styles.viewTitulo}>
            <Text style={styles.texto} > Quanto você está pesando HOJE?  </Text>
          </View>
          
          
          <View style={styles.vertical}>
            <TextInput style={styles.input} placeholder="Ex. 75"  keyboardType="number-pad" ref={input => this.inputPeso = input} onChangeText={valor => this.setState({peso: valor})} />
          
            <TouchableOpacity onPress={this.registrarNovoPeso.bind(this)} >
                <Image style={styles.icone} source={require('../resources/img/enviar.png')} />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
    
    //return <ExpoConfigView />;
  }

  /***********
   * Ações
  ************/
 registrarNovoPeso(){
    fetch('http://192.168.0.148:8080/api/m/hoje', {method: 'POST', headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
      }, body: JSON.stringify({
        //"nome": this.state.data,
        "peso": this.state.peso
      })
    });

    this.inputPeso.clear();
  };


}


/************ 
 * CSS
************/
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
  },
  
  viewTitulo: {
    flexDirection: 'row',
    //alignItems: 'flex-end',
    marginLeft: 45,
    marginBottom: 20,
  },

  texto: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    //flex: 1
  },

  vertical: {
    flexDirection: 'row'
  },
  
  input: {
    flex: 1,
    height: 40,
    marginLeft: 45,
  },

  icone: {
    width: 30,
    height: 30
  },

  bordaInferior: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
});
