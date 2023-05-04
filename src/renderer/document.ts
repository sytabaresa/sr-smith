import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr/server";

export default document

function document(title: string, desc: string, pageHtml: string) {

    return escapeInject`<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="application-name" content="${title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Sr Smith">
    <meta name="description" content="${title}">
    <meta name="format-detection" content="telephone=no">
    <meta name="mobile-web-app-capable" content="yes">
    <!--     
    <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
    <meta name='msapplication-TileColor' content='#2B5797' />
    <meta name='msapplication-tap-highlight' content='no' />  -->
    <meta name="theme-color" content="#000000">

    <meta name="msapplication-square70x70logo" content="./public/pwa/mstile-icon-128.png">
    <meta name="msapplication-square150x150logo" content="./public/pwa/mstile-icon-270.png">
    <meta name="msapplication-square310x310logo" content="./public/pwa/mstile-icon-558.png">
    <meta name="msapplication-wide310x150logo" content="./public/pwa/mstile-icon-558-270.png">

    <link rel="manifest" href="/manifest.webmanifest">
    <!-- {/*
    <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' /> */} -->
    <link rel="shortcut icon" href="/pwa/favicon-196.png">
    <link rel="icon" type="image/png" sizes="196x196" href="/pwa/favicon-196.png">
    <link rel="icon" href="/images/logo.svg" type="image/svg+xml">


    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"> 
    <link rel="stylesheet" href="./src/common/styles/fonts.css"> -->

    <meta name="twitter:card" content="summary">
    <meta name="twitter:url" content="https://sr-smith.syta.co">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${desc}">
    <meta name="twitter:image" content="https://sr-smith.syta.co/pwa/apple-icon-180.png">
    <meta name="twitter:creator" content="@sytabares">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:site_name" content="${title}">
    <meta property="og:url" content="https://sr-smith.syta.co">
    <meta property="og:image" content="https://sr-smith.syta.co/pwa/apple-touch-icon.png">

    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover">

    <link rel="apple-touch-icon" href="./public/pwa/apple-icon-180.png">

    <meta name="apple-mobile-web-app-capable" content="yes">

    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2388-1668.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1536-2048.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2048-1536.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1668-2224.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2224-1668.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1620-2160.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2160-1620.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1290-2796.jpg" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2796-1290.jpg" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1179-2556.jpg" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2556-1179.jpg" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1284-2778.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2778-1284.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1170-2532.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2532-1170.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1125-2436.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2436-1125.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1242-2688.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2688-1242.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-828-1792.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1792-828.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1242-2208.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-2208-1242.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-750-1334.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1334-750.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-640-1136.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
    <link rel="apple-touch-startup-image" href="./public/pwa/apple-splash-1136-640.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
    <title>${title}</title>

    <!--<link rel="preload" as="image" href="/images/smith-chart-dark.svg">
    <link rel="preload" as="image" href="/images/smith-chart.svg">-->
</head>
<body classname="antialiased overflow-hidden overflow-y-auto relative">
    <script>
        if(typeof Storage!=="undefined"){const theme=JSON.parse(localStorage.getItem("theme")||'"notheme"')
        if(typeof window!='undefined'&&theme!='notheme'){document.documentElement.setAttribute("data-theme",theme)}}
    </script>
    <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
</body>
</html>`
}