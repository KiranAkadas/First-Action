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
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);

    const pullRequest=context.payload.pull_request.head.ref;
    const create=context.payload.pull_request.created_at;
    const update=context.payload.pull_request.updated_at;
    const repo_create=context.payload.pull_request.head.repo.created_at;
    const repo_update=context.payload.pull_request.head.repo.updated_at;
    const repo_push=context.payload.pull_request.head.repo.pushed_at;
    const contri=context.payload.pull_request.head.repo.contributors_url
    // const repo=context.payload.pull_request.head.repo.html_url;
    // const reponame=context.payload.pull_request.head.repo.name;
    const base=context.payload.pull_request.base.ref;
    // await exec.exec('git clone ',[repo])
    // await wait(20000)
    // await exec.exec('cd ',[reponame])
    //await exec.exec('git log --stat ',[pullRequest]);
    console.log(create,update,contri)
    const newIssue = await octokit.issues.create({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: 'Some Stats :\n Created at:'
    });
    //console.log(base,pullRequest)
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
