self.addEventListener(
  "install",
  function() {
    self.skipWaiting();
  }
);


self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(
      self.clients.claim()
    );

  }
);


self.addEventListener(
  "fetch",
  function(event) {

    const url =
      new URL(
        event.request.url
      );


    if (
      url.origin ===
        self.location.origin &&
      url.pathname ===
        "/manifest.webmanifest"
    ) {

      const page =
        String(
          url.searchParams.get(
            "page"
          ) || ""
        ).trim();


      const startUrl =
        page
          ? "/?page=" +
            encodeURIComponent(
              page
            )
          : "/";


      const appId =
        page
          ? "/memorial/" +
            encodeURIComponent(
              page
            )
          : "/";


      const manifest = {

        id:
          appId,

        name:
          "الباقية",

        short_name:
          "الباقية",

        start_url:
          startUrl,

        scope:
          "/",

        display:
          "standalone",

        background_color:
          "#F6F3EB",

        theme_color:
          "#123f36",

        icons: [
          {
            src:
              "/albaqia-icon-192.png",

            sizes:
              "192x192",

            type:
              "image/png"
          },

          {
            src:
              "/albaqia-icon-512.png",

            sizes:
              "512x512",

            type:
              "image/png"
          }
        ]

      };


      event.respondWith(

        new Response(
          JSON.stringify(
            manifest
          ),
          {
            headers: {

              "Content-Type":
                "application/manifest+json; charset=utf-8",

              "Cache-Control":
                "no-store"

            }
          }
        )

      );

    }

  }
);
