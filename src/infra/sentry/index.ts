import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import { logMessage } from "../../services/utils";

dotenv.config();

let isSentryInitialized = false;

function resolveTracesSampleRate(): number {
  const rawRate = process.env.SENTRY_TRACES_SAMPLE_RATE;
  if (!rawRate) {
    return 0.2;
  }

  const parsed = Number(rawRate);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
    return parsed;
  }

  return 0.2;
}

export function initSentry(): void {
  const dsn = process.env.SENTRY_DSN;

  if (!dsn || isSentryInitialized || process.env.NODE_ENV !== "production") {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: resolveTracesSampleRate(),
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
