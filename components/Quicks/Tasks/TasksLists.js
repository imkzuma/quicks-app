import { useState, useEffect } from "react";
import { Stack, Button, Form, Accordion, OverlayTrigger, Popover, Col, Row, Container } from "react-bootstrap";
import { BsBookmarks, BsClock, BsPencil, BsThreeDots } from "react-icons/bs";
import axios from "axios";
import Select from "react-select";

import { ToggleTasksView } from "./ToggleTasksView";
import { options, customStyles } from "./TaskPriorityOptions";
import Loading from "@/components/Loading/Loading";

export default function TasksLists() {
    const [check, setCheck] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("https://dummyapi.io/data/v1/tag/water/post?limit=10", {
                headers: {
                    "app-id": "64195978d29b3a3213c6c3cc"
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

    function defDateFormatted(date) {
        const todayDate = new Date(date);
        const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}` : todayDate.getDate();
        const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()}` : todayDate.getMonth();
        const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
        return formattedDate;
    }

    function printDate(date) {
        const newDate = new Date(date);

        newDate.setFullYear("2023"); // ini hanya buat dummy aja, karena tahun di API sudah lewat

        return newDate.toLocaleDateString("id-ID");
    }

    function selisihDate(date) {
        const startDate = new Date();
        const endDate = new Date(date);

        endDate.setFullYear("2023") // ini hanya buat dummy aja, karena tahun di API sudah lewat

        const selisih = endDate.getTime() - startDate.getTime();
        const selisihHari = Math.ceil(selisih / (1000 * 3600 * 24));

        // display days left and days late
       return selisihHari > 0 ? `${selisihHari} Days Left` : `${selisihHari * -1} Days Late`;
    }

    function handleDelete(id){
        setData(data.filter(item => item.id !== id));
    }

    return (
        <>
            {   
                loading&&
                <Container 
                    fluid 
                    style = {{ position: "absolute", left: "0", top: "0"}} 
                    className = 'bg-white'
                >
                    <Loading components = "Tasks" />
                </Container>
            }
            <Form>
                {
                    data.map((item, index) => {
                        return (
                            <Accordion
                                key={index}
                                className={`${data.length - 1 !== index && "border-bottom"} py-1`}
                            >
                                <Row className='align-items-center px-3'>
                                    <Col lg={6}>
                                        <Form.Check
                                            type="checkbox"
                                            label={
                                                <h6 className='ps-3 fw-bold text-dark'>
                                                    {
                                                        item.tags.map((tag, id) => {
                                                            return (
                                                                <span
                                                                    key={id}
                                                                    className={`${check[item.id]&& "text-decoration-line-through text-secondary"}`}
                                                                >
                                                                    {tag}
        
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </h6>
                                            }
                                            onChange = {() => setCheck({ ...check, [item.id]: !check[item.id] })}
                                            checked = {check[item.id]}
                                        />
                                    </Col>
    
                                    <Col lg={5} className='m-auto'>
                                        <Row className = 'align-items-center'>
                                            <Col lg={5} className = 'p-0'>
                                                <small className='text-danger text-start'>
                                                    {!check[item.id] && selisihDate(item.publishDate)}
                                                </small>
                                            </Col>
    
                                            <Col lg={3}>
                                                <small className={`${check[item.id] && "text-secondary"}`}>
                                                    {printDate(item.publishDate)}
                                                </small>
                                            </Col>
                                            
                                            <Col lg={1} className='m-auto'>
                                                <ToggleTasksView eventKey={index} />
                                            </Col>
                                            
                                            <Col lg = {1} className='m-auto'>
                                                <OverlayTrigger
                                                    trigger="click"
                                                    placement="bottom"
                                                    overlay={
                                                        <Popover style={{ width: "8vw" }} className='pe-4 border-0 bg-transparent'>
                                                            <Popover.Body className='p-0'>
                                                                <Stack direction="vertical" gap={2} className='bg-white'>
                                                                    <Button variant="outline-danger" className='w-100' onClick = {() => handleDelete(item.id)}>Delete</Button>
                                                                </Stack>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <Button variant="transparent"> <BsThreeDots /> </Button>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Col>
    
                                </Row>
                                <Accordion.Collapse
                                    eventKey={index}
                                    className='ps-4'
                                >
                                    <Stack direction="vertical" gap={3} className='py-2 ps-3'>
                                        <Col lg={6} className='p-0'>
                                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                                <BsClock className='text-primary fs-4' />
                                                <Form.Control type="date" value={defDateFormatted(item.publishDate)} onChange={() => console.log("CHANGE")} />
                                            </Stack>
                                        </Col>
                                        <Col lg={6} className='p-0'>
                                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                                <BsPencil className='text-primary fs-2' />
                                                <h6> {item.text} </h6>
                                            </Stack>
                                        </Col>
                                        <Col lg={12} className='p-0'>
                                            <Stack direction="horizontal" gap={4} className='align-items-center'>
                                                <BsBookmarks className='text-primary fs-5' />
                                                <Select
                                                    defaultValue={options[Math.floor(Math.random() * options.length)]}
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
                        )
                    })
                }
            </Form>
        </>
    )
}