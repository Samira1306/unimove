import axios from 'axios';
import { Route } from '../Models/RouteModel';
import { Vehicle } from '../Models/VehicleModel';

const BASE_URL = 'http://10.0.2.2:3000';

export const createRoute = async (route: Route) => {
  try {
    const response = await axios.post(`${BASE_URL}/routes`, route);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la ruta');
  }
};

export const getVehiclesByUser = async (userId: string): Promise<Vehicle[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles/users/${userId}`);
    return response.data; // Retorna los vehículos
  } catch (error) {
    console.error('Error al obtener los vehículos:', error);
    throw new Error('Error al obtener los vehículos');
  }
};

export const getRoutes = async (filter: { origin?: string, destination?: string }) => {
  try {
    const where: { [key: string]: any } = {};
    if (filter.origin) {
      where['origin'] = filter.origin;
    }

    if (filter.destination) {
      where['destination'] = filter.destination;
    }

    const response = await axios.get(`${BASE_URL}/routes`, {
      params: {
        where: JSON.stringify(where),
        limit: 100, 
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las rutas');
  }
};

