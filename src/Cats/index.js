import React from 'react';


const Cats = (props) => {
    const catList = props.cats.map((cat, i) => {
        console.log(cat, ' cat id')
        return (
            <li key={cat._id}>
                <span>{cat.name}</span><br />
                <button onClick={props.deleteCat.bind(null, cat._id)}>Delete</button>
                <button onClick={props.showModal.bind(null, cat._id)}>Edit</button>
            </li>)
    })

    return (
        <ul>
            {catList}
        </ul>
    )

};


export default Cats;