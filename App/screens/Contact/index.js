import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Icon, Thumbnail, Button } from 'native-base';
import * as Linking from 'expo-linking';
import { Header, Card, WaveSvg, Text, View as MyView } from '../../components';
import styles from './styles';
import { colors } from '../../styles';

const Contact = () => {

  const cardData = [
    {
      key: "2",
      tittle: "Email",
      link: 'mailto:contatoessensiaf@gmail.com',
      iconName: "ios-mail-open",
      iconColor: colors.red,
      text: "contatoessensiaf@gmail.com"
    },
    {
      key: "3",
      tittle: "Whatsapp",
      link: 'https://api.whatsapp.com/send?phone=5574988276002&text=Ol%C3%A1%20Anna%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20ou%20fazer%20um%20pedido.',
      iconName: "logo-whatsapp",
      iconColor: colors.green,
      text: "(74) 98827-6002"
    },
    {
      key: "4",
      tittle: "Facebook",
      link: 'https://www.facebook.com/Ess%C3%AAncia-Feminina-2011941432372832/',
      iconName: "logo-facebook",
      iconColor: colors.facebook,
      text: "Essência-Feminina"
    },
    {
      key: "5",
      tittle: "Instagram",
      link: 'https://www.instagram.com/essencia_f/',
      iconName: "logo-instagram",
      iconColor: colors.red,
      text: "@essencia_f"
    },
  ];
  return (
    <MyView style={styles.Container}>
      <WaveSvg
        customStyles={styles.svgCurve}
        customHeight={520}
        customTop={400}
        customBgColor={colors.secondary}
        customWavePattern="M0,288L1440,32L1440,0L0,0Z"
      />
      <SafeAreaView>
        <Header>

          <View style={{ marginTop: 50 }}>
            <Text style={styles.headerTitle}>Fale conosco</Text>
          </View>

        </Header>
        <View style={styles.HeaderBackGround} />
      </SafeAreaView>

      <View style={styles.Content}>

        <Card>
          <View style={styles.CardContent}>
            <Thumbnail source={require('../../../assets/avatar.png')} />
            <View style={styles.TextContent}>
              <Text style={styles.tittle}>Essência Feminina</Text>
              <Text style={styles.text}>A loja mais completa! Atacado e varejo. Nos siga nas redes sociais e caso tenha dúvida, nos contate!</Text>
            </View>
          </View>
        </Card>

        {cardData.map((item, index) =>
          <React.Fragment key={index}>
            <Card>
              <Button onPress={() => {
                Linking.openURL(item.link);
              }}
                transparent
              >
                <View style={styles.CardContent}>
                  <Icon style={[styles.Icon, { color: item.iconColor }]} name={item.iconName} />
                  <View style={styles.TextContent}>
                    <Text style={styles.tittle}>{item.tittle}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </View>
              </Button>
            </Card>
          </React.Fragment>
        )}
      </View>
    </MyView>
  )
}
export default Contact;
