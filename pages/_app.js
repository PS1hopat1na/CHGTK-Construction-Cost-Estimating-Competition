import '../styles/globals.css'
import PrivacyBar from '../components/PrivacyBar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <PrivacyBar />
    </>
  );
}
