// services/RouteService.ts
import axios from 'axios';
import { Route } from '../Models/RouteModel';  // Asegúrate de que 'Route' esté importado correctamente

const BASE_URL = 'http://127.0.0.1:3000';  // Cambia esta URL por la correcta

export const createRoute = async (route: Route) => {
  try {
    console.log(route);
    const response = await axios.post(`${BASE_URL}/routes`, route);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la ruta');
  }
};
