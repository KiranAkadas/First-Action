const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {
  
    const context = github.context;
    const pullRequest=context.payload.pull_request.head.ref;
    const repo=context.payload.pull_request.head.user.html_url;
    const base=context.payload.pull_request.base.ref;
    await exec.exec('git clone ',[repo])
    await exec.exec('git diff --stat ',[base,pullRequest]);
    console.log("Ok so is it getting printed?")
    //console.log(base,pullRequest)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
