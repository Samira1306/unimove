// android/app/src/types/Route.ts
export interface Route {
    origin: string;
    destination: string;
    departure_time: string;  // Representará la fecha en formato ISO
    available_seats: number;
    price: number;
    vehicle_id: string; // ID del vehículo, este es el que vendría de la petición
  }
  