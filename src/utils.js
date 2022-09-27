const axios = require("axios");
const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser();
const { createPost } = require('./recent-post');

async function getDataFromMediumFeed(blogname) {
    try {
        const res = await axios.get(`https://medium.com/@${blogname}/feed`);
        if (res.status === 200) {
            console.log(res.data);
            return res.data;
        }
        else {
            console.log('error');
            return null;
        }
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const replaceHtmlTag = (contents) => {
    const result = contents.replace(/(<([^>]+)>)/gi, "");
    return result;
}

const createShortDescription = (contents) => {
    const shortDescription = replaceHtmlTag(contents).substring(0, 100) + '...';
    return shortDescription;
}

const getData = async (blogname) => {
    r = await getDataFromMediumFeed(blogname);
    const result = parser.parse(r);
    const items = result.rss.channel.item[0];
    const title = result.rss.channel.item[0].title;
    const category = result.rss.channel.item[0].category[0];
    const description = createShortDescription(result.rss.channel.item[0]['content:encoded']);
    const pubDate = result.rss.channel.item[0].pubDate.split(',')[1].split(' ')[1] + ' ' + result.rss.channel.item[0].pubDate.split(',')[1].split(' ')[2];
    const username = result.rss.channel.title.replace("Stories by ", "").replace(" on Medium", "");
    const post = createPost(username, pubDate, title, description, category);
    return post;
}