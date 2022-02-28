import { Component } from "react";

import axios from 'axios';
class EnterKey extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    getData(e) {

        let keyInput = e.target['keyInput'].value;
        axios.post('http://localhost:8080/instance/data/get', {
            key: keyInput
        }).then(res => {
            localStorage.setItem("key",keyInput);
            localStorage.setItem("code",res.data);
        }).catch(err => {
            this.setState({error:"something went wrong"})
            window.location = "/";
        })
    }
    render(){
        return (
            <div class="container mt-5 m-auto border p-5" style={{ 'text-align': "initial" }}>
                <form onSubmit={this.getData}>
                    <h3> Instance Key </h3>
                    <div class=" mt-3">
                        <input type="text" class="form-control" id="keyInput" aria-describedby="keyHelp" />
                        <div id="keyHelp" class="form-text">Please enter the key for your extension instance</div>
                    </div>
                    <hr />
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        )
    }
}

export default EnterKey;