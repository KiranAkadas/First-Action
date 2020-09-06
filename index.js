const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const wait = require('./wait');

//const prb = core.getInput('PR_branch', { required: true });
//const base = core.getInput('base_brancg', { required: true });
async function run() {
  try {
    console.log("Ok so is it getting printed?")
    const context = github.context;
    const pullRequest=context.payload.pull_request.head.ref;
    const create=context.payload.pull_request.created_at;
    const update=context.payload.pull_request.updated_at;
    const contri=context.payload.pull_request.head.repo.contributors_url
    // const repo=context.payload.pull_request.head.repo.html_url;
    // const reponame=context.payload.pull_request.head.repo.name;
    const base=context.payload.pull_request.base.ref;
    // await exec.exec('git clone ',[repo])
    // await wait(20000)
    // await exec.exec('cd ',[reponame])
    //await exec.exec('git log --stat ',[pullRequest]);
    console.log(create,update,contri)
    //console.log(base,pullRequest)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
