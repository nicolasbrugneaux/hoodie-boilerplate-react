import React from 'react';

export default class Content extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return ( this.props.isLogged ?
            <section className="content">
                <header>
                    <h1>Hello!</h1>
                </header>

                <section>
                    <p>Add some awesome content!</p>
                </section>

                <footer>
                    <h4>Enjoy Hoodie!</h4>
                </footer>
            </section>
        : null
        );
    }
}
