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
      return res.writeHead(200).end();
    }
  },
]