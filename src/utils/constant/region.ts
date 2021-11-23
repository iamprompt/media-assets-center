type T_REGIONS = {
  [key: string]: {
    name: string
    langs: { [key: string]: string }
  }
}

const REGIONS: T_REGIONS = {
  DK: { name: 'Denmark', langs: { 'da-DK': 'Danish (as spoken in Denmark)' } },
  CH: {
    name: 'Switzerland',
    langs: { 'de-CH': 'German (as spoken in Switzerland)', 'fr-CH': 'French (as spoken in Switzerland)' },
  },
  DE: { name: 'Germany', langs: { 'de-DE': 'German (as spoken in Germany)' } },
  GR: { name: 'Greece', langs: { 'el-GR': 'Greek (as spoken in Greece)' } },
  AU: { name: 'Australia', langs: { 'en-AU': 'English (as spoken in Australia)' } },
  CA: { name: 'Canada', langs: { 'en-CA': 'English (as spoken in Canada)', 'fr-CA': 'French (as spoken in Canada)' } },
  GB: { name: 'United Kingdom', langs: { 'en-GB': 'English (as spoken in United Kingdom)' } },
  HK: {
    name: 'Hong Kong',
    langs: { 'en-HK': 'English (as spoken in Hong Kong)', 'zh-HK': 'Chinese (as spoken in Hong Kong)' },
  },
  US: { name: 'United States', langs: { 'en-US': 'English (as spoken in United States)' } },
  ES: { name: 'Spain', langs: { 'es-ES': 'Spanish (as spoken in Spain)' } },
  MX: { name: 'Mexico', langs: { 'es-MX': 'Spanish (as spoken in Mexico)' } },
  FI: { name: 'Finland', langs: { 'fi-FI': 'Finnish (as spoken in Finland)' } },
  BE: { name: 'Belgium', langs: { 'fr-BE': 'French (as spoken in Belgium)', 'nl-BE': 'Dutch (as spoken in Belgium)' } },
  FR: { name: 'France', langs: { 'fr-FR': 'French (as spoken in France)' } },
  ID: { name: 'Indonesia', langs: { 'id-ID': 'Indonesian (as spoken in Indonesia)' } },
  IT: { name: 'Italy', langs: { 'it-IT': 'Italian (as spoken in Italy)' } },
  JP: { name: 'Japan', langs: { 'ja-JP': 'Japanese (as spoken in Japan)' } },
  KR: { name: 'Korea, Republic of', langs: { 'ko-KR': 'Korean (as spoken in Republic of Korea)' } },
  MY: { name: 'Malaysia', langs: { 'ms-MY': 'Malay (macrolanguage) (as spoken in Malaysia)' } },
  NL: { name: 'Netherlands', langs: { 'nl-NL': 'Dutch (as spoken in Netherlands)' } },
  NO: { name: 'Norway', langs: { 'no-NO': 'Norwegian (as spoken in Norway)' } },
  PL: { name: 'Poland', langs: { 'pl-PL': 'Polish (as spoken in Poland)' } },
  BR: { name: 'Brazil', langs: { 'pt-BR': 'Portuguese (as spoken in Brazil)' } },
  PT: { name: 'Portugal', langs: { 'pt-PT': 'Portuguese (as spoken in Portugal)' } },
  RO: { name: 'Romania', langs: { 'ro-RO': 'Romanian (as spoken in Romania)' } },
  RU: { name: 'Russia', langs: { 'ru-RU': 'Russian (as spoken in Russian Federation)' } },
  SE: { name: 'Sweden', langs: { 'sv-SE': 'Swedish (as spoken in Sweden)' } },
  TH: { name: 'Thailand', langs: { 'th-TH': 'Thai (as spoken in Thailand)' } },
  PH: { name: 'Philippines', langs: { 'tl-PH': 'Tagalog (as spoken in Philippines)' } },
  TR: { name: 'Turkey', langs: { 'tr-TR': 'Turkish (as spoken in Turkey)' } },
  VN: { name: 'Vietnam', langs: { 'vi-VN': 'Vietnamese (as spoken in Viet Nam)' } },
  CN: { name: 'China', langs: { 'zh-CN': 'Chinese (as spoken in China)' } },
  TW: { name: 'Taiwan', langs: { 'zh-TW': 'Chinese (as spoken in Taiwan)' } },
}

export default REGIONS
