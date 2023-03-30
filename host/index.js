#!/usr/bin/env /usr/local/bin/node

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
  
  function handleMessage (req) {
    if (req.message === 'ping') {
      sendMessage({message: 'pong', body: 'hello from nodejs app',ping_body:req.body})
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