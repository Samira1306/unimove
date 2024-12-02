import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';

// Definición de tipos para las rutas
interface Route {
  origin: string;
  destination: string;
  departure_time: string;
  available_seats: number;
  price: number;
  vehicle_id: string;
}

// Props del componente
interface RouteListProps {
  routes: Route[];
}

const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  const [filter, setFilter] = useState<string>(''); // Estado para el filtro

  // Filtrar las rutas basándose en el destino
  const filteredRoutes = routes.filter((route) =>
    route.destination.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Rutas</Text>

      {/* Input para filtrar */}
      <TextInput
        style={styles.input}
        placeholder="Filtrar por destino"
        value={filter}
        onChangeText={(text) => setFilter(text)} // React Native usa onChangeText directamente
      />

      {/* Lista de rutas filtradas */}
      <FlatList
        data={filteredRoutes}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron rutas.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.routeItem}>
            <Text>Origen: {item.origin}</Text>
            <Text>Destino: {item.destination}</Text>
            <Text>Hora de Salida: {new Date(item.departure_time).toLocaleString()}</Text>
            <Text>Asientos Disponibles: {item.available_seats}</Text>
            <Text>Precio: ${item.price}</Text>
            <Text>ID del Vehículo: {item.vehicle_id}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => {}} />
              <Button title="Eliminar" onPress={() => {}} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default RouteList;
