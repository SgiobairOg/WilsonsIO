import { ui, defaultLang } from './ui'
import { parse } from 'marked'

type Replacement = Record<string, string>

export interface TranslationOptions {
  replacements?: Array<Replacement>
  markdown?: boolean
}

export type TranslationLabel = keyof typeof ui[typeof defaultLang]
export type TranslationBankLanguage = keyof typeof ui

interface UrlInfo {
  lang: TranslationBankLanguage,
  pathNodes: Array<string>,
  path: string
}

export function getUrlInfo(url: URL):UrlInfo {
    const [,lang, ...pathNodes] = url.pathname.split('/')

    if (lang in ui) return {
      'lang': lang as TranslationBankLanguage,
      pathNodes,
      'path': pathNodes.join('/'),
    }
    return {
      'lang': defaultLang,
      pathNodes,
      'path': pathNodes.join('/'),
    }
}

export function capitalise(term: string) {
  return term[0].toUpperCase() + term.slice(1)
}

export function useTranslations(lang = defaultLang) {

  function replacePlaceholder(input: string, key: string, value: string):string {
    const regex = new RegExp(`{${key}\}`, 'i')
    return input.replace(regex, value)
  }

  return function t(key: TranslationLabel, options?: TranslationOptions):string {
    let label = Object.keys(ui[lang as typeof defaultLang]).includes(key)
      ? ui[lang as typeof defaultLang][key]
      : ui[defaultLang][key]

    if( !label) label = `{ ${key} }`;

    const {markdown = true} = {...options}

    if(options?.replacements) {
      options.replacements.forEach(replacement => {
        const [key, value] = Object.entries(replacement)[0]
        label = replacePlaceholder(label, key, value)
      })
    }
    return markdown ? parse(label) : label
  }
}