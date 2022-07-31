import { FastifyInstance } from 'fastify';
import fileHandler from './fileHandler/routes';
export default (app: FastifyInstance, _opts: any, next: any) => {
  app.register(fileHandler, { prefix: '/files' });

  next();
};
