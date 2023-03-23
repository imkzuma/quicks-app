import { Container, Form, InputGroup, Spinner, Stack } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import DefaultImageChat from './DefaultImageChat';
import { QuicksOpenCard } from "./QuicksOpenCard";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRandomDate = () => {
        const date = new Date();
        const time = Math.floor(Math.random() * date);

        return new Date(time);
    }

    const getData = async() => {
        try {
            setLoading(true);
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error)
        }
    }

    const Loading = () => {
        return(
            <Container fluid className = 'd-flex justify-content-center align-items-center' style = {{ height: "70vh" }}>
                <div className = 'text-center'>
                    <Spinner animation = "border" variant = "secondary" style = {{width: "3.5rem", height: "3.5rem"}} />
                    <p className="text-secondary fw-bold py-3">Loading Chats...</p>
                </div>
            </Container>
        )
    }

    useEffect(() => {
        getData();

    }, []);

    return(
        <QuicksOpenCard>
            { 
                loading ? <Loading /> : 
                <Container fluid className="px-4 py-3">
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
                    <Stack direction="vertical" gap = {4}>
                        {
                            data.map((item, index) => {
                                return(
                                    <Stack key = {index} direction = "horizontal" gap = {3} className = {`${data.length - 1 !== index&& "border-bottom" } pb-4`}>
                                        <DefaultImageChat image = {item.name} />
                                        <div>
                                            <Stack direction = "horizontal" gap = {4}>
                                                <h5 className = 'fw-bold text-primary' style = {{marginBottom: "-2px"}}> {item.name} </h5>
                                                <small className = 'text-secondary'> {getRandomDate().toLocaleString()} </small>
                                            </Stack>

                                            <p className = 'fw-bold text-secondary' style = {{marginBottom: "-2px"}}> {item.username} : </p>
                                            <small className = 'text-secondary'>
                                                {item.company.catchPhrase.slice(0, 30)}...
                                            </small>
                                        </div>
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </Container>
            
            }
        </QuicksOpenCard>
    )
}
