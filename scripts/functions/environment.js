const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

// functions/index.js를 기준으로 폴더위 위치
const folderNameByConfig = '../config';

// Nextjs에서 읽을 환경변수 파일
const fileNameByEnv = '../../.env';

function targetEnvConfig(name) {
  switch (name) {
    case 'development':
      return '.env.development';
    case 'production':
      return '.env.production';
    case 'local':
      return '.env.local';
    case 'analyze':
      return '.env.local.analyze';
    case 'debug':
      return '.env.local.debug';
    default:
      throw new Error(`Unknown environment: ${name}`);
  }
}

function environment(value) {
  if (!value) {
    throw new Error('Environment is not defined');
  }

  const name = targetEnvConfig(value);
  const configEnv = path.join(__dirname, `${folderNameByConfig}/${name}`);
  const targetEnv = path.join(__dirname, fileNameByEnv);
  return {
    envName: name,
    configEnv,
    targetEnv,
  };
}

process.on('unhandledRejection', (err) => {
  throw err;
});

function bootstrap() {
  // 어떤 환경 변수 파일을 읽을지 설정
  const { configEnv, targetEnv, envName } = environment(process.env.LOCAL);

  // load by project environment variables
  const env = dotenv.config({
    path: configEnv,
  });

  if (env.error) {
    console.error(`Error: dotenv loaded environment file errors: `, env.error);
    shell.exit(1);
  }

  shell.echo(`copy: ${envName} ====> .env`);
  // env variables copy for env to root folder .env copy
  fs.copyFileSync(configEnv, targetEnv);
  // success load by project environment variables
  shell.echo('copy: success');
  shell.exit(0);
}

bootstrap();
