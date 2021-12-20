import dotenv from 'dotenv';
import fs from 'fs';
import shell from 'shelljs';
import { getEnvironment } from './utils.mjs';

process.on('unhandledRejection', (err) => {
  throw err;
});

const { envType, filePath, copyPath } = getEnvironment(process.env.LOAD_ENV);

// load by project environment variables
const env = dotenv.config({
  path: copyPath,
});

if (env.error) {
  console.error(
    `Error: dotenv loaded environment file errors: .env.${envType}`,
    env.error,
  );
  console.log();
  shell.exit(1);
}

shell.echo(`copy: .env.${envType} ====> .env`);
// env variables copy for env to root folder .env copy
fs.copyFileSync(copyPath, filePath);
// success load by project environment variables
shell.echo(`copy: success`);
console.log();
shell.exit(0);
