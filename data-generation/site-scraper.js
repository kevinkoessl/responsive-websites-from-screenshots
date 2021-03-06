const puppeteer = require('puppeteer');
const fs = require('fs');
const targetDirectory = './datasets';
const numberOfSamples = 1750;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5000/');

    const directoryName = new Date().toISOString();
    if (!fs.existsSync(`${targetDirectory}/${directoryName}`)) {
        fs.mkdirSync(`${targetDirectory}/${directoryName}`);
    }

    for (let i = 0; i < numberOfSamples; i++) {
        let sampleDirectoryName = `${targetDirectory}/${directoryName}`;
        console.log('Generating Sample ' + (i + 1));
        await page.setViewport({
            width: 768,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: `${sampleDirectoryName}/${i.toString(16)}_tablet.png`, fullPage: true});
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: `${sampleDirectoryName}/${i.toString(16)}_desktop.png`, fullPage: true});

        let guiString = await page.evaluate(() => guiString);

        fs.writeFileSync(`${sampleDirectoryName}/${i.toString(16)}.gui`, guiString);
        await page.reload();
    }
    await browser.close();
})();
