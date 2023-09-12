import {Script} from '@shopify/hydrogen';

export function GoogleGTM({id}: {id: string}) {
  return (
    <>
      {/* Initialize GTM container */}
      <Script
        id="gtm-init"
        dangerouslySetInnerHTML={{
          __html: `
              dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments)
              };

              gtag('js', new Date());
              gtag('config', "${id}");
          `,
        }}
      />

      {/* Load GTM script */}
      <Script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            var n=d.querySelector('[nonce]');
            n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', "${id}")
          `,
        }}
      />
    </>
  );
}
