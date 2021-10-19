import React from 'react';
import { Login } from './Login';
import { Register } from './Register';
import './Form.css'
import * as UserStore from './../Stores/UserStore';

export class LoginRegisterContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // login active, register active
            active: [false, false]
        };
        this.onBtnClick = this.onBtnClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount(){
        this.unsub = UserStore.userStore.subscribe(() => {
            this.setState({
                active: [false, false]
            });
        })
    }

    componentWillUnmount(){
        this.unsub();
    }

    onBtnClick(e){
        let indx = e.target.dataset.indx;
        let other = (1 - indx) % 2;
        this.state.active[indx] = !this.state.active[indx];
        this.state.active[other] = false;
        this.forceUpdate();
    }

    render(){
        return <div>
            <button
                    className='inputSubmit'
                    data-indx={0}
                    onClick={this.onBtnClick}
                >
                    I have an account
            </button>
            
            <button
                    className='inputSubmit'
                    data-indx={1}
                    onClick={this.onBtnClick}
                >
                    Create account
            </button>
            <br/>
            <div hidden={!this.state.active[0]}>    
                <Login/>
            </div>
            <div hidden={!this.state.active[1]}>    
                <Register/>
            </div>
        </div>
    }

}