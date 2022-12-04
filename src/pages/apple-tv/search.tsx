import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../../components/common/layout'
import Card from '../../components/platform/apple-tv/card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import REGIONS from '../../utils/platforms/apple-tv/region'
import Image from 'next/image'
import { ResultItem, SearchResultResponse } from '../../@types/platforms/apple-tv/api/atv-search'
import { ResponseProps } from '../../@types/api/common'
import SEO from '../../components/common/seo'
import { stringDefault } from '../../utils/helpers'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const platform = stringDefault(query?.platform, 'apple-tv')
  const q = stringDefault(query?.q, '')
  const country = stringDefault(query?.country, 'TH')
  const locale = stringDefault(query?.locale, Object.keys(REGIONS[country.toUpperCase()].langs)[0])

  if (q !== '') {
    const {
      data: {
        payload: { result },
      },
    } = await axios.get<ResponseProps<SearchResultResponse>>('/api/apple-tv/search', {
      params: {
        query: q,
        country: country,
        locale: locale,
      },
    })
    return { props: { data: { result, q, country, locale, platform } } }
  }

  return {
    props: { data: { result: null, q, country, locale, platform } },
  }
}

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  data: { result, q, country, locale, platform },
}) => {
  const [d, setD] = useState<ResultItem | null>(result)

  const [searchText, setSearchText] = useState<string>(q)
  const [searchCountry, setSearchCountry] = useState<string>(country)

  const [currentSearchText, setCurrentSearchText] = useState<string>(q)
  const [currentSearchCountry, setCurrentSearchCountry] = useState<string>(country)

  const [availableLocale, setAvailableLocale] = useState<{ [key: string]: string }>({})
  const [searchLocale, setSearchLocale] = useState<string>(locale)
  const [currentSearchLocale, setCurrentSearchLocale] = useState<string>(locale)

  useEffect(() => {
    if (localStorage.getItem('selected_country')) {
      setSearchCountry(localStorage.getItem('selected_country') as string)
      setCurrentSearchCountry(localStorage.getItem('selected_country') as string)
    }
    if (localStorage.getItem('selected_locale')) {
      setSearchLocale(localStorage.getItem('selected_locale') as string)
      setCurrentSearchLocale(localStorage.getItem('selected_locale') as string)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selected_country', searchCountry)
    localStorage.setItem('selected_locale', searchLocale)
  }, [searchCountry, searchLocale])

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    try {
      const {
        data: {
          payload: { result },
        },
      } = await axios.get<ResponseProps<SearchResultResponse>>('/api/apple-tv/search', {
        params: {
          query: searchText,
          country: searchCountry,
          locale: searchLocale,
        },
        headers: {
          'Accept-Encoding': 'identity',
        },
      })

      setCurrentSearchText(searchText)
      setCurrentSearchLocale(searchLocale)
      setCurrentSearchCountry(searchCountry)

      setD(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const selectedCountryLocale = REGIONS[searchCountry.toUpperCase()].langs
    console.log(selectedCountryLocale)

    setAvailableLocale(selectedCountryLocale)
    setSearchLocale(Object.keys(selectedCountryLocale)[0])
  }, [searchCountry])

  return (
    <SEO title={currentSearchText ? `ผลการค้นหา ${currentSearchText}` : 'ค้นหา'}>
      <Layout>
        <div className="pt-5 px-5 pb-10">
          <form>
            <div className="flex flex-col w-10/12 md:w-2/3 mx-auto space-y-5">
              <h1 className="text-4xl font-bold text-center">Search</h1>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">ค้นหา</span>
                <input
                  type="text"
                  className="w-full rounded-xl border-gray-200 focus:border-gray-500 ring-0 p-2 pl-16 pr-16"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="absolute inset-y-0 right-0 flex items-center mr-12">
                  <select
                    name="country"
                    id="country"
                    className="border-0 focus:ring-0 outline-transparent"
                    onChange={(e) => setSearchCountry(e.target.value)}
                    value={searchCountry}
                  >
                    {Object.entries(REGIONS)
                      .sort((a, b) => {
                        return a[0] > b[0] ? 1 : -1
                      })
                      .map(([c, v]) => (
                        <option key={v.name} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center w-5 h-full mr-3">
                  <button className="relative h-full w-full" type="submit" onClick={handleSearch}>
                    <img
                      src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' data-svg='search'%3E%3Ccircle fill='none' stroke='%23000' stroke-width='1.1' cx='9' cy='9' r='7'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23000' stroke-width='1.1' d='M14,14 L18,18 L14,14 Z'%3E%3C/path%3E%3C/svg%3E"
                      alt="Search"
                    />
                  </button>
                </span>
              </div>
            </div>
          </form>
          {d && (
            <div className="mt-10">
              <div className="text-center space-y-3 mb-5">
                <h1 className="font-bold font-headline text-2xl">ผลการค้นหาสำหรับ</h1>
                <h2 className="font-bold font-headline text-4xl">{currentSearchText}</h2>
                <h2 className="font-headline text-1xl">{`${REGIONS[currentSearchCountry.toUpperCase()].name} - ${
                  REGIONS[currentSearchCountry.toUpperCase()].langs[currentSearchLocale]
                }`}</h2>
              </div>
              <div className="space-y-10">
                {Object.entries(d).map(([shelfId, shelf]) => {
                  return (
                    <div key={shelfId}>
                      <h2 className="font-bold text-4xl mb-5">{shelf.title}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {Object.entries(shelf.items).map(([cId, item]) => (
                          <Card
                            cId={cId}
                            d={item}
                            key={cId}
                            option={{ country: currentSearchCountry, locale: currentSearchLocale }}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </SEO>
  )
}

export default SearchPage
