import { Server as HttpServer } from 'http';
import express from 'express';

export interface ICommonRoutesConfig {
  app: express.Application;
  server?: HttpServer;
}
