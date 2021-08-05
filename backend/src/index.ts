import "reflect-metadata";

import { initConnection } from "./db/connection";
import startServer from "./server/server"

initConnection().then(()=>{
  startServer();
})