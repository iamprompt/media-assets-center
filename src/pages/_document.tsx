import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          {[
            'is1-ssl.mzstatic.com',
            'is2-ssl.mzstatic.com',
            'is3-ssl.mzstatic.com',
            'is4-ssl.mzstatic.com',
            'is5-ssl.mzstatic.com',
          ].map((l) => (
            <link rel="preconnect" href={l} key={l} />
          ))}
        </Head>
        <body className="bg-[#f5f5f7]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
