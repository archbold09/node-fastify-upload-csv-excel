import { FastifyInstance } from 'fastify';
import path from 'path';
import multer from 'fastify-multer';
import Files from './controller';

const storage = multer.diskStorage({
  destination: `files/temporal/`,
  filename: function (_req: any, file: any, cb: any) {
    cb(null, `${file.fieldname}_${Date.now()}` + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default (app: FastifyInstance, _opts: any, next: any) => {
  app.register(multer.contentParser);

  app.route({
    method: 'POST',
    url: '/getDataFile',
    preHandler: upload.single('file'),
    handler: Files.getDatafile
  });

  next();
};
