import { useState } from 'react'

interface ButtonProps {
    theme: 'yellow' | 'red' | 'lightgreen';
    onClick?: Function;
    text: string;
}

export const Button = (props: ButtonProps) => {
 
    const [isHover, setIsHover] = useState(false);

    const buttonStyles = { 
        padding: '0.5em 0.75em', 
        border: `2px solid ${props.theme}`,
        borderRadius: '0.375rem',
        backgroundColor: isHover ? props.theme : 'transparent',
        transition: '0.15s all ease-in-out',
        cursor: 'pointer',
        width: 'fit-content',
        height: '35px',
        fontSize: '13px'
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const onClick = () => {
        if (!props.onClick) return;
        props.onClick()
    }

    return (
        <button 
            style={buttonStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {props.text}
        </button>
    )

}