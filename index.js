const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

const src = __dirname;

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {

    const context = github.context;
    const pullRequest=context.payload.pull_request.head.ref;
    const base=context.payload.pull_request.base.ref;
    await exec.exec("git log --oneline",["WebTechnologies_PasswordSecurity/master", "WebTechnologies_PasswordSecurity/test4"])
    getCommitDifference(base, pullRequest);
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getCommitDifference(baseBranch, secondaryBranch) {
  try {
    let output = '';
    let err = '';

    // These are option configurations for the @actions/exec lib`
    const options = {};
    options.listeners = {
      stdout: (data) => {
        output += data.toString();
      },
      stderr: (data) => {
        err += data.toString();
      }
    };
    options.cwd = './';

    await exec.exec(`${src}/script.sh`, [baseBranch, secondaryBranch], options);
    const { commitDiffCount } = JSON.parse(output);

    console.log('\x1b[32m%s\x1b[0m', `Difference in commits between ${secondaryBranch} and ${baseBranch}: ${commitDiffCount}`);
  
  } catch (err) {
    core.setFailed(`Could not get commit difference between branches because: ${err.message}`);
    process.exit(0);
  }
}

run();
