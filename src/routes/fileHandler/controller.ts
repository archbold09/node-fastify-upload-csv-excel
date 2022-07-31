import { FastifyReply } from 'fastify';

class Files {
  async getDatafile(request: any, reply: FastifyReply) {
    if (!request.file) throw Error('Should send a file');

    try {
      const csv = require('async-csv');

      const fs = require('fs');

      const data = {
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

      return reply.send({ dataFileContacts });
    } catch (error) {
      return Error(`Error: ${error}`);
    }
  }
}

export default new Files();
