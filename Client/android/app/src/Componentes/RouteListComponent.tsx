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
import { getRoutes } from '../Services/RouteService'; // Ajusta la ruta según tu proyecto
import { Route } from '../Models/RouteModel'; // Importa la interfaz desde la carpeta de modelos

const RouteList: React.FC = () => {
  const [originFilter, setOriginFilter] = useState<string>(''); // Filtro por origen
  const [destinationFilter, setDestinationFilter] = useState<string>(''); // Filtro por destino
  const [routes, setRoutes] = useState<Route[]>([]); // Estado para las rutas obtenidas
  const [loading, setLoading] = useState<boolean>(false); // Estado para la carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Función para cargar las rutas desde el servicio
  const loadRoutes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoutes({
        origin: originFilter,
        destination: destinationFilter,
      });
      setRoutes(data); // Asume que la API devuelve un array de rutas
    } catch (err) {
      setError('Error al cargar las rutas.');
    } finally {
      setLoading(false);
    }
  };

  // Cargar rutas iniciales
  useEffect(() => {
    loadRoutes();
  }, []);

  // Actualizar rutas cuando cambien los filtros
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadRoutes();
    }, 500); // Esperar 500ms antes de realizar la búsqueda
    return () => clearTimeout(delayDebounce); // Limpiar el timeout
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
          !loading && (
            <Text style={styles.emptyText}>No se encontraron rutas.</Text>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text>Origen: {item.origin}</Text>
            <Text>Destino: {item.destination}</Text>
            <Text>
              Hora de Salida: {new Date(item.departure_time).toLocaleString()}
            </Text>
            <Text>Asientos Disponibles: {item.available_seats}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>ID del Vehículo: {item.vehicle_id}</Text>
            <View style={styles.buttons}>
              <Button title="Reservar" onPress={() => {}} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Estilos para la pantalla
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
