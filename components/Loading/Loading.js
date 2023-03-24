import { Container, Spinner } from "react-bootstrap"

export default function Loading( props ){
    return(
        <Container fluid className = 'd-flex justify-content-center align-items-center' style = {{ height: "70vh" }}>
            <div className = 'text-center'>
                <Spinner animation = "border" variant = "secondary" style = {{width: "3.5rem", height: "3.5rem"}} />
                <p className="text-secondary fw-bold py-3">Loading {props.components}...</p>
            </div>
        </Container>
    )
}