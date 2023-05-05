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
        './public/images/logo.png',
        ASSETS_PATH, {
            // iconOnly: true,
            background: '#000',
            padding: "20%",
            xhtml: true,
            manifest: './public/manifest.webmanifest',
            mstile: true,
            // opaque: false,
            // favicon: true,
        });

    await generateImages(
        './public/images/logo.png',
        ASSETS_PATH, {
            iconOnly: true,
            favicon: true,
            // background: '#FFF',
            padding: "2%",
            opaque: false,
            // favicon: true,
        });

    await generateImages(
        './public/images/logo.png',
        ASSETS_PATH, {
            iconOnly: true,
            // favicon: true,
            // background: '#FFF',
            padding: "22%",
            opaque: false,
            // favicon: true,
        });
})();

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = _appleDeviceSpecsForLaunchImages;