import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, View, Image } from 'react-native';

const RouteForm: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [driverId, setDriverId] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  const handleSubmit = () => {
    if (!origin || !destination || !departureTime || !availableSeats || !price || !driverId || !vehicleId) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    Alert.alert('Ruta Publicada', 'La ruta se ha publicado con éxito.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      
        <Text style={styles.headerTitle}>Publicar Nueva Ruta</Text>
        <Image
          source={{ uri: 'https://example.com/avatar.jpg' }}
          style={styles.avatar}
        />
      

      <TextInput
        placeholder="Lugar de Origen"
        style={styles.input}
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        placeholder="Lugar de Destino"
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        placeholder="Hora de Salida"
        style={styles.input}
        value={departureTime}
        onChangeText={setDepartureTime}
      />
      <TextInput
        placeholder="Asientos Disponibles"
        style={styles.input}
        value={availableSeats}
        onChangeText={setAvailableSeats}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Precio por Persona"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="ID del Conductor"
        style={styles.input}
        value={driverId}
        onChangeText={setDriverId}
      />
      <TextInput
        placeholder="ID del Vehículo"
        style={styles.input}
        value={vehicleId}
        onChangeText={setVehicleId}
      />

      <View style={styles.buttonContainer}>
        <Button title="Publicar Ruta" color="#1976d2" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#1976d2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#1976d2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default RouteForm;
