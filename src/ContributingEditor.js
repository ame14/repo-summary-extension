import { Component } from "react";
import axios from 'axios';

class ContributingEditor extends Component {
    constructor(props) {
        super(props)
        // 
        this.state = {
            fullRepo: null,
            repoName: "mysqljs/mysql", //AppFlowy-IO/AppFlowy
            contributors: [],
            commits: [],
            lastCommitDate: null

        }

    }
    componentDidMount() {

        axios.get("https://api.github.com/repos/" + this.state.repoName + "/contributors?per_page=100").then((r) => {
            this.setState({ contributors: r.data });
        })

        axios.get("https://api.github.com/repos/" + this.state.repoName + "/commits").then((r) => {
            this.setState({ commits: r.data });
            let diff = Math.floor((Date.parse(new Date().toISOString()) - Date.parse(r.data[0].commit.author.date)) / 86400000);
            this.setState({ lastCommitDate: diff })
        })

        axios.get("https://api.github.com/repos/" + this.state.repoName).then((r) => {
            this.setState({ fullRepo: r.data });
        })

    }


    render() {
        if (!this.state.fullRepo) {
            return <div class="container-fluid p-5" style={{ 'text-align': "initial" }}>
                <h1> Loading </h1>
            </div>
        }

        let contributorRows = this.state.contributors.slice(0,5).map((contr) => {
            return (<tr class="border">
                 <td>
                   <img class="border" style={{"height":"30px"}} src={contr.avatar_url} />
                </td>
                <td>
                    <a class="text-decoration-none" href={contr.url}>  {contr.login} </a>
                </td>
                <td>
                {contr.contributions}
                </td>
            </tr>);
        })

        let contributorCount = this.state.contributors.length;
        if (contributorCount >= 100) {
            contributorCount = "100+";
        }

        return (
            <div class="container-fluid p-4 m-0 border-bottom">
                <h1> {this.state.fullRepo.full_name} </h1> <small class="text-muted"> by {this.state.fullRepo.owner.login} </small>
                <p class="font-monospace mt-3">{this.state.fullRepo.description}</p>
                <div class="d-flex justify-content-start mb-4  flex-wrap">
                    <div class="p-2 ps-3 pe-3 border m-2"> Open Issues: {this.state.fullRepo.open_issues_count} </div>
                    <div class="p-2 ps-3 pe-3 border m-2"> Last Commit : {this.state.lastCommitDate} days ago </div>
                    <div class="p-2 ps-3 pe-3 border m-2"> Stars : {this.state.fullRepo.stargazers_count} </div>
                    <div class="p-2 ps-3 pe-3 border m-2"> Contributors: {contributorCount} </div>
                    <div class="p-2 ps-3 pe-3 border m-2"> License:  {this.state.fullRepo.license.name} </div>
                    <div class="p-2 ps-3 pe-3 border m-2"> Forks: {this.state.fullRepo.forks_count} </div>
                </div>
                <h4> Contributors </h4>
                <table class="table mt-4">
                    <thead>
                        <tr class="border">
                           <th scope="col">*</th>
                            <th scope="col">User</th>
                            <th scope="col">Contributions</th>
                        </tr>
                        {contributorRows}
                    </thead>
                </table>
            </div>
        );
    }
}


export default ContributingEditor;