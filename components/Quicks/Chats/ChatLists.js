import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { InputGroup, Stack, Form, Container, Row, Button, Col, Alert, Spinner, OverlayTrigger, Popover } from "react-bootstrap";
import { BsArrowLeft, BsSearch, BsThreeDots, BsX } from "react-icons/bs";

import DefaultImageChat from "./DefaultImageChat";

export default function ChatLists({ data }){
    const [chat, setChat] = useState(false);
    const [datas, setDatas] = useState([]);
    const [name , setName] = useState(null);

    const getChat = async(id) => {
        try{
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            setDatas(data);

        } catch (error) {
            console.error(error)
        }
    }
    const getRandomDate = () => {
        const date = new Date();
        const time = Math.floor(Math.random() * date);

        return new Date(time);
    }

    const handleDelete = (id) => {
        setDatas(datas.filter(item => item.id !== id));
    }

    const handleClick = (item) => {
        getChat(item.id);
        setName(item.name);
        setChat(true);
    }

    const ViewChats = () => {
        return(
            <div className="p-0">
                <Row className="sticky-top justify-content-between align-items-center py-2 pb-4 border-bottom bg-white">
                        <Col 
                            lg = {1} md = {1}
                            sm = {1} xs = {1}
                        >
                            <Button variant = "transparent" className = 'px-0 py-0' onClick = {() => setChat(false)}>
                                <BsArrowLeft className = 'text-dark fs-5' />
                            </Button>
                        </Col>
                        <Col 
                            lg = {10} md = {9}
                            sm = {10} xs = {8}
                        >
                            <h5 className = 'ps-2 fw-bold text-primary my-auto'> 
                                { name }
                            </h5>
                        </Col>
                        <Col 
                            lg = {1} md = {2}
                            sm = {1} xs = {2}
                        >
                            <Button variant = "transparent" className = 'px-0 py-0' onClick={() => setChat(false)}>
                                <BsX className = 'text-dark fs-3' />
                            </Button>
                        </Col>
                </Row>

                <Container fluid className = 'py-2 pb-5'>
                    {
                        datas.map((item, index) => {
                            return(
                            index % 2 === 0 ? 
                            <>
                                <Stack direction = "horizontal" gap = {2} className = 'justify-content-between align-items-center'>
                                    <hr style = {{ background: "black", width: "10vw", height: "0.1rem" }} />
                                    <small className = 'text-dark fw-bold'>
                                        {getRandomDate().toLocaleDateString()}
                                    </small>
                                    <hr style = {{ background: "black", width: "10vw", height: "0.1rem" }} />
                                </Stack>
                                <Stack key = {index} className = 'justify-content-end pb-2'>
                                    <p className = 'text-primary fw-bold my-auto'>
                                        {name}
                                    </p>
                                    <Col lg = {9} >
                                        <Stack direction = "horizontal" className = 'align-items-start'>
                                            <Stack direction="vertical" gap = {1} className = 'px-3 py-2 rounded' style = {{background: "#F8F8F8"}}>
                                                <p className = 'my-auto' style = {{color: "#4F4F4F"}}>
                                                    {item.body}
                                                </p>
                                                <small className = 'text-secondary'>
                                                    {getRandomDate().toLocaleTimeString()}
                                                </small>
                                            </Stack>
                                            <OverlayTrigger
                                                trigger="click"
                                                placement="bottom"
                                                overlay={
                                                    <Popover style={{ width: "8vw" }} className='pe-4 border-0 bg-white'>
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
                                        </Stack>
                                    </Col>
                                </Stack>
                            </>
                            : 
                                <Row key = {index} className = 'justify-content-end pb-3'>
                                    <p className = 'Fw-bold my-auto text-end' style={{ color: "#9B51E0" }}>
                                        You
                                    </p>
                                    <Col lg = {9}>
                                        <Stack direction = "horizontal" className = 'align-items-start'>
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
                                            <Stack 
                                                gap = {1} 
                                                direction="vertical" 
                                                className = 'px-3 pe-4 py-2 rounded' 
                                                style = {{background: "#EEDCFF"}}
                                            >
                                                <p className = 'my-auto' style = {{color: "#4F4F4F"}}>
                                                    {item.body}
                                                </p>
                                                <small className = 'text-secondary'>
                                                    {getRandomDate().toLocaleTimeString()}
                                                </small>
                                            </Stack>
                                        </Stack>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    <div className = 'pb-5'>
                    <div className = 'pb-4 bg-white' />
                    </div>

                </Container>

                <Form className = "bg-white pb-4 pt-2 component-send-message">
                    {
                        datas.map((item,index) => {
                            return(
                                item.postId % 2 === 0 && index < 1 &&
                                <Alert key = {index} variant = "primary" className = 'text-center p-2' >
                                    <Stack direction = "horizontal" gap = {3}>
                                        <Spinner animation="border" variant="primary" size = "sm" />
                                        <small className = 'my-auto text-dark fw-bold text-start'>
                                            Please wait while we connect you with one of our team...
                                        </small>
                                    </Stack>
                                </Alert>
                            )
                        })
                    }
                    <Row>
                        <Col lg = {10} xs = {8} md = {10} sm ={9}>
                            <Form.Control type = "text" className = 'shadow-none' placeholder = "Type a new message" />
                        </Col>
                        <Col lg = {2} xs = {4} md = {2} sm = {3}>
                            <Button className = 'w-100'>
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    return(
        <>
            {
                chat? 
                <AnimatePresence>
                    <motion.div
                        initial = {{ x: 200 }}
                        animate = {{ x: 0 }}
                        exit = {{ opacity: 0 }}
                        transition = {{ type: "ease" }}
                    >
                        <ViewChats /> 
                    </motion.div>
                </AnimatePresence>
                :
                <motion.div 
                    initial = {{ x: -200 }} 
                    animate = {{ x:0 }}
                    transition = {{ type: "ease" }}
                >
                        <InputGroup className = 'pb-4'>
                            <Form.Control 
                                type="text" 
                                placeholder="Search" 
                                className = 'px-5' style = {{ borderRight: "none", boxShadow: "none" }} 
                            />
                            <InputGroup.Text 
                                className = 'px-5' 
                                style = {{ backgroundColor: "transparent" }}
                            > 
                                <BsSearch className="texr-secondary" /> 
                            </InputGroup.Text>
                        </InputGroup>

                        <Stack direction="vertical" gap = {4} type = "button">
                            {
                                data.map((item, index) => {
                                    return(
                                        <Row key = {index} className = {`${data.length - 1 !== index&& "border-bottom" } pb-4`} onClick = {() => handleClick(item)}>
                                            <Col 
                                                lg = {1} md = {1}
                                                sm = {1} xs = {1}
                                                className = 'pt-xl-1'
                                            >
                                                <DefaultImageChat image = {item.name} />
                                            </Col>
                                            <Col 
                                                lg = {11} md = {10}
                                                sm = {10} xs = {10}
                                                className = 'ps-3 ps-sm-4'
                                            >
                                                <Stack direction = "horizontal" gap = {4}>
                                                    <h5 
                                                        className = 'fw-bold text-primary' 
                                                        style = {{marginBottom: "-2px"}}
                                                    > 
                                                        {item.name} 
                                                    </h5>
                                                    <small className = 'text-secondary'> {getRandomDate().toLocaleString()} </small>
                                                </Stack>

                                                <p className = 'fw-bold text-secondary' style = {{marginBottom: "-2px"}}> {item.username} : </p>
                                                <small className = 'text-secondary'>
                                                    {item.company.catchPhrase.slice(0, 30)}...
                                                </small>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </Stack>
                </motion.div>
            }
        </>
    )
}