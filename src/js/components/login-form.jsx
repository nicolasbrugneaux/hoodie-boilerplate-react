import React from 'react';
import hoodie from '../hoodie';
import { RaisedButton,  TextField } from 'material-ui';

export default class LoginForm extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = this.getState();
    }

    handleChange( name, event )
    {
        this.setState( { [name]: event.target.value, errors:{} } );
    }

    logIn( event )
    {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;

        if ( username && password )
        {
            hoodie.account.signIn( username, password ).fail( ( hoodieError ) =>
            {
                this.setState(
                {
                    errors:
                    {
                        username: hoodieError.message,
                        password: hoodieError.message
                    }
                } );
                console.log( 'fail' );
            } );
        }
        else
        {
            this.setState(
            {
                errors:
                {
                    username: username? '' : 'Login required',
                    password: password? '' : 'Password required'
                }
            } );
        }
    }

    getState()
    {
        return {
            username: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount()
    {
        hoodie.account.on( 'signin signout', () => this.setState( this.getState() )  );
    }

    componentWillUnmount()
    {
        hoodie.account.off( 'signin signout' );
    }

    render()
    {
        if ( this.props.isLogged )
        {
            return null;
        }

        return (
            <section className='section--login'>
                <form className='section--login--form'>
                    <h3 className='section--login--form--title'>Login</h3>
                    <TextField
                        className='section--login--form--input'
                        hintText='Enter your login'
                        floatingLabelText='Enter your login'
                        value={this.state.username}
                        onChange={this.handleChange.bind( this, 'username' )}
                        errorText={this.state.errors.username}/>
                    <TextField
                        className='section--login--form--input'
                        type='password'
                        hintText='Enter your password'
                        floatingLabelText='Enter your password'
                        value={this.state.password}
                        onChange={this.handleChange.bind( this, 'password' )}
                        errorText={this.state.errors.password}/>
                    <RaisedButton
                        className='section--login--form--button'
                        label='Log in'
                        primary={true}
                        onClick={this.logIn.bind( this )}/>
                </form>
            </section>
        );
    }
}
