import React from 'react';
import hoodie from '../hoodie';
import { RaisedButton } from 'material-ui';

export default class Account extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    signOut()
    {
        hoodie.account.signOut();
    }

    render()
    {
        const name = !this.props.isLogged ? 'Anonymous' :
            hoodie.account.username.charAt(0).toUpperCase() + hoodie.account.username.slice(1);

        return (
            <section className='account'>
                <p>Logged as <span className='username'>{name}</span>.</p>
                {this.props.isLogged ?
                    <RaisedButton label="Sign out" onClick={this.signOut} />
                    : null
                }
            </section>
        );
    }
}
