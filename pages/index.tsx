import type { NextPage } from 'next'
import Head from 'next/head'
import AllPatterns from '../components/AllPatterns'




const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>Pattern_hub</title>
    </Head>
    <div className="py-10">
      <AllPatterns/>
    </div>
    </>
  )
}

export default Home
