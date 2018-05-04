var shell = require('shelljs');

shell.mkdir('-p', 'dist/config/');
shell.cp('-R', 'src/config/', 'dist/');
