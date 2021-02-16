import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import NetInfo from '@react-native-community/netinfo';
import { LogBox, View, SafeAreaView, TouchableOpacity, TextInput, Alert, FlatList, ActivityIndicator, Text } from 'react-native';
import { Icon } from 'native-base';
import * as firebase from 'firebase';
import styles from './styles';
import { colors, metrics } from '../../styles';
import { ExplorerList, Shimmer } from '../../components';

LogBox.ignoreAllLogs(true);

function Explorer({ route, navigation }) {

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

    const unsubscribe = getData();

    const checkifisConnected = CheckConnectivity();
    // Unsubscribe from events when no longer in use
    return () => {
      checkifisConnected;
      unsubscribe;
    };

  }, []);

  const dataRef = firebase.firestore().collection('Produtos').where("category", "==", category).orderBy('data', 'desc');

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

    try {
      await dataRef.limit(limit)
        .onSnapshot(querySnapshot => {
         if(!querySnapshot.empty){
          const list = [];

          // Get the last document
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLastVisible(lastVisible);

          querySnapshot.forEach(doc => {

            const { img, tittle, description, size, price, color1, color2, color3, color4, color5, color6, data } = doc.data();
            list.push({
              key: doc.id,
              size,
              img,
              description,
              tittle,
              price,
              data,
              color1,
              color2,
              color3,
              color4,
              color5,
              color6
            });
          });

          setdataBackup(list);
          setdocumentData(list);
          setTimeout(() => {
            setLoading(false);
          }, 2000);

         }
        })
    } catch (error) {
      console.log(error)
    }

  }

  // Retrieve More
  const retrieveMore = async () => {

    setRefreshing(true);

    try {

      await dataRef.startAfter(lastVisible.data().data).limit(limit)
        .onSnapshot(querySnapshot => {

          if(!querySnapshot.empty){

            const list = [];

          // Get the last document
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLastVisible(lastVisible);

          querySnapshot.forEach(doc => {

            const { img, tittle, description, size, price, color1, color2, color3, color4, color5, color6, data } = doc.data();
            list.push({
              key: doc.id,
              size,
              img,
              description,
              tittle,
              price,
              data,
              color1,
              color2,
              color3,
              color4,
              color5,
              color6
            });
          });

          setdataBackup([...documentData, ...list]);
          setdocumentData([...documentData, ...list]);
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
          }
          setRefreshing(false);
        });
    } catch (error) {
      console.log(error);
    }



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
      const itemData = `${item.data.toUpperCase()} ${item.tittle.toUpperCase()} ${item.price.toUpperCase()} ${item.size.toUpperCase()} ${item.description.toUpperCase()}`;
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

  const renderItens = useCallback(
    (item, index) => {
      return (
        <>
          <View key={index} style={{ backgroundColor: '#fff' }}>
            <TouchableOpacity
              onPress={() => navigation.push('Detalhes', item)}
            >
              <View style={styles.separatorContainer}>
                <ExplorerList data={item} />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )
    },
    [],
  )

  const renderFooter = () => {
    if (!refreshing) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  const LoadingAnimation = () => {
    const shimersData = [{ key: "1", width: 180, height: 180 }, { key: "2", width: 180, height: 180 }, { key: "3", width: 180, height: 180 },
    { key: "4", width: 180, height: 180 }, { key: "5", width: 180, height: 180 }, { key: "6", width: 180, height: 180 }];

    return (

      <View style={{ flex: 1, elevation: 1, padding: 15, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>
        { shimersData.map((item, index) =>
          <View key={index} style={{ marginBottom: 10 }}>
            <Shimmer width={item.width} height={item.height} />
          </View>
        )}
      </View>

    )

  }

  return (

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

      {
        loading ? LoadingAnimation() : (
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
      }

    </SafeAreaView>
  );
}

export default Explorer;