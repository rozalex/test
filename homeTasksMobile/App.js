import React from 'react';
import {WebView} from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{uri: 'http://10.0.2.2:3000/'}}
      style={{marginTop: 20}}
    />
  );
}
