import { logMessage } from "@/services/utils";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

let isSentryInitialized = false;

export function initSentry(): void {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn || isSentryInitialized || process.env.NODE_ENV === "production") {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.2,
  });

  isSentryInitialized = true;
  logMessage("Sentry initialized successfully.");
}

export function captureError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (!isSentryInitialized) {
    return;
  }

  logMessage(`Error captured by Sentry: ${error}`);

  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
    return;
  }

  Sentry.captureException(error);
}

export { Sentry };
