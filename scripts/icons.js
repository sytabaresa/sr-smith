import {
    generateImages,
    appleDeviceSpecsForLaunchImages as _appleDeviceSpecsForLaunchImages
} from 'pwa-asset-generator';

import fs from "fs"
import path from "path"


// Generate images over a module function call, instead of using CLI commands
(async () => {
    const ASSETS_PATH = './public/pwa'
    await generateImages(
        './public/images/logo.svg',
        ASSETS_PATH, {
            iconOnly: true,
            favicon: true,
            // background: '#FFF',
            // padding: "10%"
            opaque: false,
            // favicon: true,
        });

    await generateImages(
        './public/images/logo-dark.svg',
        ASSETS_PATH, {
            iconOnly: true,
            background: '#000',
            padding: "20%"
            // opaque: false,
            // favicon: true,
        });

    fs.renameSync(path.join(ASSETS_PATH, "manifest-icon-192.maskable.png"), path.join(ASSETS_PATH, "manifest-icon-192.any.png"))
    fs.renameSync(path.join(ASSETS_PATH, "manifest-icon-512.maskable.png"), path.join(ASSETS_PATH, "manifest-icon-512.any.png"))


    await generateImages(
        // './public/images/logo-dark.png',
        './splash/dist/index.html',
        ASSETS_PATH, {
            // padding: '20%',
            // scrape: false,
            // background: "black",
            // splashOnly: true,
            // portraitOnly: true,
            // favicon: true,
            xhtml: true,
            manifest: './public/manifest.webmanifest',
            mstile: true,
            // index: './pages/_document.tsx'
            // log: false
        });


})();

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = _appleDeviceSpecsForLaunchImages;