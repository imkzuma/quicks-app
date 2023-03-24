import MainLayout from '@/layouts/MainLayout';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

export default function Index(){
  return(
    <>
      <Head>
        <title> Quicks App </title>
      </Head>

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
    </>
  )
}