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
      return writeFileAsync(path, content, 'utf-8');
    } else {
      return Promise.resolve();
    }
  } catch (e) {
    return writeFileAsync(path, content, 'utf-8');
  }
}
