import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Route, Vehicle} from '../models';
import {RouteRepository, VehicleRepository} from '../repositories';

export class RouteControllerController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
    @repository(RouteRepository)
    public routeRepository : RouteRepository,
  ) {}

  @post('/routes')
  @response(200, {
    description: 'Route model instance',
    content: {'application/json': {schema: getModelSchemaRef(Route)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Route, {
            title: 'NewRoute',

          }),
        },
      },
    })
    route: Route,
  ): Promise<Route> {
    const vehicle = await this.vehicleRepository.findById(route.vehicle_id);
    if(vehicle){
      if (vehicle.type == "moto" && route.available_seats > 1) {
        throw new HttpErrors.BadRequest(`El cupo máximo para motos es uno`);
      }
      if (vehicle.type == "carro" && route.available_seats > 4) {
        throw new HttpErrors.BadRequest(`El cupo para carros debe ser entre uno y cuatro`);
      }
      return this.routeRepository.create(route);
    }
    throw new HttpErrors.UnprocessableEntity("El vehículo no existe");
  }

  @get('/routes/count')
  @response(200, {
    description: 'Route model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Route) where?: Where<Route>,
  ): Promise<Count> {
    return this.routeRepository.count(where);
  }

  @get('/routes')
  @response(200, {
    description: 'Array of Route model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Route, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Route) filter?: Filter<Route>,
  ): Promise<Route[]> {
    return this.routeRepository.find(filter);
  }

  @get('/routes/filter')
@response(200, {
  description: 'Filter routes by origin and destination using regex',
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(Route, {includeRelations: true}),
      },
    },
  },
})
async findFilteredRoutes(
  @param.query.string('origin') origin?: string,
  @param.query.string('destination') destination?: string,
): Promise<Route[]> {
  const where: any = {};

  if (origin) {
    Object.assign(where, {origin: {regexp: new RegExp(origin, 'i')}});
  }
  if (destination) {
    Object.assign(where, {destination: {regexp: new RegExp(destination, 'i')}});
  }

  return this.routeRepository.find({where});
}

  @patch('/routes')
  @response(200, {
    description: 'Route PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Route, {partial: true}),
        },
      },
    })
    route: Route,
    @param.where(Route) where?: Where<Route>,
  ): Promise<Count> {
    return this.routeRepository.updateAll(route, where);
  }

  @get('/routes/{id}')
  @response(200, {
    description: 'Route model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Route, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Route, {exclude: 'where'}) filter?: FilterExcludingWhere<Route>
  ): Promise<Route> {
    return this.routeRepository.findById(id, filter);
  }

  @patch('/routes/{id}')
  @response(204, {
    description: 'Route PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Route, {partial: true}),
        },
      },
    })
    route: Route,
  ): Promise<void> {
    await this.routeRepository.updateById(id, route);
  }

  @put('/routes/{id}')
  @response(204, {
    description: 'Route PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() route: Route,
  ): Promise<void> {
    await this.routeRepository.replaceById(id, route);
  }

  @del('/routes/{id}')
  @response(204, {
    description: 'Route DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.routeRepository.deleteById(id);
  }

  @del('/routes')
  @response(204, {
    description: 'All Routes DELETE success',
  })
  async deleteAll(): Promise<void> {
    await this.routeRepository.deleteAll();
  }
}
