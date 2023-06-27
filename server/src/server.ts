/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "jet-logger";
import morgan from "morgan";

import "express-async-errors";

import EnvVars from "@src/constants/EnvVars";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { NodeEnvs } from "@src/constants/misc";
import { RouteError } from "@src/other/classes";
import axios from "axios";

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

app.use(cors());

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  }
);

app.post("/companylist", async (req: Request, res: Response) => {
  const { data } = await axios.post("http://rest.sweettracker.net/companylist");
  return res.json(data);
});

app.get("/tracking", async (req: Request, res: Response) => {
  const t_code = req.query.t_code;
  const t_invoice = req.query.t_invoice;
  const { data } = await axios.get(
    "http://rest.sweettracker.net/tracking?t_key=SWEETTRACKER",
    {
      params: {
        t_code,
        t_invoice,
      },
    }
  );
  return res.json(data);
});

// **** Export default **** //

export default app;
