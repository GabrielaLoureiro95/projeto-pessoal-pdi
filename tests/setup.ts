// tests/setup.ts
import { server } from 'serverest';

let serverInstance: any;

export async function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    serverInstance = server({
      port: 3000,
    });
    
    serverInstance.listen(3000, () => {
      console.log('✅ ServeRest running on http://localhost:3000');
      resolve();
    });

    serverInstance.on('error', (error: any) => {
      console.error('❌ Failed to start ServeRest:', error);
      reject(error);
    });
  });
}

export async function stopServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('✅ ServeRest stopped');
        resolve();
      });
    } else {
      resolve();
    }
  });
}
