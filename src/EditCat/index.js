import React, { Component } from 'react';


const EditCat = (props) => {

    return (
        <div>
            <h4> Edit Cat</h4>
            <form onSubmit={props.closeAndEdit}>
                <label>
                    Edit Cat:
          <input type="text" name="name" onChange={props.handleFormChange} value={props.catToEdit.name} />
                </label>
                <input type='Submit' value="Edit Cat" />
            </form>
        </div>

    )
}

export default EditCat;