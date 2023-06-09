# Find Terraform Modules Action

This is a Github Action that finds top-level Terraform modules within a specified directory structure. It can be handy for writing CI/CD for Terraform in Github Actions workflows.

## Usage

```yaml
- name: Find Terraform Modules in Previous Commit
  id: find-terraform-modules-previous
  uses: rwbennett/find-terraform-modules-action@v0.1
  with:
    basedir: previous
```

## Build & Test

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos. Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

From here, you can commit the chanages to `dist` and push.
