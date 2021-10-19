import React from 'react';
import { LoginRegisterContainer } from './LoginRegisterContainer';
import * as UserStore from './../Stores/UserStore';
import { Logout } from './Logout';

export class User extends React.Component{
    constructor(){
        super();
        this.state = {
            // 0 user logged, 1 no user logged
            active: (UserStore.userStore.getState()._id ? 0 : 1)
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleLogChange = this.handleLogChange.bind(this);
    }

    componentDidMount(){
        let active = 1;
        if(sessionStorage.getItem('user')){
            active = 0;
            let user = JSON.parse(sessionStorage.getItem('user'));
            user.type = UserStore.LOGIN_USER;
            UserStore.userStore.dispatch(user);
        }
        else {
            active = 1;
            UserStore.userStore.dispatch({
                type: UserStore.LOGOUT_USER
            });
        }
        
        this.setState({
            active: active
        });

        this.unsub = UserStore.userStore.subscribe(this.handleLogChange);
    }

    handleLogChange(){
        let active = UserStore.userStore.getState()._id ? 0 : 1;
        this.setState({
            active: active
        });
    }

    componentWillUnmount(){
        this.unsub();
    }

    render(){
        return <div>
            <div
                hidden={this.state.active === 0}
            >
                <LoginRegisterContainer/>
            </div>
            <div
                hidden={this.state.active === 1}
            >
                <Logout/>
            </div>
        </div>
    }
}