import React from 'react';
import hoodie from '../hoodie';
import Account from './account.jsx';
import Content from './content.jsx';
import LoginForm from './login-form.jsx';

export default class App extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = this.getState();
    }

    getState()
    {
        return {
            username: hoodie.account.username || '',
            isLogged: !!hoodie.account.username
        };
    }

    onChange()
    {
        this.setState( this.getState() );
    }

    componentDidMount()
    {
        hoodie.account.on( 'signup signin signout', this.onChange.bind( this)  );
    }

    componentWillUnmount()
    {
        hoodie.account.off( 'signup signin signout', this.onChange.bind( this)  );
    }

    render()
    {
        return (
            <div>
                <Account isLogged={this.state.isLogged}/>
                <LoginForm isLogged={this.state.isLogged}/>
                <Content isLogged={this.state.isLogged}/>
            </div>
        );
    }
}
