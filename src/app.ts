import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

let coursePageUrl: string = 'https://nptel.ac.in/courses/nptel_download.php?subjectid=106106179';

async function main(): Promise<void>{
    let strToWrite: string = '';
    // get the course page URL
    let coursePageResponse = await axios.get(coursePageUrl);
    let $ = cheerio.load(coursePageResponse.data);

    let videoElements = $('table#myTABLE > tbody > tr > td:nth-of-type(3) > a');

    videoElements.toArray().forEach((e, i) => {
        let fileUrl: string = $(e).attr('href');
        strToWrite += 'wget -c "https://nptel.ac.in' + fileUrl + '" -O "' + i + '.mp4"' + '\n';
    });

    fs.writeFileSync('wget.sh', strToWrite);
}

main();