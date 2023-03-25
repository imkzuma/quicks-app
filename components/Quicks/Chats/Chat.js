import { useState, useEffect } from "react";
import { Container, Form, InputGroup, Spinner, Stack } from "react-bootstrap";
import axios from "axios";

import { QuicksOpenCard } from "@/components/Quicks/QuicksOpenCard";
import Loading from "@/components/Loading/Loading";
import ChatLists from "./ChatLists";

export default function Chat(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async() => {
        try {
            setLoading(true);
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
            setData(data);

        } catch (error) {
            console.error(error)
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
                loading&& <Loading components = "Chats" /> 
            }
            <Container fluid className="px-4 py-3">
                <ChatLists data = {data} />
            </Container>
        </QuicksOpenCard>
    )
}
