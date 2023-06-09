const core = require('@actions/core');
const glob = require('@actions/glob');

function pathIsCoveredByAny(paths, newPath) {
  for (var path of paths) {
    if (newPath.startsWith(path) || newPath === path) {
      return true;
    }
  }
  return false;
}

async function run() {
  try {
    // Known issue: Produces incorrect results when basedir is itself a Terraform module
    const baseDir = core.getInput('basedir') || '.';
    const dirGlob = `${baseDir}/**/*.tf`;

    const globber = await glob.create(dirGlob, {
      followSymbolicLinks: false,
    });
    let topLevelModules = [];
    let files = [];
    for await (const file of globber.globGenerator()) {
      files.push(file);
    }
    files
      // Trim out current directory to make paths relative
      .map((f) => {
        return f.replace(process.cwd(), '').replaceAll('\\', '/');
      })
      .map((f) => {
        // Remove basedir prefix so paths are relative to basedir
        return baseDir == '.' ? f : f.replace(baseDir + '/', '');
      })
      // Convert to forward slash paths
      .map((f) => {
        return f.substring(1, f.lastIndexOf('/'));
      })
      // Sort by shortest path first and then reduce to highest-level module directories only
      .sort((a, b) => a.length - b.length)
      .forEach((f) => {
        if (!pathIsCoveredByAny(topLevelModules, f)) {
          topLevelModules.push(f);
          console.log(f);
        }
      });

    core.setOutput('modules', topLevelModules);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
