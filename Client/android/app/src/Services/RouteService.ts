import axios from 'axios';
import { Route } from '../Models/RouteModel';

const BASE_URL = 'http://10.0.2.2:3000';

export const createRoute = async (route: Route) => {
  try {
    console.log(route);
    const response = await axios.post(`${BASE_URL}/routes`, route);
    console.log('Respuesta del servidor:', response.data); 
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la ruta');
  }
};

