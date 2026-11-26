// tests/global-teardown.ts
import { stopServer } from './setup';

module.exports = async () => {
  await stopServer();
};
