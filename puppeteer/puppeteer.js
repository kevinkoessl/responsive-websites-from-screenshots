const puppeteer = require('puppeteer');
const fs = require('fs');
const numberOfSamples = 100;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5000/');

    for (let i = 1; i < numberOfSamples; i++) {
        if (!fs.existsSync('./sample' + i)) {
            fs.mkdir('./sample' + i);
        }
    }

    for (let i = 1; i < numberOfSamples; i++) {
        await page.setViewport({
            width: 320,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: 'sample' + i + '/mobile.png', fullPage: true});
        await page.setViewport({
            width: 640,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: 'sample' + i + '/tablet.png', fullPage: true});
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.screenshot({path: 'sample' + i + '/desktop.png', fullPage: true});
        const html = await page.evaluate(el => el.innerHTML, await page.$('#app'));
        fs.writeFileSync('sample' + i + '/body.html', html);
        await page.reload();
    }
    await browser.close();
})();