import { sha256 } from 'js-sha256';
import React from 'react';
import * as UserStore from './../Stores/UserStore';
import './Form.css';

export class Login extends React.Component{

    constructor(props){
        super(props);
        this.onFormClick = this.onFormClick.bind(this);        
    }

    onFormClick(){   
        let formData = new FormData(this.formRef);
        formData.set('PasswordHash', sha256(formData.get('PasswordHash')));
        
        
    }

    preventRefresh(e){
        e.preventDefault();
    }

    render(){
        return <form
            ref={form => this.formRef = form}   
            onSubmit={this.preventRefresh}
            style={{
                position:'fixed'
            }}      
        >
            <input
                type="text"
                name="Username"
                required
                placeholder='Please input username'
            />
            <br/>
            <input
                type="password"
                name="PasswordHash"
                required
                placeholder='Please input password'
            />
            <br/>
            <input
                className='inputSubmit'
                type='submit'
                onClick={this.onFormClick}
                value='Login'
            />
            
        </form>
    }
}