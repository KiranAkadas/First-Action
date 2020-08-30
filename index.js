const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {
    console.log("Ok so is it getting printed?")
    const context = github.context;
    console.log("Ok so is it getting printed?")
    const pullRequest=context.payload.pull_request.head.ref;
    console.log("Ok so is it getting printed?")
    const base=context.base_ref
    console.log("Ok so is it getting printed?")
    await exec.exec('git diff --stat ',[base,pullRequest]);
    console.log("Ok so is it getting printed?")
    console.log(base,pullRequest)
  } catch (error) {
    core.setFailed(error.message);
  }
}
