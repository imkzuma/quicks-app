import MainLayout from '@/layouts/MainLayout';
import axios from 'axios'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';


export default function Index(){
  const getData = async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response);
  }

  const getTodos = async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos?userId=10");
    console.log(response)
  }

  useEffect(() => {
    getData();
    getTodos();
  }, []);

  return(
    <MainLayout>
      <Container 
        fluid
        className = 'd-flex justify-content-center align-items-center bg-dark'
        style = {{
          minHeight: "100vh",
        }}
      >

      </Container>
    </MainLayout>
  )
}