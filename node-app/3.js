const { Worker } = require('worker_threads');

function runInWorker() {
  return new Promise((resolve) => {
    const worker = new Worker(`
      const { parentPort } = require('worker_threads');
      function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
      parentPort.postMessage(fibonacci(40));
    `, { eval: true });

    worker.on('message', resolve);
  });
}

async function main() {
  console.time('Worker Task');
  const result = await runInWorker();
  console.timeEnd('Worker Task');
  console.log('Result:', result);
}

main();