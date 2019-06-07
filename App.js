import React from 'react';
import { Platform, 
        StatusBar, 
        StyleSheet,
        Dimensions,
        TouchableOpacity,
        Image,
        View,
        Text,
        TextInput } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';


const width = Dimensions.get('screen').width;


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isLoadingComplete: false,
        primeiroCadastro: true,
        nome: '',
        peso: 0
    }
  }
  //state = {
  //  isLoadingComplete: false,
  //};

  componentDidMount(){
    fetch('http://192.168.0.148:8080/api/p/primeiro-cadastro').then(resposta => resposta.json()).then(json => this.setState({primeiroCadastro: json})).catch(function(error){
      console.log('Aconteceu um erro ao tentar comunicar com a API ' + error.message);
      throw error;
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
  
      //Avalia se o usuário já tá cadastrado no sistema, se já estiver cadastrado leva para tela de avaliação, se não tela de primeiro cadastro.
      if(this.state.primeiroCadastro){
        return (
          //Tela do primeiro cadastro.
          <View style={styles.divLogin}>

            <View style={styles.topo} >
              <Image style={styles.quadradoTotal} source={require('./resources/img/balanca.png')} />
              <Text style={styles.textoDestaque}> Seja bem vindo, faça seu primeiro cadastro </Text>
            </View>

            <Text style={styles.tagINput}>  Digite seu nome: </Text>
            <TextInput style={[styles.tagINput, styles.bordaInferior]} placeholder="Ex. Jackson Roberio S. dos S." ref={input => this.inputNome = input} onChangeText={texto => this.setState({nome: texto})} />
            
            <Text style={styles.tagINput}> Seu peso inicial: </Text>
            <TextInput style={[styles.tagINput, styles.bordaInferior]} placeholder="Ex. 75"  keyboardType="number-pad" ref={input => this.inputPeso = input} onChangeText={valor => this.setState({peso: valor})} />
            
            <TouchableOpacity onPress={this.primeiroUsuario.bind(this)} >
              <Image style={styles.botaoSalvar} source={require('./resources/img/botao-salvar.png')} />
            </TouchableOpacity>
          
          </View>
        );
      } else {
        return( 
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        );
      }
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  } 


  /************
   * Telas Extras
   **************/
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };


 
  /***********
   * Ações
  ************/
  primeiroUsuario(){
    //Salva o primeiro usuário no banco de dados via API.
    fetch('http://192.168.0.148:8080/api/p/', {method: 'POST', headers: {
      Accept: 'application/json', 'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "nome": this.state.nome,
        "peso": this.state.peso
      })
    });
    this.setState({primeiroCadastro: false});
    //console.warn("o nome é: " + this.state.nome + " e o peso é: " + this.state.peso);
  };


}



/************
 * CSS
************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  quadradoTotal: {
    width: width/2,
    height: width/2
  },

  textoDestaque: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },

  topo: {
    alignItems: 'center',
    backgroundColor: '#FFA500'
  },

  divLogin: {
    marginTop: 5
  },

  tagINput: {
    marginTop: 20,
    width: width
  },

  bordaInferior: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },

  botaoSalvar: {
    marginTop: 20,
    width: width,
    height: 40
  }, 
});
