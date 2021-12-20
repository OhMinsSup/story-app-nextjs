import path from 'path';
const __dirname = path.resolve();

export function parseEnv(env) {
  switch (env) {
    case 'development':
      return 'development';
    case 'production':
      return 'production';
    case 'local':
      return 'local';
    case 'analyze':
      return 'local.analyze';
    case 'debug':
      return 'local.debug';
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
}

export function getEnvironment(args) {
  const env = parseEnv(args);
  const copyPath = path.join(__dirname, `./scripts/env/.env.${env}`);
  const filePath = path.join(__dirname, './.env');
  console.log(filePath);
  return {
    envType: env,
    copyPath,
    filePath,
  };
}
