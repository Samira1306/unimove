import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { getRoutes, getVehicleById } from '../Services/RouteService';
import { Route } from '../Models/RouteModel';
import { Vehicle } from '../Models/VehicleModel';

const RouteList: React.FC = () => {
  const [originFilter, setOriginFilter] = useState<string>(''); // Filtro por origen
  const [destinationFilter, setDestinationFilter] = useState<string>(''); // Filtro por destino
  const [routes, setRoutes] = useState<(Route & { vehicleDetails?: string })[]>([]); // Rutas con detalles de vehículos
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoutes = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRoutes({ origin: originFilter, destination: destinationFilter });

      // Cargar detalles de vehículos
      const routesWithVehicles = await Promise.all(
        data.map(async (route) => {
          try {
            const vehicle = await getVehicleById(route.vehicle_id);
            return {
              ...route,
              vehicleDetails: `${vehicle.model}- ${vehicle.color}- ${vehicle.license_plate} (${vehicle.year})`,
            };
          } catch (vehicleError) {
            console.error('Error al obtener el vehículo:', vehicleError);
            return { ...route, vehicleDetails: 'Información no disponible' };
          }
        })
      );

      setRoutes(routesWithVehicles);
    } catch (err) {
      setError('Error al cargar las rutas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadRoutes();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [originFilter, destinationFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Rutas</Text>

      {/* Input para filtrar por origen */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por origen"
        value={originFilter}
        onChangeText={(text) => setOriginFilter(text)}
      />

      {/* Input para filtrar por destino */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por destino"
        value={destinationFilter}
        onChangeText={(text) => setDestinationFilter(text)}
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Lista de rutas */}
      <FlatList
        data={routes}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>No se encontraron rutas.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text>Origen: {item.origin}</Text>
            <Text>Destino: {item.destination}</Text>
            <Text>Hora de Salida: {new Date(item.departure_time).toLocaleString()}</Text>
            <Text>Asientos Disponibles: {item.available_seats}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>Vehículo: {item.vehicleDetails}</Text>
            <View style={styles.buttons}>
              <Button title="Reservar" onPress={() => {}} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  routeItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  buttons: {
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default RouteList;
