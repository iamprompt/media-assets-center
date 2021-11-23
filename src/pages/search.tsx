import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../components/common/layout'
import { APPLE_TV_API } from '../utils/helpers'
import Card from '../components/card'
import { useCallback, useEffect, useState } from 'react'
import { SearchResponse } from '../@types/atv-search-response'
import axios from 'axios'
import REGIONS from '../utils/constant/region'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const q = query?.q && !Array.isArray(query.q) ? query.q : undefined
  const country = query?.country && !Array.isArray(query.country) ? query.country : 'TH'
  const locale =
    query?.locale && !Array.isArray(query.locale)
      ? query.locale
      : country
      ? Object.keys(REGIONS[country.toUpperCase()].langs)[0]
      : 'th-TH'

  if (q) {
    const {
      data: { data },
    } = await APPLE_TV_API.SEARCH_MEDIA({
      country: country,
      query: q,
    })
    return { props: { data, q: q, country: country?.toUpperCase(), locale: locale } }
  }

  return {
    props: {},
  }
}

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, q, country, locale }) => {
  const [d, setD] = useState<SearchResponse | undefined>(data)

  const [searchText, setSearchText] = useState<string>(q || '')
  const [searchCountry, setSearchCountry] = useState<string>(country || 'TH')

  const [currentSearchText, setCurrentSearchText] = useState<string>(q || '')
  const [currentSearchCountry, setCurrentSearchCountry] = useState<string>(country || 'TH')

  const [availableLocale, setAvailableLocale] = useState<{ [key: string]: string }>({})
  const [searchLocale, setSearchLocale] = useState<string>(locale || 'th-TH')
  const [currentSearchLocale, setCurrentSearchLocale] = useState<string>(locale || 'th-TH')

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    try {
      const { data } = await axios.get<SearchResponse>('/api/search', {
        params: {
          query: searchText,
          country: searchCountry,
        },
      })

      setCurrentSearchText(searchText)
      setCurrentSearchLocale(searchLocale)
      setCurrentSearchCountry(searchCountry)

      setD(data)

      const newRoute = {
        pathname: '/search',
        query: { q: searchText, country: searchCountry, locale: searchLocale },
      }
      // push(newRoute, newRoute, { shallow: true })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setAvailableLocale(REGIONS[searchCountry.toUpperCase()].langs)
    setSearchLocale(Object.keys(availableLocale)[0])
  }, [searchCountry, availableLocale])

  return (
    <Layout>
      <div className="pt-5 px-5">
        <form>
          <div className="flex flex-col w-10/12 md:w-2/3 mx-auto space-y-5">
            <h1 className="text-4xl font-bold text-center">Search</h1>
            <div className="mt-1 relative rounded-xl shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">ค้นหา</span>
              <input
                type="text"
                className="w-full rounded-xl border-gray-200 focus:border-gray-500 ring-0 p-2 pl-16 pr-60"
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
                  {Object.entries(REGIONS).map(([c, v]) => (
                    <option key={v.name} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center w-5 h-full mr-3">
                <button className="relative h-full w-full" type="submit" onClick={handleSearch}>
                  <Image
                    src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' data-svg='search'%3E%3Ccircle fill='none' stroke='%23000' stroke-width='1.1' cx='9' cy='9' r='7'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23000' stroke-width='1.1' d='M14,14 L18,18 L14,14 Z'%3E%3C/path%3E%3C/svg%3E"
                    alt="Search"
                    layout="fill"
                  />
                </button>
              </span>
            </div>
          </div>
        </form>
        {d && (
          <div className="mt-10">
            <div className="text-center space-y-3 mb-5">
              <h1 className="font-bold font-headline text-2xl">Search Result for</h1>
              <h2 className="font-bold font-headline text-4xl">{currentSearchText}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {d.canvas.shelves.map((shelf) => {
                if (!['uts.col.search.SH', 'uts.col.search.MV'].includes(shelf.id)) return null
                return shelf.items.map((item) => (
                  <Card
                    // @ts-expect-error
                    d={item}
                    key={item.id}
                    option={{ country: currentSearchCountry, locale: currentSearchLocale }}
                  />
                ))
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage
