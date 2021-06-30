const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        for (let i = 2011; i < 2021; i++) {
            const page = await browser.newPage()
            let urls = [
                `https://mycadir.force.com/s/judgmentsearchresult?searchtype=judgmentsearch&naics=&accountName=&city=&zipCode=&judgmentdatefrom=${i}-01-01&judgmentdateto=${i}-05-31&court=&judgmentstatus=&defandantemployer=&judgmentTotalFrom=&judgmentTotalTo=&citationnumber=&diroffice=&dirOfficeId=&naicsCodeId=&courtId=&citationNumberId=&county=&naicsCodeTitle=`,
                `https://mycadir.force.com/s/judgmentsearchresult?searchtype=judgmentsearch&naics=&accountName=&city=&zipCode=&judgmentdatefrom=${i}-06-01&judgmentdateto=${i}-12-31&court=&judgmentstatus=&defandantemployer=&judgmentTotalFrom=&judgmentTotalTo=&citationnumber=&diroffice=&dirOfficeId=&naicsCodeId=&courtId=&citationNumberId=&county=&naicsCodeTitle=`
            ]
            for (let idx = 0; idx < 2; idx++) {
                await page.goto(urls[idx], { waitUntil: 'networkidle0' })
                await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: path.resolve(`./downloads/${i}${idx}`) })
                const buttons = await page.$x("//button[contains(., 'Download to Excel')]")
                await buttons[0].click()
                await page.waitForTimeout(5000)
            }
        }
        await browser.close()
    } catch (err) {
        console.log(`JANKY CODE ALERT:`)
        console.log(err)
    }
})()