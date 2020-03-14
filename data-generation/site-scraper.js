const puppeteer = require('puppeteer');
const fs = require('fs');
const targetDirectory = './datasets';
const numberOfSamples = 1500;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5000/');

    const directoryName = new Date().toISOString();
    if (!fs.existsSync(`${targetDirectory}/${directoryName}`)) {
        fs.mkdir(`${targetDirectory}/${directoryName}`);
    }

    for (let i = 0; i < numberOfSamples; i++) {
        let sampleDirectoryName = `${targetDirectory}/${directoryName}/${i.toString(16)}`;
        if (!fs.existsSync(sampleDirectoryName)) {
            fs.mkdir(sampleDirectoryName);
        }
    }

    for (let i = 0; i < numberOfSamples; i++) {
        let sampleDirectoryName = `${targetDirectory}/${directoryName}/${i.toString(16)}`;
        await page.setViewport({
            width: 320,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: `${sampleDirectoryName}/mobile.png`, fullPage: true});
        await page.setViewport({
            width: 640,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: `${sampleDirectoryName}/tablet.png`, fullPage: true});
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: `${sampleDirectoryName}/desktop.png`, fullPage: true});
        let html = await page.evaluate(el => el.innerHTML, await page.$('#app'));
        fs.writeFileSync(`${sampleDirectoryName}/body.html`, html.replace(/\<!----\>/g, ''));
        await page.reload();
    }
    await browser.close();
})();