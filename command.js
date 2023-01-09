const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const { type, name } = args;

const createResource = (path, fileName) => {
  if (path && fileName) {
    if (fs.existsSync(path)) {
      if (!fs.existsSync(path + fileName)) {
        fs.appendFile(path + fileName, '', err => {
          if (err) throw err;
          console.log(`${fileName} successfully created!`);
        });
      } else {
        console.error(`${fileName} already exists!`);
      }
    } else {
      console.error(`${path} doesn't exists!`);
    }
  }
};

let path;
let fileName;

const paths = [];
const fileNames = [];

switch (type) {
  case 'resource':
    paths.push(`./src/dtos/`);
    paths.push(`./src/interfaces/`);
    paths.push(`./src/models/`);
    paths.push(`./src/repositories/`);
    paths.push(`./src/resolvers/`);
    paths.push(`./src/typedefs/`);
    fileNames.push(`${name}.dto.ts`);
    fileNames.push(`${name}.interface.ts`);
    fileNames.push(`${name}.model.ts`);
    fileNames.push(`${name}.repository.ts`);
    fileNames.push(`${name}.resolver.ts`);
    fileNames.push(`${name}.type.ts`);
    break;
  case 'dto':
    path = `./src/dtos/`;
    fileName = `${name}.dto.ts`;
    break;
  case 'interface':
    path = `./src/interfaces/`;
    fileName = `${name}.interface.ts`;
    break;
  case 'model':
    path = `./src/models/`;
    fileName = `${name}.model.ts`;
    break;
  case 'repository':
    path = `./src/repositories/`;
    fileName = `${name}.repository.ts`;
    break;
  case 'resolver':
    path = `./src/resolvers/`;
    fileName = `${name}.resolver.ts`;
    break;
  case 'typedef':
    path = `./src/typedefs/`;
    fileName = `${name}.type.ts`;
    break;
  default:
}

if (paths.length > 0 && fileNames.length > 0) {
  paths.forEach((fPath, index) => {
    const fName = fileNames[index];
    createResource(fPath, fName);
  });
} else {
  createResource(path, fileName);
}
