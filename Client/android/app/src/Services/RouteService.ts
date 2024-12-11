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

export const getRoutes = async (filter: { origin?: string; destination?: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}/routes/filter`, {
      params: {
        origin: filter.origin || '',
        destination: filter.destination || '',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las rutas');
  }
};

export const getVehicleId = async (filter: { origin?: string; destination?: string }): Promise<Route[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/routes/filter`, {
      params: {
        origin: filter.origin || '',
        destination: filter.destination || '',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las rutas');
  }
};

/**
 * Busca un vehículo por su ID.
 * @param id ID del vehículo.
 * @returns Información del vehículo.
 */
export const getVehicleById = async (id: string): Promise<Vehicle> => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el vehículo:', error);
    throw new Error(error.response?.data?.message || 'Error al buscar el vehículo');
  }
};

