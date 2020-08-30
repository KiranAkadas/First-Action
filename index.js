const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {
    //const myToken = core.getInput('myToken');
    let myOutput = '';
    let myError = '';

    const options = {};
    options.listeners = {
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
      stderr: (data: Buffer) => {
        myError += data.toString();
      }
    };
    options.cwd = './lib'
    const context = github.context;
    const pullRequest=context.payload.pull_request.head.ref;
    const base=context.base_ref
    await exec.exec('git diff --stat ',[base,pullRequest],options);
    console.log(options)
  } catch (error) {
    core.setFailed(error.message);
  }
}
