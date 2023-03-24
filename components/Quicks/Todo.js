import axios from "axios";
import { useEffect, useState } from "react";
import { Container, DropdownButton, Dropdown, Stack, Button, Form, Accordion, OverlayTrigger, Popover, Col } from "react-bootstrap";
import { BsClock, BsPencil, BsPlus, BsThreeDots } from "react-icons/bs";
import Loading from "./Loading/Loading";
import { QuicksOpenCard } from "./QuicksOpenCard";
import { ToggleTasksView } from "./ToggleTasksView";

export default function Todo(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    function defDateFormatted(date){
        const todayDate = new Date(date); 
        const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
        const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()}`: todayDate.getMonth();
        const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
        return formattedDate;
    }
    
    function printDate(date){
        const newDate = new Date(date);

        newDate.setFullYear("2023"); // ini hanya buat dummy aja, karena tahun di API sudah lewat

        return newDate.toLocaleDateString("id-ID");
    }

    function selisihDate (date){
        const startDate = new Date();
        const endDate = new Date(date);

        endDate.setFullYear("2023") // ini hanya buat dummy aja, karena tahun di API sudah lewat

        const selisih = endDate.getTime() - startDate.getTime();
        return Math.ceil(selisih / (1000 * 3600 * 24));
    }

    const getData = async() => {
        try {
            setLoading(true);
            const { data } = await axios.get("https://dummyapi.io/data/v1/tag/water/post?limit=10", {
                headers: {
                    "app-id" : "64195978d29b3a3213c6c3cc"
                }
            });
            setData(data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <QuicksOpenCard>
            {
                loading? <Loading components = "Tasks" /> :
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

                        <Button className = 'd-flex justify-content-center gap-2 align-items-center'>
                            <BsPlus className = 'fs-5' /> New Task
                        </Button>
                    </Stack>
                    
                    <Stack direction = "vertical">
                        <Form>
                            {
                                data.map((item, index) => {
                                    return(
                                        <Accordion 
                                            defaultActiveKey = {index} 
                                            key = {index} 
                                            className = {`${data.length - 1 !== index&& "border-bottom" } py-1`}
                                        >
                                            <Stack direction = "horizontal" className = 'align-items-center justify-content-between'>
                                                <Form.Check 
                                                    type="checkbox" 
                                                    label = {
                                                        <h6 className = 'ps-3 fw-bold text-dark'>
                                                            {item.tags.map((tag) => { return tag + " " })}
                                                        </h6>
                                                    } 
                                                />
                                                
                                                <Stack direction = "horizontal" gap = {3}>
                                                    <small className = 'text-danger'> {selisihDate(item.publishDate)} Days Left </small>
                                                    <small> { printDate(item.publishDate) } </small>
                                                    <ToggleTasksView eventKey={index}/>
                                                    <OverlayTrigger 
                                                        trigger = "click" 
                                                        placement="bottom"
                                                        overlay = {
                                                            <Popover style = {{width: "8vw"}} className = 'pe-4 bg-transparent'> 
                                                                <Popover.Body className = 'p-0'>
                                                                    <Stack direction = "vertical" gap = {2} className = 'bg-white'>
                                                                        <Button variant = "outline-dark" className = 'w-100'>Edit</Button>
                                                                        <Button variant = "outline-danger" className = 'w-100'>Delete</Button>
                                                                    </Stack>
                                                                </Popover.Body>
                                                            </Popover>
                                                        }
                                                    >
                                                        <Button variant = "transparent"> <BsThreeDots /> </Button>
                                                    </OverlayTrigger>
                                                </Stack>

                                            </Stack>
                                            <Accordion.Collapse 
                                                eventKey = {index} 
                                                className = 'ps-4'
                                            >
                                                <Stack direction = "vertical" gap = {3} className = 'py-2 ps-3'>
                                                    <Col lg = {6} className = 'p-0'>
                                                        <Stack direction = "horizontal" gap = {4} className = 'align-items-center'>
                                                            <BsClock className = 'text-primary fs-4' />
                                                            <Form.Control type = "date" value = { defDateFormatted(item.publishDate) } />
                                                        </Stack>
                                                    </Col>
                                                    <Col lg = {6} className = 'p-0'>
                                                        <Stack direction = "horizontal" gap = {4} className = 'align-items-center'>
                                                            <BsPencil className = 'text-primary fs-4' />
                                                            <h6> { item.text } </h6>
                                                        </Stack>
                                                    </Col>
                                                </Stack>
                                            </Accordion.Collapse>
                                        </Accordion>
                                    )
                                })
                            }
                        </Form>
                    </Stack>
                </Container>
            }
        </QuicksOpenCard>
    )
}