import { Container, DropdownButton, Dropdown, Stack, Button, Form, Accordion } from "react-bootstrap";
import { QuicksOpenCard } from "./QuicksOpenCard";
import { ToggleTasksView } from "./ToggleTasksView";

export default function Todo(){
    return(
        <QuicksOpenCard>
            <Container fluid className = 'px-4 py-3'>
                <Stack
                    direction = "horizontal"
                    className = 'ps-5 pb-3 align-items-center justify-content-between'
                >
                    <DropdownButton 
                        variant = "outline-dark" 
                        title = "My Tasks"
                    >
                        <Dropdown.Item>Personal Errands</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Urgent To Do</Dropdown.Item>
                    </DropdownButton>

                    <Button>
                        New Task
                    </Button>
                </Stack>
                
                <Stack direction = "vertical">
                    <Form>
                        <Accordion defaultActiveKey="0">
                            <Stack direction = "horizontal" className = 'align-items-center justify-content-between'>
                                <Form.Check type="checkbox" label="Check this custom checkbox" />
                                <Stack direction = "horizontal" gap = {3}>
                                    <small>2 Days Left</small>
                                    <small>12/06/2021</small>
                                    <ToggleTasksView eventKey="0">Click</ToggleTasksView>

                                </Stack>
                            </Stack>
                            <Accordion.Collapse eventKey="0">
                                <div>test body</div>
                            </Accordion.Collapse>
                        </Accordion>
                    </Form>
                </Stack>
            </Container>
        </QuicksOpenCard>
    )
}