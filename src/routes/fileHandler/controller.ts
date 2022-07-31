import { FastifyReply } from 'fastify';

class Files {
  async getDatafile(request: any, reply: FastifyReply) {
    if (!request.file) throw Error('Should send a file');
    //     const csv = require('async-csv');

    try {
      const { performance } = require('perf_hooks');
      var startTime = performance.now();

      console.time();

      const csv = require('async-csv');

      const fs = require('fs');

      const data = {
        idCompany: 10,
        idUser: 20,
        filePath: request.file.path
      };

      const readFile = await fs.readFileSync(data.filePath, 'utf-8');
      const dataFileContacts = await csv.parse(readFile, {
        trim: true,
        skip_lines_with_error: true,
        delimiter: [':', ';', ',', '\t'],
        columns: true,
        skip_empty_lines: true
      });

      let countTotalRecordsNumberPhone = 0;
      let countTotalRecordsEmail = 0;
      let valuesToInsertDb: Array<any> = [];

      dataFileContacts.map((item: any) => {
        let contactData = {
          idCompany: data.idCompany,
          id_usuario_agrega: data.idUser,
          numero_telefono: typeof item.numero_telefono === 'undefined' || item.numero_telefono.length === 0 ? null : item.numero_telefono,
          numero_documento: typeof item.numero_documento === 'undefined' || item.numero_documento.length === 0 ? null : item.numero_documento,
          nombre_1: typeof item.nombre_1 === 'undefined' || item.nombre_1.length === 0 ? null : item.nombre_1,
          nombre_2: typeof item.nombre_2 === 'undefined' || item.nombre_2.length === 0 ? null : item.nombre_2,
          apellido_1: typeof item.apellido_1 === 'undefined' || item.apellido_1.length === 0 ? null : item.apellido_1,
          apellido_2: typeof item.apellido_2 === 'undefined' || item.apellido_2.length === 0 ? null : item.apellido_2,
          numero_celular: typeof item.numero_celular === 'undefined' || item.numero_celular.length === 0 ? null : item.numero_celular,
          correo: typeof item.correo === 'undefined' || item.correo.length === 0 ? null : item.correo,
          genero: typeof item.genero === 'undefined' || item.genero.length === 0 ? null : item.genero,
          ciudad: typeof item.ciudad === 'undefined' || item.ciudad.length === 0 ? null : item.ciudad,
          origen: 'Plataforma: Carga masiva',
          estado: typeof item.estado === 'undefined' || item.estado.length === 0 ? true : item.estado
        };
        if (contactData.numero_celular !== null && contactData.numero_celular.length > 0) {
          countTotalRecordsNumberPhone++;
        }
        if (contactData.correo !== null && contactData.correo.length > 0) {
          countTotalRecordsEmail++;
        }
        if (contactData.numero_celular !== null || contactData.correo !== null) {
          valuesToInsertDb.push(Object.values(contactData));
        }
      });

      var endTime = performance.now();

      console.timeEnd();
      return reply.send({ startTime, endTime, countTotalRecordsNumberPhone, countTotalRecordsEmail });
    } catch (error) {
      return Error(`Error: ${error}`);
    }
  }
}

export default new Files();
