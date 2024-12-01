import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, View, Image } from 'react-native';
import { Route } from '../Models/RouteModel'; // Importa el tipo de ruta
import { createRoute } from '../Services/RouteService'; // Importa el servicio de creación de ruta

const RouteForm: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureTime, setDepartureTime] = useState<string>('');
  const [availableSeats, setAvailableSeats] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [vehicleId, setVehicleId] = useState<string>('67351766e6361f3a5cdf87d1'); // ID de vehículo de ejemplo

  // Validar si la hora tiene el formato hh:mm
  const isValidTime = (time: string) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    return timeRegex.test(time);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    if (!origin || !destination || !departureTime || !availableSeats || !price) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Validar formato de la hora
    if (!isValidTime(departureTime)) {
      Alert.alert('Error', 'La hora debe tener el formato hh:mm en 24 horas.');
      return;
    }

    // Validar campos numéricos
    const numAvailableSeats = parseInt(availableSeats, 10);
    const numPrice = parseFloat(price);

    if (isNaN(numAvailableSeats) || numAvailableSeats <= 0) {
      Alert.alert('Error', 'Los asientos disponibles deben ser un número positivo.');
      return;
    }

    if (isNaN(numPrice) || numPrice <= 0) {
      Alert.alert('Error', 'El precio debe ser un número positivo.');
      return;
    }

    // Crear un objeto Date con la fecha actual y la hora seleccionada
    const currentDate = new Date();
    const [hours, minutes] = departureTime.split(':').map((part) => parseInt(part, 10));
    
    // Validamos si las horas y minutos son correctos antes de setearlos
    if (isNaN(hours) || isNaN(minutes)) {
      Alert.alert('Error', 'Hora o minutos no válidos.');
      return;
    }
    
    currentDate.setHours(hours, minutes, 0, 0); // Establecemos la hora, minuto y reseteamos los segundos

    // Crear el objeto de la ruta utilizando el tipo definido
    const routeData: Route = {
      origin,
      destination,
      departure_time: currentDate.toISOString(), // Convertir la fecha con hora a ISO string
      available_seats: numAvailableSeats,
      price: numPrice,
      vehicle_id: vehicleId,
    };

    try {
      await createRoute(routeData);
      Alert.alert('Ruta Publicada', 'La ruta se ha publicado con éxito.');
    } catch (error: any) {
      console.log(error); // Ayuda en la depuración
      Alert.alert('Error', error.message || 'Hubo un problema con la publicación de la ruta.');
    }
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
      
      {/* Campo de la Hora de Salida en formato hh:mm */}
      <TextInput
        placeholder="Hora de Salida (hh:mm)"
        style={styles.input}
        value={departureTime}
        onChangeText={setDepartureTime}
        keyboardType="numeric"
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
