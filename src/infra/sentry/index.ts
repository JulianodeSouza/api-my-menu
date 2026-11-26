import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import { logMessage } from "../../services/utils";

dotenv.config();

let isSentryInitialized = false;
let sentryDisabledReason = "Sentry ainda não inicializado";

function formatErrorSummary(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return String(error);
}

function formatEventSummary(event: Sentry.ErrorEvent | Sentry.Event): string {
  const firstException = event.exception?.values?.[0];
  if (firstException) {
    const type = firstException.type || "Error";
    const value = firstException.value || "";
    return value ? `${type}: ${value}` : type;
  }

  return event.message || "Evento sem descrição";
}

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

export function isSentryEnabled(): boolean {
  return isSentryInitialized;
}

export function getSentryDisabledReason(): string {
  return sentryDisabledReason;
}

export function initSentry(): void {
  if (isSentryInitialized) {
    return;
  }

  const environment = process.env.NODE_ENV || "development";
  const forceEnabled = process.env.SENTRY_ENABLED === "true";

  if (environment !== "production" && !forceEnabled) {
    sentryDisabledReason = `ambiente "${environment}" (ativo apenas em "production" ou com SENTRY_ENABLED=true)`;
    logMessage(
      `[Sentry] Desativado: ${sentryDisabledReason}. Nenhum evento será enviado.`,
    );
    return;
  }

  const dsn = process.env.SENTRY_DSN?.trim();

  if (!dsn) {
    sentryDisabledReason = "variável SENTRY_DSN não configurada";
    logMessage(
      `[Sentry] Desativado: ${sentryDisabledReason}. Nenhum evento será enviado.`,
    );
    return;
  }

  const tracesSampleRate = resolveTracesSampleRate();

  const client = Sentry.init({
    dsn,
    environment,
    tracesSampleRate,
  });

  client?.on("beforeSendEvent", (event) => {
    if (event.type !== undefined) {
      return;
    }

    logMessage(
      `[Sentry] Enviando evento (event_id: ${event.event_id ?? "n/a"}) -> ${formatEventSummary(event)}`,
    );
  });

  client?.on("afterSendEvent", (event, sendResponse) => {
    if (event.type !== undefined) {
      return;
    }

    const statusCode = sendResponse?.statusCode;
    if (typeof statusCode === "number" && statusCode >= 200 && statusCode < 300) {
      logMessage(
        `[Sentry] Evento entregue com sucesso ao Sentry (event_id: ${event.event_id ?? "n/a"}, HTTP ${statusCode}).`,
      );
      return;
    }

    logMessage(
      `[Sentry] Falha ao entregar evento ao Sentry (event_id: ${event.event_id ?? "n/a"}, HTTP ${statusCode ?? "sem resposta / erro de rede"}).`,
    );
  });

  isSentryInitialized = true;
  sentryDisabledReason = "";
  logMessage(
    `[Sentry] Inicializado com sucesso (ambiente: ${environment}, tracesSampleRate: ${tracesSampleRate}).`,
  );
}

export function captureError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (!isSentryInitialized) {
    logMessage(
      `[Sentry] Evento NÃO enviado (${sentryDisabledReason}): ${formatErrorSummary(error)}`,
    );
    return;
  }

  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      const eventId = Sentry.captureException(error);
      logMessage(
        `[Sentry] Exceção enfileirada para envio (event_id: ${eventId}): ${formatErrorSummary(error)}`,
      );
    });
    return;
  }

  const eventId = Sentry.captureException(error);
  logMessage(
    `[Sentry] Exceção enfileirada para envio (event_id: ${eventId}): ${formatErrorSummary(error)}`,
  );
}

export { Sentry };
