import { ui, defaultLang } from './ui'
import { parse } from 'marked'

type Replacement = Record<string, string>

interface TranslationOptions {
  replacements?: Array<Replacement>
  markdown?: boolean
}

interface UrlInfo {
  lang: keyof typeof ui,
  pathNodes: Array<string>,
  path: string
}

export function getUrlInfo(url: URL):UrlInfo {
    const [,lang, ...pathNodes] = url.pathname.split('/')

    if (lang in ui) return {
      'lang': lang as keyof typeof ui,
      pathNodes,
      'path': pathNodes.join('/'),
    }
    return {
      'lang': defaultLang,
      pathNodes,
      'path': pathNodes.join('/'),
    }
}

export function useTranslations(lang: keyof typeof ui) {
    function replacePlaceholder(input: string, key: string, value: string):string {
      const regex = new RegExp(`{${key}\}`, 'i')
      return input.replace(regex, value)
    }

    return function t(key: keyof typeof ui[typeof defaultLang], options?: TranslationOptions):string {
      let label = ui[lang][key] || ui[defaultLang][key]

      if( !label) label = `{ ${key} )`;

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