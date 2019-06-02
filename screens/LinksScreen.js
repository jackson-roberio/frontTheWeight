import React from 'react';
import { ScrollView, StyleSheet,Text,View, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
        mudancas: []
    }
  }

  static navigationOptions = {
    title: 'Histórico',
  };

  componentDidMount(){
      fetch('http://192.168.0.148:8080/api/m/historico').then(resposta => resposta.json()).then(json => this.setState({mudancas: json})).catch(function(error){
        console.log('Aconteceu um erro ao tentar comunicar com a API ' + error.message);
        throw error;
      });
  }

  render() { 



    return (
      <FlatList style={styles.container} keyExtractor={item => item.id} data={this.state.mudancas}
          renderItem={ ({item}) => 
            
            <View id={item.id} style={styles.conteudoLista}>
              <Text style={styles.centralizado}>
                  {item.data} -> {item.peso}
              </Text>
            </View> }
      />

    );

       //<ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your content, we just wanted to provide you with some helpful links */}
        //<ExpoLinksView />
      //</ScrollView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },

  conteudoLista: {
    //-flexDirection: 'row',
    
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },

  centralizado: {
    alignItems: 'center',
  }
});
