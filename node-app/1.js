const Bottleneck = require('bottleneck');
const fs = require('fs/promises');
const path = require('path');

const limiter = new Bottleneck({ maxConcurrent: 1000 });

async function runIoTest() {
  const dir = path.join(__dirname, 'temp');
  await fs.mkdir(dir, { recursive: true });

  const promises = [];
  for (let i = 0; i < 10000; i++) {
    const filePath = path.join(dir, `file-${i}.txt`);
    promises.push(limiter.schedule(() => fs.writeFile(filePath, `Hello ${i}`)));
  }

  await Promise.all(promises);
  console.log('Done!');
}

runIoTest().catch(console.error);