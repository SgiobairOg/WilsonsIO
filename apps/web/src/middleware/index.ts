import { sequence } from "astro:middleware";
import { provideTranslations } from "./provide-translations";
import { provideLogger } from "./logger";

export const onRequest = sequence(
  provideLogger,
  provideTranslations,
)