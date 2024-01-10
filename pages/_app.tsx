/*
 * @Author: WGF
 * @Date: 2024-01-09 10:20:14
 * @LastEditors: WGF
 * @LastEditTime: 2024-01-09 11:42:14
 * @Description: 
 * @FilePath: /mycard/pages/_app.tsx
 */
// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
