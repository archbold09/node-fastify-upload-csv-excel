import fastify, { FastifyInstance } from 'fastify';

import routes from './routes/routes';

const app: FastifyInstance = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});

app.register(routes, { prefix: '/api' });

const initServer = async () => {
  try {
    await app.listen({ port: 8080, host: 'localhost' });
    app.log.info(`Corriendo en el puerto http://localhost:8080`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

initServer();
