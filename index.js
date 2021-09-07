const fs = require('fs');
const fse = require('fse');

try {
  // guard format
  if (process.argv.length > 4) throw new Error('Invalid Format');

  // guard folder name 1
  if (process.argv.length === 2) throw new Error('Project Folder Name Missing');

  // guard folder name 2
  if (process.argv[2].slice(0, 1) === '-')
    throw new Error('Project Folder Name Missing');

  // guard flags
  const flags = ['-one', '-jq', '-bs'];
  if (process.argv[3] && !flags.includes(process.argv[3]))
    throw new Error(
      'Invalid Flag Format. Flag(Optional) could be either -one, -jq, -bs'
    );

  const folderName = process.argv[2];
  const flag = process.argv[3] || '';
  const tempHTML = fs.readFileSync(`${__dirname}/temp/temp.html`, 'utf-8');
  const commonPart = () => {
    fs.writeFileSync(`${folderName}/script.js`, "'use strict';\n");
    fs.writeFileSync(`${folderName}/style.css`, '');
    fs.copyFileSync(
      `${__dirname}/temp/.prettierrc`,
      `${folderName}/.prettierrc`
    );
    fs.writeFileSync(`${folderName}/.gitignore`, '.vscode');
  };

  fs.mkdirSync(folderName);

  // -one
  if (flag === '-one') {
    fs.copyFileSync(
      `${__dirname}/temp/temp_one.html`,
      `${folderName}/index.html`
    );
    return console.log('Done -one');
  }

  // default
  commonPart();

  if (!flag) {
    fs.writeFileSync(`${folderName}/index.html`, tempHTML);
    return console.log('Done -default');
  }

  // jQuery flag
  if (flag === '-jq') {
    fs.copyFileSync(
      `${__dirname}/temp/temp_jq.html`,
      `${folderName}/index.html`
    );
    fs.copyFileSync(
      `${__dirname}/node_modules/jquery/dist/jquery.js`,
      `${folderName}/jquery-3.6.0.js`
    );
    return console.log('Done -jq');
  }

  // BS flag
  if (flag === '-bs') {
    fs.mkdirSync(`${folderName}/js`);
    fs.copyFileSync(
      `${__dirname}/node_modules/jquery/dist/jquery.js`,
      `${folderName}/js/jquery-3.6.0.js`
    );

    fs.copyFileSync(
      `${__dirname}/temp/temp_bs.html`,
      `${folderName}/index.html`
    );

    fse.copydirSync(
      `${__dirname}/node_modules/bootstrap/dist`,
      `${folderName}/bootstrap4`
    );
    return console.log('Done -BS');
  }
} catch (err) {
  console.log(`ERROR: ${err.message}`);
}
