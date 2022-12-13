import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './index.css';
import { useHistory } from 'react-router-dom'

/* Create a group component */
export default function CreateAGroup(){
    const dispatch = useDispatch()
    const history = useHistory()

    const [ name, setName ] = useState('');
    const [ imageUrl, setImageUrl ] = useState(
        'https://moodlehub.ca/pluginfile.php/6842/mod_book/chapter/9131/group2.jpg'
        );
    const [ validationErrors, setValidationErrors ] = useState([])

    /* Validation errors for form */
    useEffect(() => {
        const validationErrors = [];
        if(name)
        if (imageUrl)
        setValidationErrors(validationErrors)
    }, [ name, imageUrl ])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const group = {
            name,
            imageUrl
        }
        // const createdGroup = await dispatch('insert thunk here')
        // if (createdGroup){
            // history .push?
        // }
    }


    return (
        <form onSubmit={handleSubmit} className='createAGroupForm'>
            <ul className="createGroupErrors">
                {validationErrors.map((error, idx) => {
                    <li key={idx}>{error}</li>
                })}
            </ul>
            <h2>Create A Group</h2>
            <label>
                Name
                <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label>
                Group Image
                <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                />
            </label>
            <button type="submit" className="createGroupBtn" disabled={validationErrors.length > 0}>Create</button>
        </form>
    
    )
}

