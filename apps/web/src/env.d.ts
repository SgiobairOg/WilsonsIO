/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


declare namespace App {
  interface Locals {
      transl: (key: TranslationLabel, options?: TranslationOptions) => string,
      currentLang: string,
      langPath: string,
      logger: Logger,
  }
}