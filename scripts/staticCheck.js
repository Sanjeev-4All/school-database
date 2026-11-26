const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const sourceDirectories = [
  path.join(projectRoot, 'server.js'),
  path.join(projectRoot, 'src'),
  path.join(projectRoot, 'scripts')
];
const ignoredDirectories = new Set(['node_modules', '.git']);

function getJavaScriptFiles(target) {
  if (!fs.existsSync(target)) return [];
  if (fs.statSync(target).isFile()) {
    return target.endsWith('.js') ? [target] : [];
  }

  return fs.readdirSync(target, { withFileTypes: true }).flatMap(entry => {
    if (ignoredDirectories.has(entry.name)) return [];

    const entryPath = path.join(target, entry.name);
    if (entry.isDirectory()) return getJavaScriptFiles(entryPath);
    return entry.name.endsWith('.js') ? [entryPath] : [];
  });
}

const files = [...new Set(sourceDirectories.flatMap(getJavaScriptFiles))]
  .sort((first, second) => first.localeCompare(second));

const failures = [];

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    encoding: 'utf8',
    cwd: projectRoot
  });

  if (result.status !== 0) {
    failures.push({
      file: path.relative(projectRoot, file),
      output: result.stderr || result.stdout
    });
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`Failed: ${failure.file}`);
    console.error(failure.output.trim());
  }
  process.exitCode = 1;
} else {
  console.log(`Static syntax check passed for ${files.length} JavaScript files.`);
}
