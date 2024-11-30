// android/app/src/App.tsx

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import RouteForm from './android/app/src/Componentes/RouteComponent';  // Asegúrate de que la ruta esté correcta

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RouteForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;


