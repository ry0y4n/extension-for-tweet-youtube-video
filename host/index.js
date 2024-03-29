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

//標準入力処理
process.stdin.on('readable', () => {
    var input = []
    var chunk
    while (chunk = process.stdin.read()) {
      input.push(chunk)
    }
    input = Buffer.concat(input)
  
    var msgLen = input.readUInt32LE(0)
    var dataLen = msgLen + 4
  
    if (input.length >= dataLen) {
      var content = input.slice(4, dataLen)
      var json = JSON.parse(content.toString())
      handleMessage(json)
    }
  })
  
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
      
      fs.unlink(`${__dirname}/video/video-clip.mp4`, ((err) => {
        if (err) throw err;
        sendMessage({message: 'pong'});
      }));
    }
  }
  
  //標準出力処理
  function sendMessage(msg) {
    var buffer = Buffer.from(JSON.stringify(msg))
  
    var header = Buffer.alloc(4)
    header.writeUInt32LE(buffer.length, 0)
  
    var data = Buffer.concat([header, buffer])
    process.stdout.write(data)
  }
  
  //エラー処理
  process.on('uncaughtException', (err) => {
    sendMessage({error: err.toString()})
  })