// wtsnsand01@gmail.com

const CoinHive = require('coin-hive');
const http = require('http');

(async () => {

  // Create miner
  const miner = await CoinHive('6WXJ0I0STDT8QHwDo1I2Gg4NxLKyBxKx'); // Coin-Hive's Site Key

  // Start miner
  await miner.start();

  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

  const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }

  const server = http.createServer(requestHandler)

  var port_number = 8080
  if (process.env.PORT !== undefined) {
    port_number = process.env.PORT
  }

  server.listen(port_number, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
