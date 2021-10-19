import React from 'react';
import * as UserStore from './../Stores/UserStore';
import './Form.css';

export class Logout extends React.Component{
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }
    
    onClick(){
        UserStore.userStore.dispatch({
            type: UserStore.LOGOUT_USER
        });
        sessionStorage.removeItem('user');
    }

    render(){
        return <button
            className='inputSubmit'
            onClick={this.onClick}
        >
            Logout
        </button>
    }
}