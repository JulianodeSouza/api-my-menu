if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import { initSentry } from "./infra/sentry";

initSentry();
