import { useState } from "react";
import { Button, useAccordionButton } from "react-bootstrap"
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export function ToggleTasksView({ children, eventKey }){
    const decoratedOnClick = useAccordionButton(eventKey);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
        decoratedOnClick();
    }

    return(
        <Button variant = "transparent" type = "button" onClick = { handleClick }> 
            {
                children ? children : open ? <BsChevronDown /> : <BsChevronUp /> 
            }
        </Button>
    )
}