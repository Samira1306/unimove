import axios from 'axios';
import { Route } from '../Models/RouteModel';
import { Vehicle } from '../Models/VehicleModel';

const BASE_URL = 'http://10.0.2.2:3000';

export const createRoute = async (route: Route) => {
  try {
    console.log(route);
    const response = await axios.post(`${BASE_URL}/routes`, route);
    console.log('Respuesta del servidor:', response.data); 
    const response2 = await getVehiclesByUser('67351210581a6a4f04f5ce0e');
    console.log('Respuesta del servidor 2:',response2);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la ruta');
  }
};

export const getVehiclesByUser = async (userId: string): Promise<Vehicle[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles/users/${userId}`);
    console.log('Respuesta del servidor:', response.data);
    return response.data; // Retorna los vehículos
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    throw new Error('Error al obtener los vehículos');
  }
};

