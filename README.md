<h1 align="center">
    <img alt="kopenhagen App" title="#delicinha" src="assets/icon.png" width="250px" />
</h1>

<h1 align="center">
  Kopenhagen Salvador (ADM)
</h1>

<h4 align="center">
  ☕  Code and coffee
</h4>

## Um aplicativo para potencializar suas vendas

Tenha um catálogo de produtos na palma da mão de maneira fácil e intuitiva para seus clientes!

Um catalogo de produtos para sua loja. Com ele, seus produtos podem atingir um publico ainda maior. O Kopenhagen Salvador App é pensado para que seu clientetenha acesso ao seu catálogo de maneira fácil e intuitiva, além de poder fazer pedidos pelo app. O cliente fica satisfeito e o alcance do seu publico fica ainda maior. 

<h3 align="center">
  Screenshots
</h3>

<p align="center">
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/Screenshot_20210916-164138_Kopenhagen Salvador.jpg" width="250px" />
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/InkedScreenshot_20210916-164316_Kopenhagen Salvador_LI.jpg" width="250px" />
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/Screenshot_20210916-164152_Kopenhagen Salvador.jpg" width="250px" />
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/Screenshot_20210916-164928_Kopenhagen Salvador ADM.jpg" width="250px" />
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/Screenshot_20210916-164841_Kopenhagen Salvador ADM.jpg" width="250px" />
    <img alt="Kopenhagen Salvador" title="#delicinha" src="Screenshot/InkedScreenshot_20210916-164316_Kopenhagen Salvador_LI.jpg" width="250px" />
</p>

Functionality Implementention Sprints

- [x] Tabs
- [x] Screens: (Home, Product Description, Contact, Profile, Cart)
- [x] SearchBar
- [x] Firebase Integration
- [x] Generate apk and app bundle signed
- [x] Tests
- [ ] Publishing App Bundle on Google PLay Store

You'll need to have [Expo](https://expo.io/learn) installed on your machine in order to follow along.

## Configuration

Firebase configuration file

Add a `config/firebase.js` file with the following content (make sure to fill in the values from your own firebase account):

```js
export default {
  API_KEY: <API_KEY>,
  AUTH_DOMAIN: <AUTH_DOMAIN>,
  DATABASE_URL: <DATABASE_URL>,
  PROJECT_ID: <PROJECT_ID>,
  STORAGE_BUCKET: <STORAGE_BUCKET>,
  MESSAGING_SENDER_ID: <MESSAGING_SENDER_ID>,
};
```
### Configuration of pagination Firestorage

in `App/screens/Eplorer/index.js` in function `getData()` was two params in search index `where("category", "==", category)` and `orderBy('data', 'desc')` and a limit to push a number of docs called `limit('number of obects do you want to push')`. This will make the app get the especifcs documents with contain the category arguments especified on `where()` ordanate by data to most recent to oldest `desc` in `orderBy`. The latest doc add will come to first.  
Check more info on [firebase.google.com](https://firebase.google.com/docs/firestore/query-data/query-cursors)

```js

const getData = async () => {
    setLoading(true);

    await firebase
    .firestore()
    .collection('Produtos')
    .where("category", "==", category)
    .orderBy('data', 'desc')
    .limit(limit)
      .onSnapshot(querySnapshot => { ......

```

To use this two index `where` and `orderBy` together or more, you have to go on firestorage and create a composite index. 

Check this on this link: (https://firebase.google.com/docs/firestore/query-data/indexing).

## Installation

- `git clone https://github.com/leeandersonaz09/kopenhagenadm-app.git <name-you-want-to-your-project>`
- In your command painel use `.code` if using visual studio code or  `cd C://<destination-folder-name>/<name-you-want-to-your-project>`

Then run the command: 

If using npm:

```sh
npm install
```

If using Yarn:

```sh
yarn install
```


## Running

Use the `yarn/expo/npm start`, `yarn/npm ios`, or `yarn/npm android` tasks as detailed below.

npm or expo:

```sh
npm start or expo start
```

yarn:

```sh
yarn start
```
## Expo Go App 
  
If you dont want to use a emulator to render the app after use npm start, use your own mobile phone iOS or Android to deploy the code on screen. Just download de App Expo Go on Google PLay or AppStore. 
  
[Download from GooglePLay here](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US)
  
[Download from AppStore here](https://apps.apple.com/br/app/expo-client/id982107779)
  
Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.
  
## Available Scripts to run on emulator

This app was initialized using Yarn and therefore you should use Yarn commands going forward.

Below you'll find information about performing common tasks.

* [Available Scripts](#available-scripts)
  * [yarn start](#npm-start): npm-start
  * [yarn ios](#npm-run-ios): npm-run-ios
  * [yarn android](#npm-run-android): npm-run-android

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start --reset-cache   or   npm start --reset-cache
```

#### `yarn ios`

 Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

### Demo 
If you're interested about Essência Feminina App be sure to visit:

# kopenhagen-app
