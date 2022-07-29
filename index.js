import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

async function getWebsite1(){

    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://www.stilt.com/blog/2018/01/top-100-us-universities-computer-science/');

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
        };
    });

    const $ = cheerio.load(pageData.html);

    let website1 = [];


    $('tr').children('td:nth-child(2)').each(function(i, name){
        website1.push($(name).text());
    })

    await browser.close();

    console.log(website1);
}

async function getWebsite2(){
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 10000 })
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://www.collegevine.com/schools/best-colleges-for-computer-science');

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
        };
    });

    const $ = cheerio.load(pageData.html);

    let website2 = [];

    $('.font-weight-bold.fw-bold.cursor-pointer.text-primary').each(function(i, name){
        website2.push($(name).text().toUpperCase().split(' | ')[0]);
    })

    website2 = website2.slice(0, 100);

    await browser.close();

    console.log(website2);
}

async function getWebsite3(){
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 10000 })
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://www.collegefactual.com/majors/computer-information-sciences/computer-science/rankings/top-ranked/');

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
        };
    });

    const $ = cheerio.load(pageData.html);

    let website3 = [];

    $('.school-name').each(function(i, name){
        website3.push($(name).text().toUpperCase());
    })

    $('tbody').children('tr').not('.featured-school-row').children('td:nth-child(2)').children('a').each(function(i, name){
        website3.push($(name).text().toUpperCase());
    })

    website3 = website3.slice(0, 100);

    await browser.close();

    console.log(website3);
 
}

getWebsite2();