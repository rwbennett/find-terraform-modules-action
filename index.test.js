const process = require('process');
const cp = require('child_process');
const path = require('path');

test('test find modules with basedir', async () => {
  process.env['INPUT_BASEDIR'] = 'test/environments/project3';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  // Find the line with set-output
  const outputLine = result
    .split('\r\n')
    .find((s) => s.indexOf('set-output') != -1);
  expect(outputLine).toEqual(
    '::set-output name=modules::["production/sub1","production/sub2"]'
  );
});

test('test find modules with default basedir', async () => {
  process.env['INPUT_BASEDIR'] = '.';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  // Find the line with set-output
  const outputLine = result
    .split('\r\n')
    .find((s) => s.indexOf('set-output') != -1);
  expect(outputLine).toEqual(
    '::set-output name=modules::["test/environments/project1/production","test/environments/project2/production",' +
      '"test/environments/project3/production/sub1","test/environments/project3/production/sub2"]'
  );
});
