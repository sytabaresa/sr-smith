const pwaAssetGenerator = require('pwa-asset-generator');

// Generate images over a module function call, instead of using CLI commands
(async () => {
    const {
        savedImages,
        htmlMeta,
        manifestJsonContent
    } = await pwaAssetGenerator.generateImages(
        './public/images/logo.png',
        './public/pwa', {
            // scrape: false,
            background: "white",
            // splashOnly: true,
            // portraitOnly: true,
            favicon: true,
            xhtml: true,
            manifest: './public/manifest.json',
            mstile: true,
            // index: './pages/_document.tsx'
            // log: false
        });
})();

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages;