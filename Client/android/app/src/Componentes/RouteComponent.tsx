import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Route } from '../Models/RouteModel';
import { createRoute, getVehiclesByUser } from '../Services/RouteService';

const RouteForm: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureTime, setDepartureTime] = useState<string>('');
  const [availableSeats, setAvailableSeats] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [vehicleId, setVehicleId] = useState<string>('');
  const [vehicles, setVehicles] = useState<any[]>([]); // Array de vehículos

  useEffect(() => {
    // Supón que el userId está disponible
    const userId = '67351210581a6a4f04f5ce0e'; // Reemplázalo con el id del usuario real
    const fetchVehicles = async () => {
      try {
        const vehiclesData = await getVehiclesByUser(userId);
        setVehicles(vehiclesData);
        if (vehiclesData.length > 0) {
          setVehicleId(vehiclesData[0].vehicle_id); // Seleccionar el primer vehículo por defecto
        }
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        Alert.alert('Error', 'No se pudieron cargar los vehículos.');
      }
    };

    fetchVehicles();
  }, []);

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

    currentDate.setHours(hours, minutes, 0, 0);

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
      
      <Text style={styles.inputLabel}>Seleccionar Vehículo:</Text>
      <Picker
        selectedValue={vehicleId}
        style={styles.input}
        onValueChange={(itemValue) => setVehicleId(itemValue)}
      >
        {vehicles.map((vehicle) => (
          <Picker.Item 
            key={vehicle.vehicle_id} 
            label={`${vehicle.model} ${vehicle.color} (${vehicle.license_plate})`} 
            value={vehicle.vehicle_id} 
          />
        ))}
      </Picker>

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
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default RouteForm;
