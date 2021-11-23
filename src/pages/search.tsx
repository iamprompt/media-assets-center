import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '../components/common/layout'
import { APPLE_TV_API } from '../utils/helpers'
import Card from '../components/card'
import { useState } from 'react'
import { SearchResponse } from '../@types/atv-search-response'
import axios from 'axios'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  // const { data } = await APPLE_TV_API.GET_MEDIA_INFO({ country: 'th', cId: 'umc.cmc.5983fipzqbicvrve6jdfep4x3' })
  console.log(query)

  if (query?.q && !Array.isArray(query.q)) {
    const {
      data: { data },
    } = await APPLE_TV_API.SEARCH_MEDIA({
      country: query?.country && !Array.isArray(query.country) ? query.country : 'th',
      query: query.q,
    })
    return { props: { data, query: query.q, country: query.country || 'th' } }
  }

  return {
    props: {},
  }
}

const SearchPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data, query }) => {
  const [d, setD] = useState<SearchResponse | undefined>(data)
  const [searchText, setSearchText] = useState<string | undefined>(query)
  const [currentSearchText, setCurrentSearchText] = useState<string | undefined>(query)
  const [searchCountry, setSearchCountry] = useState('th')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data } = await axios.get<SearchResponse>('/api/search', {
      params: {
        query: searchText,
        country: searchCountry,
      },
    })

    setCurrentSearchText(searchText)
    setD(data)
  }

  return (
    <Layout>
      <div className="pt-5">
        <form>
          <div className="flex flex-col w-2/3 mx-auto space-y-5">
            <h1 className="text-4xl font-bold text-center">Search</h1>
            <input
              type="text"
              className="rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-600 p-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="text-center">
              <button type="submit" className="bg-green-500 text-white px-8 py-2 rounded-md" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </form>
        {d && (
          <div className="mt-10">
            <div className="text-center space-y-3 mb-5">
              <h1 className="font-bold font-headline text-2xl">Search Result for</h1>
              <h2 className="font-bold font-headline text-4xl">{currentSearchText}</h2>
            </div>
            <ul className="grid grid-cols-3 gap-5">
              {d.canvas.shelves[0].items.map((item) => (
                // @ts-expect-error
                <Card d={item} key={item.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage
