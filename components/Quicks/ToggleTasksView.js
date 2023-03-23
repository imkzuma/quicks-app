import { Button, useAccordionButton } from "react-bootstrap"

export function ToggleTasksView({ children, eventKey }){
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!')
    );

    return(
        <Button type = "button" onClick = { decoratedOnClick }> { children } </Button>
    )
}