import "reflect-metadata"
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { Database, Resource } from '@adminjs/typeorm';
import { adminConfiguration } from "./config/admin";
import { databaseConfiguration } from "./config/database";
import { DataSource } from "typeorm";
import path from "path";
import { __dirname } from "./__dirname";
import { authenticationOptions } from "./config/authentication";
import { sessionOptions } from "./config/session";
import { logger } from "./logger";

// Vars
const PORT = 3000
const ASSETS_URL = '/assets'

// Typeorm adapter
AdminJS.registerAdapter({Resource, Database})

const start = async () => {
  // Express App
  const app = express()

  // Database
  const datasource = await (new DataSource(databaseConfiguration)).initialize()

  // AdminJS
  const admin = new AdminJS(adminConfiguration)

  // Admin Router
  app.use(admin.options.rootPath, AdminJSExpress.buildAuthenticatedRouter(
    admin,
    authenticationOptions,
    null,
    sessionOptions
  ))

  // Serve Static files on development
  if(process.env.NODE_ENV === 'development') {
    logger.info(`Serving static files to http://localhost:${PORT}${ASSETS_URL}`)
    app.use('/assets', express.static(path.join(__dirname, ASSETS_URL)))
  }

  // Start server
  app.listen(PORT, () => { logger.log(`Started on http://localhost:${PORT}${admin.options.rootPath}`) })
}

start()
