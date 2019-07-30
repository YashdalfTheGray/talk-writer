import { writeFile, readFile } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

export async function conditionallyWriteFile(
  path: string,
  content: string,
  overwrite: boolean
) {
  try {
    await readFileAsync(path, 'utf-8');
    if (overwrite) {
      console.log('File already exists, overwriting.');
      return writeFileAsync(path, content, 'utf-8');
    } else {
      console.log('File already exists, use --overwrite flag to replace.');
      return Promise.resolve();
    }
  } catch (e) {
    return writeFileAsync(path, content, 'utf-8');
  }
}
