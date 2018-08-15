import React, { Component } from 'react';
import Cats from '../Cats';
import CreateCat from '../CreateCat';
import EditCat from '../EditCat';


class CatsContainer extends Component {
    constructor() {
        super();

        this.state = {
            cats: [],
            showEdit: false,
            editCatId: null,
            catToEdit: {
                name: '',
            }
        }
    }
    componentDidMount() {
        this.getCats().then((cats) => {
            this.setState({ cats: cats.data })
        }).catch((err) => {
            console.log(err);
        })
    }
    getCats = async () => {

        const cats = await fetch('http://localhost:8000/api/v1/cats');
        const catsJson = await cats.json();
        return catsJson

    }
    addCat = async (cat, e) => {
        e.preventDefault();
        try {
            const createdCat = await fetch('http://localhost:8000/api/v1/cats', {
                method: 'POST',
                body: JSON.stringify(cat),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const createdCatJson = await createdCat.json();
            this.setState({ cats: [...this.state.cats, createdCatJson.data] });

        } catch (err) {
            console.log(err)
        }


    }
    deleteCat = async (id, e) => {
        console.log(id, ' this is id')
        e.preventDefault();
        try {
            const deleteCat = await fetch('http://localhost:8000/api/v1/cats/' + id, {
                method: 'DELETE'
            });
            console.log('inside try')
            const deleteCatJson = await deleteCat.json();
            if (deleteCatJson.status === 200) {
                this.setState({ cats: this.state.cats.filter((cat, i) => cat._id !== id) });
            } else {
                // leave some message there was a problem.
            }
        } catch (err) {
            console.log(err, ' error')
        }
    }
    showModal = (id, e) => {
        // i comes before e, when called with bind
        const catToEdit = this.state.cats.find((cat) => cat._id === id)
        console.log(catToEdit, ' catToEdit')
        this.setState({
            showEdit: true,
            editCatId: id,
            catToEdit: catToEdit
        });
    }
    closeAndEdit = async (e) => {
        e.preventDefault();

        try {
            const editResponse = await fetch('http://localhost:9000/api/v1/cats/' + this.state.editCatId, {
                method: 'PUT',
                body: JSON.stringify(this.state.catToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const editResponseJson = await editResponse.json();

            const editedCatArray = this.state.cats.map((cat) => {

                if (cat._id === this.state.editCatId) {

                    cat.title = editResponseJson.data.title;
                }

                return cat
            });

            this.setState({
                cat: editedCatArray,
                showEdit: false
            });



        } catch (err) {
            console.log(err);
        }

    }
    handleFormChange = (e) => {

        this.setState({
            catToEdit: {
                ...this.state.catToEdit,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <Cats cats={this.state.cats} deleteCat={this.deleteCat} showModal={this.showModal} />
                <CreateCat addCat={this.addCat} />
                {this.state.showEdit ? <EditCat closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} catToEdit={this.state.catToEdit} /> : null}

            </div>
        )
    }
}

export default CatsContainer;
