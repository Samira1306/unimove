import {Entity, model, property} from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';

@model({settings: {strict: false}})
export class Route extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  route_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origin: string;

  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @property({
    type: 'date',
    required: true,
  })
  departure_time: string;

  @property({
    type: 'number',
    required: true,
  })
  available_seats: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
  })
  driver_id: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicle_id: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  created_at: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Route>) {
    super(data);
    this.validate();
  }

  private validate() {
    this.validateRequired('origin', this.origin, 'Todos los campos son obligatorios');
    this.validateRequired('destination', this.destination, 'Todos los campos son obligatorios');
    this.validateRequired('departure_time', this.departure_time, 'Todos los campos son obligatorios');
    this.validateRequired('available_seats', this.available_seats, 'Todos los campos son obligatorios');
    this.validateRequired('price', this.price, 'Todos los campos son obligatorios');
    this.validateRequired('vehicle_id', this.vehicle_id, 'Todos los campos son obligatorios');
    this.validateTime();
    this.validateOriginAndDestination(this.origin, this.destination)
    this.validateSeats();
    this.validatePrice();
    this.validateMinLength(this.origin,4,"El campo debe tener mínimo 4 caracteres");
    this.validateMinLength(this.destination,4,"El campo debe tener mínimo 4 caracteres");
    this.validateDouble();
  }
  private validateRequired(fieldName: string, value: any, errorMessage: string) {
    if (!value) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateMinLength(value: string, minLength: number, errorMessage: string) {
    if (value && value.length < minLength) {
      throw new HttpErrors.UnprocessableEntity(errorMessage);
    }
  }

  private validateOriginAndDestination(origin: string, destination: string) {
    if (origin != "Sede central U de Caldas" && destination != "Sede central U de Caldas") {
      throw new HttpErrors.UnprocessableEntity("Origen o destino deben ser en la Sede central U de Caldas");
    }
  }

  private validateSeats() {
    if (this.available_seats < 1) {
      throw new HttpErrors.UnprocessableEntity("Debe haber al menos un asiento disponible");
    }
  }

  private validatePrice() {
    if (this.price > 10000 ||this.price < 0 ) {
      throw new HttpErrors.UnprocessableEntity("El costo debe estar entre 0 y 10000 COP");
    }
  }

  private validateDouble(){
    if(!Number.isNaN(this.price) && !Number.isInteger(this.price)){
      throw new HttpErrors.UnprocessableEntity("El costo debe estar entre 0,10000 COP y debe ser entero");
    }
    
  }

  private validateTime() {
    const currentTime = new Date();
    const departureTime = new Date(this.departure_time);
    // Verificar que la hora de salida sea al menos una hora mayor que la hora actual
    currentTime.setHours(currentTime.getHours()- 6);
    if (departureTime <= currentTime) {
      throw new HttpErrors.UnprocessableEntity(
        'La hora de salida debe ser al menos una hora mayor que la hora actual.',
      );
    }
     // Validar que la hora de salida esté entre las 4 a.m. y las 11 p.m.
     const departureHours = departureTime.getHours() + 5;
     if (departureHours < 4 || departureHours >= 23) {
       throw new HttpErrors.UnprocessableEntity(
         'La hora de salida debe estar entre las 4 a.m. y las 11 p.m.',
       );
     }
  }
}

export interface RouteRelations {
  // describe navigational properties here
}

export type RouteWithRelations = Route & RouteRelations;
