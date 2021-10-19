import { sha256 } from 'js-sha256';
import React from 'react';
import * as UserStore from './../Stores/UserStore';
import './Form.css';

let btnOpac = 0.5;

export class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formValid : false
        };
        this.onFormClick = this.onFormClick.bind(this);  
        this.formValid = this.formValid.bind(this);      
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

        fetch('RegisterUser', reqH)
        .then(res => res.json())
        .then(data => {
            if(data){
                data.type = UserStore.LOGIN_USER;
                UserStore.userStore.dispatch(data);
                sessionStorage.setItem('user', JSON.stringify(data));
            }
            else{
                alert('User already exists.');
            }
            this.formRef.reset();
            this.forceUpdate();
        });
    }

    preventRefresh(e){
        e.preventDefault();
    }

    formValid(){
        let formData = new FormData(this.formRef);
        let retVal = true;
        for (let key of formData) {
            retVal &= key[1].length > 0;
        }

        if(retVal)
            btnOpac = 1;
        else 
            btnOpac = 0.5;

        this.setState({
            formValid : retVal
        });
    }

    render(){
        return <form
            ref={form => this.formRef = form}   
            onSubmit={this.preventRefresh}      
            style={{
                position:'fixed'
            }}
            onChange={this.formValid}
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
                type="email"
                name="Email"
                required
                placeholder='Please input email'
            />
            <br/>
            <input
                className='inputSubmit'
                type='submit'
                onClick={this.onFormClick}
                value='Register'
                style={{
                    opacity: btnOpac
                }}
            />
        </form>
    }
}