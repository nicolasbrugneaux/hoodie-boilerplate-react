import React from 'react';
import hoodie from '../hoodie';
import { RaisedButton,  TextField } from 'material-ui';

export default class LoginForm extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state =
        {
            username: '',
            password: ''
        };
    }

    handleChange( name, event )
    {
        this.setState( { [name]: event.target.value } );
    }

    logIn( event )
    {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        if ( username && password )
        {
            hoodie.account.signIn( username, password ).fail(() =>
            {
                hoodie.account.signUp( username, password, password ).fail( () =>
                {
                    console.log('fail');
                });
            } );
        }
    }

    _setState()
    {
        return {
            username: '',
            password: ''
        };
    }

    componentDidMount()
    {
        hoodie.account.on( 'signup signin signout', this._setState );
    }

    componentWillUnmount()
    {
        hoodie.account.off( 'signup signin signout', this._setState );
    }

    render()
    {
        return (
            this.props.isLogged ?
                null :
                <section className='login'>
                    <form className='loginform'>
                        <h3>Login</h3>
                        <TextField
                            hintText="Enter your login"
                            floatingLabelText="Enter your login"
                            value={this.state.username}
                            onChange={this.handleChange.bind( this, 'username' )}
                        />
                    <br/>
                        <TextField
                            type='password'
                            hintText="Enter your password"
                            floatingLabelText="Enter your password"
                            value={this.state.password}
                            onChange={this.handleChange.bind( this, 'password' )}
                        />
                    <br/>
                        <RaisedButton
                            label="Log in"
                            primary={true}
                            onClick={this.logIn.bind( this )}
                        />
                    </form>
                </section>
        );
    }
}
