import React from "react";
import * as UserStore from './../Stores/UserStore';
import './Upload.css';

export class UploadFile extends React.Component{
    constructor(){
        super();
        this.state = {
            hidden: true
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onFormClick = this.onFormClick.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem('user')){
            this.setState({
                hidden: false
            });
        }

        this.unsub = UserStore.userStore.subscribe(() => {
            this.setState({
                hidden: UserStore.userStore.getState()._id === null
            });
        });
    }

    componentWillUnmount(){
        this.unsub();
    }

    onFormClick(){

    }

    render(){
        return <form
            hidden={this.state.hidden}
        >
            <input 
            type='file'
            name='File'
        />
        <input
            className='inputSubmit'
            type='submit'
            onClick={this.onFormClick}
            value='Add file'
        />
        </form>
    }
}