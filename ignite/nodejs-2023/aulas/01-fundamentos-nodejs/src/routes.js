import { randomUUID } from 'crypto';
import { Database } from "./database.js";
import { buildeRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildeRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users');

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildeRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const users = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', users);

      return res.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildeRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PUT',
    path: buildeRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, { name, email });

      return res.writeHead(204).end();
    }
  },
]