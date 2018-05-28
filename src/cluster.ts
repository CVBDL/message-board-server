import * as cluster from 'cluster';
import * as os from 'os';


if (cluster.isMaster) {
  let cpuCores = os.cpus().length;

  console.log(`Total workers: ${cpuCores}.`);

  cluster.on('online', worker => {
    console.log(`Worker with PID: ${worker.process.pid} is running.`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %d died (%s). restarting...',
                worker.process.pid, signal || code);
    cluster.fork();
  });

  while (cpuCores--) {
    cluster.fork();
  }

} else {
  require('./server');
}
