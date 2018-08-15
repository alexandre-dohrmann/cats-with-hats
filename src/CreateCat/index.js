import React, { Component } from 'react';


class CreateCat extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        }
    }
    updateCat = (e) => {

        this.setState({ [e.currentTarget.name]: e.currentTarget.value });

    }

    render() {
        console.log(this.props, ' this is props')
        return (
            <div>
                <div className="cat-input">
                    <h1 className="cats-home">Cats with Hats!</h1>
                    <form className="cat-form" onSubmit={this.props.addCat.bind(this, this.state)}>
                        <label className="what-cat">
                            What's the Cat's name? <i class="em em-kissing_cat"></i><br />
                            <input type="text" name="name" onChange={this.updateCat} />
                        </label>
                        <input type='Submit' />
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateCat;