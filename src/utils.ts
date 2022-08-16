import { statSync } from 'fs';
import { join } from 'path';

export interface FileExists {
  exists: boolean
  message?: string
  isFile?: boolean
  config?: Config
};

export interface Config {
  url: string
  db: string
  collection: string
  template: string
  amount: number
  delete?: boolean
};

export const fileExists = (path: string) => {
  let fileStat = statSync(path, {throwIfNoEntry:false});
  if (!fileStat) return { exists: false, message: `ENOENT: no such file or directory \'${path}\'` };
  const file = fileStat.isFile();
  return { exists: true, isFile: file };
};

export const hasConfig = async (): Promise<FileExists> => {
  const configPath = join(process.cwd(), 'nseed.config.json');
  const files = fileExists(configPath);
  if (files.exists && files.isFile === true) {
    const dynamicImport = await import(configPath);
    const config: Config = dynamicImport.default;
    return { exists: files.exists, config: config };
  } else {
    return files;
  };
};
