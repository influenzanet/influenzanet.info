import session from "express-session";
import MySQLSessionStore from "express-mysql-session";
import sessionModule from "express-session";
const store = MySQLSessionStore(sessionModule);


export const sessionOptions: session.SessionOptions = {
  store: new store({
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    createDatabaseTable: true
  }),
  saveUninitialized: true,
  secret: 'secret',
  resave: true
}
