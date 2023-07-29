const axios = require("axios");
const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();

/*
    * Get data from medium feed
*/
async function getDataFromMediumFeed(blogname) {
    try {
        const res = await axios.get(`https://medium.com/@${blogname}/feed`);
        if (res.status === 200) {
            return res.data;
        }
        else {
            return null;
        }
    }
    catch (err) {
        return null;
    }
}

/*
    * Replace html tag 
*/
const replaceHtmlTag = (contents) => {
    const result = contents.replace(/(<([^>]+)>)/gi, "");
    return result;
}

/*
    * create short description
*/
const createShortDescription = (contents) => {
    const shortDescription = replaceHtmlTag(contents).substring(0, 60) + '...';
    return shortDescription;
}

/*
    * parse xml based on field
*/
const parseXml = (xml) => {
    const result = parser.parse(xml);
    const username = result.rss.channel.title.replace("Stories by ", "").replace(" on Medium", "");

    const item = result.rss.channel.item[0];
    const title = item.title;
    const category = Array.isArray(item.category) ? item.category[0] : item.category;
    const description = createShortDescription(item['content:encoded']);
    const pubDate = item.pubDate.split(',')[1].split(' ')[1] + ' ' + item.pubDate.split(',')[1].split(' ')[2];

    return { username, title, category, description, pubDate };
}

module.exports = { parseXml, getDataFromMediumFeed };