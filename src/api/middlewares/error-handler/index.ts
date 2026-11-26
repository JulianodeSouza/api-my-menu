import { NextFunction, Request, Response } from "express";
import {
  getSentryDisabledReason,
  isSentryEnabled,
} from "../../../infra/sentry";
import { logMessage } from "../../../services/utils";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logMessage(error instanceof Error ? error.stack || error.message : String(error));

  const message = error.message || "Internal Server Error";
  const statusCode = error.statusCode || 500;

  if (statusCode < 500) {
    logMessage(
      `[Sentry] Evento não enviado para ${req.method} ${req.originalUrl}: erro esperado de cliente/regra (HTTP ${statusCode} < 500).`,
    );
  } else if (!isSentryEnabled()) {
    logMessage(
      `[Sentry] Evento NÃO enviado para ${req.method} ${req.originalUrl} (HTTP ${statusCode}): Sentry desativado — ${getSentryDisabledReason()}.`,
    );
  } else {
    logMessage(
      `[Sentry] Erro HTTP ${statusCode} em ${req.method} ${req.originalUrl} encaminhado ao Sentry.`,
    );
  }

  res.status(statusCode).json({
    data: {
      message,
    },
  });
};
