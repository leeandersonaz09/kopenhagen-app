import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//others imports
import { Icon, Spinner } from 'native-base';
//firebase imports
import { useFirebase } from '../../config/firebase'
//stylesheet import
import styles from './styles'
//import my componets
import { Card } from '../';
import { fonts, colors } from '../../styles';


export const DataItem = ({ item }) => {

    return (
        <>
            {
                item.map((data, index) => {
                    return (
                        <View key={index}>
                            <View>
                                <Text>{data.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text>
                                <Text> {data.quantity} </Text>
                            </View>
                            <View style={{ marginBottom: 10 }} />
                        </View>
                    )
                })
            }


        </>
    )
}

export default function Pedidos({ documentDataIndex, loadingIndex }) {

    const { authUser, getMyrequest} = useFirebase();

    const [loading, setLoading] = useState(false);
    const [documentData, setdocumentData] = useState([]);

	React.useEffect(() => {
        if (authUser) {
			const unsubscribe = getData()
            return unsubscribe;
        }
    }, []);

    const getData = async () => {
        setLoading(true)
        
       await getMyrequest(
          
            (result) => {

                if (!result.empty) {

                    let list = [];

                    result.forEach(doc => {
                        let mapData = Object.values(doc.data().pedido);
                        const { total, status } = doc.data();

                        list.push({
                            id: doc.id,
                            total,
                            status,
                            pedido: mapData
                        })

                    });
                    setdocumentData(list);
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);

                } else {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                    setdocumentData(null);
                }
            },
        );

    }

    const renderData = () => {

        if (loading) {

            return (
                <>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                        justifyContent: 'center'

                    }}>
                        <View>
                            <Spinner color='red' />
                            <Text style={styles.textMessage}>Aguarde, procurando itens disponíveis...</Text>
                        </View>

                    </View>
                </>
            )
        } else {

            return (
                <>
                    { documentData ? (
                        <>
                            <ScrollView>
                                {documentData.map((data, index) => {
                                    return (
                                        <View key={index} style={styles2.container}>
                                            <Card>
                                                <View style={styles2.content}>
                                                    <View>
                                                        <Text style={styles2.data}>{data.id}</Text>
                                                    </View>
                                                    <View style={[styles2.statusView, {backgroundColor: data.status == 'ativo'  || data.status == 'Entregue' ? colors.green : colors.red }]}>
                                                        <Text style={styles2.status}>{data.status}</Text>
                                                    </View>
                                                </View>

                                                <View style={styles2.separator} />
                                                <DataItem item={data.pedido} />

                                                <View style={styles2.separator} />

                                                <View style={styles2.content}>
                                                    <View>
                                                        <Text style={styles2.totalText}>Total</Text>
                                                    </View>
                                                    <View >
                                                        <Text style={styles2.totalValue}>R${data.total}</Text>
                                                    </View>
                                                </View>

                                            </Card>
                                        </View>
                                    )

                                }
                                )}
                            </ScrollView>
                        </>
                    ) : (
                            <>
                                <View style={styles.container2}>
                                    <Text style={styles.textMessage}>Nenhum Pedido</Text>
                                </View>
                            </>
                        )}
                </>
            )
        }
    }

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

        { renderData()}

        </>

    );
}

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    data: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.regular
    },
    statusView: {
        width: 'auto',
        height: 20,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    status: {
        color: colors.white,
        paddingHorizontal:5
    },
    myItens: {

    },
    separator: {
        borderColor: '#f5f5f5',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15
    },
    totalText: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    },
    totalValue: {
        fontFamily: fonts.SFP_bold,
        fontSize: fonts.headertitle
    }
});