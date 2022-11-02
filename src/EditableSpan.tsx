import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType ={
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {


    const[editMode, setEditMode] = useState(false)
const[title, setTitle] = useState(props.value)

    function activeEditMode() {
        setEditMode(true)
        setTitle(props.value)
    }

    function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)

    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
        <>
            {editMode ? <input value={title} onBlur={activateViewMode} onChange={onChangeInputHandler} autoFocus/>: <span onDoubleClick={activeEditMode}>{props.value}</span>}

        </>
    );
};

