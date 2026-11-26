// tests/global-setup.ts
import { startServer } from './setup';

module.exports = async () => {
  await startServer();
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 2000));
};
