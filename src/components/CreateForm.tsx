import { useState, ChangeEvent } from "react"
import '../styles/FormStyles.scss'

interface CreateFormProps {
    createFunction: Function;
    swapDivs: Function
}

export const CreateForm = (props: CreateFormProps) => {

    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [emoji, setEmoji] = useState<string>();
    const [desc, setDesc] = useState<string>();

    const [emojiError, setEmojiError] = useState('');
    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [descError, setDescError] = useState('');

    const createForm = () => {
        if (!name) {
            return setNameError("No Value set!")
        }

        if (name.length < 4) {
            return setNameError("Name is too short!")
        }

        if (name.length > 24) {
            return setNameError("Name is too long!")
        }

        if (!category) {
            return setCategoryError("No Value set!")
        }

        if (category.length < 4) {
            return setCategoryError("Category is too short!")
        }

        if (category.length > 16) {
            return setCategoryError("Category is too long!")
        }

        if (!emoji) {
            return setEmojiError("No Value set!")
        }

        if (emoji.length !== 1) {
            return setEmojiError("This value is invalid!")
        }

        if (desc && desc.length > 1000) {
            return setDescError("Description is too long!")
        }

        props.createFunction({
            name: name, 
            category: category, 
            emoji: emoji, 
            fullDescription: desc, 
        })

        props.swapDivs()

        setName('')
        setCategory('')
        setEmoji('')
        setDesc('')

        setNameError('')
        setCategory('')
        setEmoji('')
        setDesc('')

    }
    // <input value={name} onChange={((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value))}/>
    return (
        <>
            <div className="wrapper">
                <h3>Create a new To-Do</h3>
                <div id="main-content">
                    <div className="input">
                        <div id="name-display">
                            <label>Name</label>{' '}
                            <p style={{ color: 'red' }}>Required*</p>
                            <p>4 - 24 characters</p>
                            {nameError ? <p style={{ color: 'red' }}>{nameError}</p> : null}
                        </div>
                        <input value={name} onChange={((e: ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value) 
                            setNameError('')
                        })}/>
                    </div>
                    <div className="input">
                        <div id="name-display">
                            <label>Category</label>{' '}
                            <p style={{ color: 'red' }}>Required*</p>
                            <p>4 - 16 characters</p>
                            {category ? <p style={{ color: 'red' }}>{categoryError}</p> : null}
                        </div>
                        <input value={category} onChange={((e: ChangeEvent<HTMLInputElement>) => {
                            setCategory(e.target.value)
                            setCategoryError('')
                        })}/>
                    </div>
                    <div className="input">
                        <div id="name-display">
                            <label>Signature</label>{' '}
                            <p style={{ color: 'red' }}>Required*</p>
                            <p>1 character</p>
                            {emojiError ? <p style={{ color: 'red' }}>{emojiError}</p> : null}
                        </div>
                        <input value={emoji} onChange={((e: ChangeEvent<HTMLInputElement>) => {
                            setEmoji(e.target.value)
                            setEmojiError('')
                        })}/>
                    </div>
                    <div className="input">
                        <div id="name-display">
                            <label>Description</label>{' '}
                            <p style={{ color: 'red' }}>Optional?</p>
                            <p>10 - 100 characters</p>
                            {descError ? <p style={{ color: 'red' }}>{descError}</p> : null}
                        </div>
                        <input value={desc} onChange={((e: ChangeEvent<HTMLInputElement>) => {
                            setDesc(e.target.value)
                            setDescError('')
                        })}/>
                    </div>
                    <div className="button-div" style={{ marginTop: '25px', width: '60%' }}>
                        <h3 className="button-h3" style={{ backgroundColor: '#' }} onClick={createForm}>Create new To-Do</h3>
                    </div>
                </div>
            </div>
        </>
    )
}