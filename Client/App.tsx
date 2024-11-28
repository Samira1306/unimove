import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import RouteForm from './android/app/src/Components/RouteForm.tsx';

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

