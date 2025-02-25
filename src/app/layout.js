import "./global.css";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/fonts-archive/AppleSDGothicNeo/AppleSDGothicNeo.css"
          type="text/css"
        />
        <title>frontend developer portfolio</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
