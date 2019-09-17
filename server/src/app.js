import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App{
  constructor(){
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }
    
  routes(){
    this.server.use('/api', routes);
  }
}

export default new App().server;