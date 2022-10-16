import '../styles/globals.css';
// import '../styles/codethemes/nightOwl.css';
import type { AppProps } from 'next/app'
import Layout from '../layouts/Layout'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
