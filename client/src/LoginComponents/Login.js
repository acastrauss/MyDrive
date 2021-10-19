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
        
        let user = {};

        for (let key of formData) {
            user[key[0]] = key[1];
        }

        let reqH = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        fetch('LoginUser', reqH)
        .then(res => res.json())
        .then(data => {
            if(data){
                data.type = UserStore.LOGIN_USER;
                UserStore.userStore.dispatch(data);
                sessionStorage.setItem('user', JSON.stringify(data));
            }
            else {
                alert('Wrong credentials.');
            }
            
            this.formRef.reset();
            this.forceUpdate();
        });
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