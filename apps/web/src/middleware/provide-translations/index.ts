import { defineMiddleware } from "astro:middleware";
import { useTranslations, getUrlInfo } from "@i18n/utils";
import { defaultLang } from '@i18n/ui';

export const provideTranslations = defineMiddleware(({locals, request}, next) => {

  const {lang: currentLang, path} = getUrlInfo(new URL(request.url));
 

  locals.transl = useTranslations(currentLang || defaultLang);
  locals.currentLang = currentLang;
  locals.langPath = path;


  return next();
});