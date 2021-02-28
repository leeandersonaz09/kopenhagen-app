import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { LogBox, View, SafeAreaView, TouchableOpacity, TextInput, Alert, FlatList, ActivityIndicator, Text } from 'react-native';
import { Icon, Spinner } from 'native-base';
import styles from './styles';
import { colors, metrics } from '../../styles';
import { ExplorerList} from '../../components';
import { useFirebase } from '../../config/firebase'
LogBox.ignoreAllLogs(true);

function Explorer({ route, navigation }) {
  const { getDataExplorer, getmoreDataExplorer } = useFirebase();

  const [limit] = useState(10);
  const { category } = route.params;

  const [lastVisible, setLastVisible] = useState(null);
  const [documentData, setdocumentData] = useState([]);
  const [dataBackup, setdataBackup] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState(null);
  const [barIcon, setbarIcon] = useState('ios-search');

  useEffect(() => {

   const unsubscribe =  getData()
    const checkifisConnected = CheckConnectivity();
    // Unsubscribe from events when no longer in use
    return () => {
      checkifisConnected;
      unsubscribe;      
    };

  }, []);

  const CheckConnectivity = async () => {

    await NetInfo.fetch().then(state => {

      if (state.isConnected) {
        //Alert.alert("You are online!");
      } else {
        Alert.alert("Você está sem conexão! Conecte seu dispositivo para visualizar o catálogo!");
      }

    });
  };

  const getData = async () => {

    setLoading(true);

    getDataExplorer(category, limit, (querySnapshot) => {

      if (!querySnapshot.empty) {
        const list = [];

        // Get the last document
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastVisible);

        querySnapshot.forEach(doc => {

          const { img, tittle, description, price, data } = doc.data();
          list.push({
            id: doc.id,
            img,
            description,
            title: tittle,
            price,
            data,
          });
        });

        setdataBackup(list);
        setdocumentData(list);
        setTimeout(() => {
          setLoading(false);
        }, 1000);

      } else {
        setdocumentData(null)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    })
  }

  // Retrieve More
  const retrieveMore = async () => {
    setRefreshing(true);

    getmoreDataExplorer(
      category, limit, lastVisible,
      (querySnapshot) => {

        const list = [];
        // Get the last document
        let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(lastVisible);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {

            const { img, tittle, description, price, data } = doc.data();
            list.push({
              id: doc.id,
              img,
              description,
              title: tittle,
              price,
              data,
            });
          });
          setdataBackup([...documentData, ...list]);
          setdocumentData([...documentData, ...list]);
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);
        }
      
      }
    )
    setRefreshing(false);
  };

  //SearchBar 
  const filterItem = (event) => {
    var text = event.nativeEvent.text

    if (text == '') {
      setbarIcon('ios-search');
    } else {
      setbarIcon('ios-arrow-back-outline');
    }

    setQuery(text);

    const newData = dataBackup.filter(item => {
      const itemData = `${item.data.toUpperCase()} ${item.title.toUpperCase()} ${item.price.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setdocumentData(newData);

  };

  const searchIconBack = () => {

    if (barIcon == 'ios-arrow-back-outline') {
      setbarIcon('ios-search')
      setQuery(null)
      getData();
    }

  }

  const renderItens = (item, index) => {
    return (
      <>
        <View key={item.id} style={{ backgroundColor: '#fff' }}>
          <TouchableOpacity
            onPress={() => navigation.push('Detalhes', item,)}
          >
            <View style={styles.separatorContainer}>
              <ExplorerList data={item} />
            </View>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  const checkHaveItens = () => {

    if (documentData) {

      return (
        <FlatList
          style={{ marginBottom: 40 }}
          data={documentData}
          renderItem={({ item, index }) => renderItens(item, index)}
          // On End Reached (Takes a function)
          onEndReached={() => retrieveMore()}
          onEndReachedThreshold={0.1}
          keyExtractor={item => item.id}
          refreshing={refreshing}
          ListFooterComponent={() => renderFooter()}
        />
      )
    } else {
      return (
        <>
          <View style={{
            flex: 1,
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 180
          }}>
            <View>
              <Text style={styles.textMessage}>Não há nenhum item nessa categoria...</Text>
            </View>

          </View>
        </>
      )
    }
  }

  const renderFooter = () => {
    if (!refreshing) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  const LoadingAnimation = () => {

    return (
      <>
        <View style={{
          flex: 1,
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 180
        }}>
          <View>
            <Spinner color='red' />
            <Text style={styles.textMessage}>Aguarde, procurando itens disponíveis...</Text>
          </View>

        </View>
      </>
    )

  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.SectionStyle, { backgroundColor: colors.white }]}>
            <TouchableOpacity onPress={() => searchIconBack()}>
              <Icon style={{ fontSize: 28, color: colors.text, marginLeft: metrics.baseMargin }} name={barIcon} />
            </TouchableOpacity>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="O que procura..."
              placeholderTextColor="gray"
              value={query}
              onChange={(value) => {
                filterItem(value);
                //filterItem(event.target.value);
              }}
              style={[styles.input, { backgroundColor: colors.white, color: colors.text }]}
            />
          </View>
        </View>

        {loading ? (LoadingAnimation()) : (checkHaveItens())}

      </SafeAreaView>
    </>
  );
}

export default Explorer;