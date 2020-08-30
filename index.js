const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {
    //const myToken = core.getInput('myToken');
    const context = github.context;
    const pullRequest=context.payload.pull_request.head.ref;
    const base=context.base_ref
    await exec.exec('git diff --stat ',[base,pullRequest]);
  } catch (error) {
    core.setFailed(error.message);
  }
}
