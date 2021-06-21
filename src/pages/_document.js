import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
            <title>Chronos</title>
            <meta charset="UTF-8" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Chronos" />
            <meta name="keywords" content="chronos, calendar, events, event-calendar" />
            <meta name="author" content="Paul Litovka" />
            <meta name="owner" content="Paul Litovka" />
            <meta name="copyright" content="Paul Litovka" />
            <meta name="designer" content="Paul Litovka" />
            <meta name="reply-to" content="pashalitovka@gmail.com" />
            <meta name="distribution" content="global" />
            <meta name="subject" content="Event calendar" />
            <meta name="language" content="EN, RU, UK, HU, DE" />
            <meta name="coverage" content="worldwide" />
            <meta name="rating" content="general" />
            <meta name="robots" content="all" />
            <meta name="googlebot" content="all" />
            <meta name="googlebot-news" content="all" />
            <meta name="revisit-after" content="1 day" />
            <meta http-equiv="pragma" content="no-cache" />
            <meta http-equiv="cache-control" content="no-cache" />
            <meta name="theme-color" content="#7c6aef" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
