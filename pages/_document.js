import React from 'react';
import Document, { Html, NextScript, Head, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet(), sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              sheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {sheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
      return(
        <Html lang="en" dir="ltr">
          <Head>
            <meta charSet="utf-8" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://use.typekit.net/urt4ozf.css"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <meta name="theme-color" content="#000000" />
            <meta
              name="og:title"
              property="og:title"
              content="startGNV - Gainesville's Startup, Tech, and Biotech Community"
            />
            <meta
              name="og:description"
              property="og:description"
              content="startGNV is an initiative by startupGNV to promote and grow the Gainesville startup, tech, and biotech communities."
            />
            <meta name="og:image" property="og:image" content="/assets/migrated/startgnv-home.jpg" />
            <meta property="og:type" content="website" />
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <script src="static/facebook.js"></script>
            <script id="mcjs" src = "/static/mailchimp.js"></script>
            <script src="/static/hotjar.js"></script>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
  }
}
