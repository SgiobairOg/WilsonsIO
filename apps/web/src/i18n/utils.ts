import { ui, defaultLang } from './ui'
import { parse } from 'marked'

type Replacement = Record<string, string>

interface TranslationOptions {
  replacements?: Array<Replacement>
  markdown?: boolean
}

export function getLangFromUrl(url: URL) {
    console.log({
      path: url.pathname,
      split: url.pathname.split('/')
    })
    const [,lang, ...pathNodes] = url.pathname.split('/')

    if (lang in ui) return {
      'lang': lang as keyof typeof ui,
      'path': pathNodes.join('/'),
    }
    return {
      'lang': defaultLang,
      'path': pathNodes.join('/'),
    }
}

export function getPathFromUrl(url: URL) {
  const [,lang, ...pathNodes] = url.pathname.split('/')
  return pathNodes.join('/');
}

export function useTranslations(lang: keyof typeof ui) {
    function replacePlaceholder(input: string, key: string, value: string):string {
      const regex = new RegExp(`{${key}\}`, 'i')
      return input.replace(regex, value)
    }

    return function t(key: keyof typeof ui[typeof defaultLang], options?: TranslationOptions):string {
      let label = ui[lang][key] || ui[defaultLang][key]

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