import chalk from 'chalk';
import shell from 'shelljs';
import * as Commander from 'commander';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';

const program = new Commander.Command('story-app')
  .option(
    '-e, --environment <environment>',
    '어떤 .env.* 환경변수 파일을 사용할지 선택합니다.',
    'local',
  )
  .option(
    '-d --deploy <deploy>',
    '어떤 타입의 방법 으로 serverless 배포를 할지 선택합니다. --example [type](profile, cli)',
  )
  .allowUnknownOption()
  .parse(process.argv);

const regex = /^(local|development|production|dev|prod|p|d)$/;

const transformEnvironment = (environment) => {
  if (environment.match(/^(dev|development|d)$/)) {
    return environment.replace(/^(dev|development|d)$/, '.env.development');
  }

  if (environment.match(/^(prod|production|p)$/)) {
    return environment.replace(/^(prod|production|p)$/, '.env.production');
  }

  return environment.replace(regex, '.env.$1');
};

const transformServerless = (serverless) => {
  if (serverless.match(/^(dev|development|d)$/)) {
    return serverless.replace(/^(dev|development|d)$/, 'development.yml');
  }

  if (serverless.match(/^(prod|production|p)$/)) {
    return serverless.replace(/^(prod|production|p)$/, 'production.yml');
  }

  return serverless.replace(regex, '$1.yml');
};

function deploy(params) {
  const {
    deployGroup,
    deployType,
    rootServerless = 'serverless.yml',
    type = 'profile',
  } = params;

  const { AWS_PROFILE_NAME } = process.env;

  switch (type) {
    case 'profile': {
      if (!AWS_PROFILE_NAME) {
        console.log(
          chalk.red(
            `[Deploy] - AWS_PROFILE_NAME is not found. Please set AWS_PROFILE_NAME environment variable.`,
          ),
        );
        shell.exit(1);
      }

      // AWS SDK configuration
      const credentials = new AWS.SharedIniFileCredentials({
        profile: AWS_PROFILE_NAME,
      });

      if (
        [credentials.secretAccessKey, credentials.accessKeyId].some((v) => !v)
      ) {
        console.log(
          chalk.red(
            `[Deploy] - AWS credentials "secretAccessKey", "accessKeyId" is not found. Please set Credentials variable.`,
          ),
        );
        shell.exit(1);
      }

      shell.env['AWS_PROFILE'] = AWS_PROFILE_NAME;

      console.log(
        chalk.gray(
          `[Deploy] - AWS_PROFILE_NAME is set. AWS_PROFILE: ${AWS_PROFILE_NAME}`,
        ),
      );
      break;
    }
    case 'cli': {
      const { AWS_SECRET_KEY, AWS_ACCESS_KEY } = process.env;
      if ([AWS_SECRET_KEY, AWS_ACCESS_KEY].some((v) => !v)) {
        console.log(
          chalk.red(
            `[Deploy] - AWS credentials "AWS_SECRET_KEY", "AWS_ACCESS_KEY" is not found. Please set Credentials variable.`,
          ),
        );
        shell.exit(1);
      }

      shell.exec(`aws configure set aws_access_key_id ${AWS_ACCESS_KEY}`);
      shell.exec(`aws configure set aws_secret_access_key ${AWS_SECRET_KEY}`);
      break;
    }
    default:
      console.log(
        chalk.red(
          `[Deploy] - Unknown deploy type. Please set --deploy [type](profile, cli)`,
        ),
      );
      shell.exit(1);
  }

  console.log(chalk.gray(`[Deploy] - Current AWS configure list Info`));
  shell.exec('aws configure list');

  console.log(
    chalk.gray(`[Deploy] - Remove serverless and serverless_nextjs folder.`),
  );
  shell.rm('-rf', '.serverless', '.serverless_nextjs');
  console.log(
    chalk.green(
      `[Deploy] - Remove serverless and serverless_nextjs folder success.`,
    ),
  );

  if (!deployGroup) {
    console.log(
      chalk.red(
        `[Deploy] - DEPLOY_GROUP is not found. Please set DEPLOY_GROUP environment variable.`,
      ),
    );
    shell.exit(1);
  }

  const serverless = transformServerless(deployType);

  const appPath = path.resolve();
  const configPath = path.resolve(appPath, './scripts/serverless');

  const serverlessPath = path.resolve(configPath, serverless);
  const rootPath = path.resolve(appPath, rootServerless);

  // env variables copy for env to root folder .env copy
  fs.copyFileSync(serverlessPath, rootPath);
  // success load by project environment variables
  console.log(`${chalk.green('Success!')} Created ${serverlessPath}`);
  console.log(
    chalk.gray(
      `[Deploy] - Deploy serverless.yml file to ${deployGroup} serverless.yml file.`,
    ),
  );
  shell.exec('yarn serverless');
  console.log(
    chalk.green(
      `[Deploy] - Deploy serverless.yml file to ${deployGroup} serverless.yml file success.`,
    ),
  );
}

function environmentSetting(params) {
  const { rootEnvironment = '.env', environment = '.env.local' } = params;
  const appPath = path.resolve();
  const configPath = path.resolve(appPath, './scripts/config');

  // config 폴더가 없으면 생성
  if (!fs.existsSync(configPath)) {
    console.log(
      chalk.yellow('Environment] -  config empty, create config folder'),
    );
    shell.mkdir('-p', configPath);
  }

  const validFiles = [
    '.env.local',
    '.env.dev',
    '.env.development',
    '.env.prod',
    '.env.production',
    '.env.test',
  ];

  const checkList = fs
    .readdirSync(configPath)
    .filter((file) => !validFiles.includes(file));
  if (checkList.length > 0) {
    console.log(
      chalk.yellow(
        `[Environment] - config files is not found ${chalk.blue(
          checkList.join(', '),
        )}`,
      ),
    );
    shell.exit(1);
  }

  // load by project environment variables
  let env;

  const envPath = path.resolve(configPath, environment);
  const rootPath = path.resolve(appPath, rootEnvironment);

  try {
    env = dotenv.config({
      path: envPath,
    });

    if (env.error) {
      throw env.error;
    }
  } catch (error) {
    console.log(
      `${chalk.red(
        `[Environment] - "${error.message}"`,
      )}. Please fix the environment variable and try again.`,
    );
    shell.exit(1);
  }

  if (!env) {
    console.log(
      ` ${chalk.red(
        ` [Environment] - "${configPath}" is not found. `,
      )}. Please fix the environment variable and try again.`,
    );
    shell.exit(1);
  }

  // env variables copy for env to root folder .env copy
  fs.copyFileSync(envPath, rootPath);
  // success load by project environment variables
  console.log(`${chalk.green('Success!')} Created ${rootEnvironment}`);
}

export function run() {
  const options = program.opts();

  if (options.environment && !regex.test(options.environment)) {
    console.log(
      chalk.red(`[cli] - "${options.environment}" is not valid environment.`),
    );
    shell.exit(1);
  }

  const environment = transformEnvironment(options.environment);

  environmentSetting({
    rootEnvironment: '.env',
    environment,
  });

  if (options.deploy) {
    const deployGroup = process.env.DEPLOY_GROUP;
    if (deployGroup) {
      deploy({
        rootServerless: 'serverless.yml',
        deployGroup,
        deployType: options.environment,
        type: options.deploy,
      });
    } else {
      console.log(
        chalk.red(
          `[Deploy] - DEPLOY_GROUP is not found. Please set DEPLOY_GROUP environment variable.`,
        ),
      );
    }
  }
  return;
}

run();
