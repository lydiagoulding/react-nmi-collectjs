const path = require('path');
const packlist = require('npm-packlist');
const tar = require('tar');
const execa = require('execa');
const packageJson = require('../package.json');

const projectRoot = path.join(__dirname, '../');
const srcRoot = path.join(projectRoot, 'src');

const libRoot = path.join(projectRoot, 'lib');
const esmRoot = path.join(libRoot, 'esm');

const shell = (cmd) =>
    execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const babel = (outDir, envName) =>
    shell(
        `npx babel ${srcRoot} --out-dir ${outDir} --env-name "${envName}"`,
    );

const createZip = () => {
    return packlist({ path: projectRoot })
        .then(files => tar.create({
            prefix: 'package/',
            cwd: projectRoot,
            file: `react-nmi-collectjs-v${packageJson.version}.tgz`,
            gzip: true
        }, files))
}

Promise.resolve(true)
    .then(() =>
        Promise.all([
             babel(esmRoot, 'esm'),
        ]),
    )
    .then(() => {
        createZip()
    })
    .catch((err) => {
        if (err) console.error(err.stack || err.toString());
        process.exit(1);
    });