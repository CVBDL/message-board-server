import * as fs from 'fs';
import * as path from 'path';


export function getAbsoluteFilePath(relativeFilePath: string): string {
  const absoluteFilePath: string = path.join(__dirname, relativeFilePath);

  return absoluteFilePath;
}

export function loadFile(absoluteFilePath: string, encoding: string = 'utf8'): string | null {
  if(!fs.existsSync(absoluteFilePath)) {
    return null;
  }

  const options = {
    encoding: encoding,
    flag: 'r'
  };

  try {
    const content: string = fs.readFileSync(absoluteFilePath, options);
    return content;

  } catch(e) {
    return null;
  }
}
