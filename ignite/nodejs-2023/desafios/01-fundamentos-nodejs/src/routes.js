import { randomUUID } from 'crypto';
import { Database } from "./database.js";
import { buildeRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildeRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task);

      return res.writeHead(201).end();
    }
  },
  {
    method: 'GET',
    path: buildeRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null);

      return res.end(JSON.stringify(tasks));
    }
  },
]