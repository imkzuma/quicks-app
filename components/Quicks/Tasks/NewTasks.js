import { Accordion, Button, Col, Form, OverlayTrigger, Popover, Row, Stack } from "react-bootstrap";
import { BsBookmarks, BsClock, BsPencil, BsThreeDots } from "react-icons/bs";
import Select from "react-select";

import { customStyles, options } from "./TaskPriorityOptions";
import { ToggleTasksView } from "./ToggleTasksView";

export default function NewTasks(){
    return(
        <Form>
            <Accordion
                className = 'border-bottom'
                defaultActiveKey = "newTasks"
            >
                <Row className='align-items-center justify-content-between py-2 px-lg-3'>
                    <Col xl = {10} lg = {5} md = {9}>
                        <Form.Check
                            type="checkbox"
                            className = 'align-items-center d-flex gap-3'
                            label={
                                <Form.Control type="text" className='shadow-none p-1 px-3' placeholder="Type Task Title" />
                            }
                        />
                    </Col>

                    <Col xl = {2} lg = {4} md = {3} className='p-0 m-auto text-end'>
                        <div>
                            <ToggleTasksView eventKey={"newTasks"} />
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={
                                    <Popover style={{ width: "8vw" }} className='pe-4 bg-transparent border-0'>
                                        <Popover.Body className='p-0'>
                                            <Stack direction="vertical" gap={2} className='bg-white'>
                                                <Button variant="outline-danger" className='w-100'>Delete</Button>
                                            </Stack>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <Button variant="transparent"> <BsThreeDots /> </Button>
                            </OverlayTrigger>
                        </div>
                    </Col>

                </Row>
                <Accordion.Collapse
                    className='ps-sm-4'
                    eventKey = "newTasks"
                >
                    <Stack direction="vertical" gap={3} className='py-2 ps-xl-3'>
                        <Col xl={6} lg ={10} className='p-0'>
                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                <BsClock className='text-secondary fs-4' />
                                <Form.Control type="date" placeholder = "Set Date" />
                            </Stack>
                        </Col>
                        <Col xl = {8} lg={10} className='p-0'>
                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                <BsPencil className='text-secondary fs-4' />
                                <Form.Control type="text" className='shadow-none p-1 px-3' placeholder="No Description" />
                            </Stack>
                        </Col>
                        <Col xl = {12} lg={12} className='p-0'>
                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                <BsBookmarks className='text-primary fs-5' />
                                <Select
                                    isMulti
                                    name="options priority"
                                    options={options}
                                    styles={customStyles}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Stack>
                        </Col>
                    </Stack>
                </Accordion.Collapse>
            </Accordion>
        </Form>
    )
}