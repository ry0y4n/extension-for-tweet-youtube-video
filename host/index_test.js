#!/usr/bin/env /usr/local/bin/node

const youtubedl = require('youtube-dl-exec');
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const secrets = JSON.parse(fs.readFileSync('secrets.json'));

const client = new TwitterApi({
    appKey: secrets["appKey"],
    appSecret: secrets["appSecret"],
    accessToken: secrets["accessToken"],
    accessSecret: secrets["accessSecret"]
});

async function getVideo(url, flags) {
  return youtubedl(url, {...flags});
};

function convertYouTubeUrl(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
  const match = url.match(regex);
  if (match) {
    const videoId = match[1];
    return `youtu.be/${videoId}`;
  } else {
    throw new Error('Invalid YouTube URL');
  }
}

input_sample = {
  message: 'ping',
  body: 'hello from browser extension',
  url: 'https://www.youtube.com/watch?v=lN5yxQFIb38',
  title: '【ラップスタア誕生コラボ】 SEEDA Presents RAPSTAR CYPHER / 7 × Myghty Tommy × Spada × Whoopee Bomb - YouTube'
}

async function handleMessage (req) {
  if (req.message === 'ping') {
    await getVideo(req.url, {
      f: "22/18",
      o: `${__dirname}/video/video-clip.%(ext)s`
    });

    let convertedUrl = convertYouTubeUrl(req.url);
    let title = req.title.replace(/ - YouTube$/, "");
    const mediaIds = await client.v1.uploadMedia(`${__dirname}/video/video-clip.mp4`);

    await client.v2.tweet({
        text: `${title} ${convertedUrl} @YouTubeより`,
        media: { media_ids: [mediaIds] }
    });
    
    console.log('tweeted')

    fs.unlink(`${__dirname}/video/video-clip.mp4`, ((err) => {
      if (err) throw err;
    }));
  }
}

handleMessage(input_sample)
