import "express-async-errors";
import * as winston from "winston";


export default function() {
  process.on("uncaughtException", (ex: Error) => {
    console.log(ex);
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex: any) => {
    console.log(ex);
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logFile.log" }));
}
