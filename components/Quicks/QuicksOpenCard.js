import { Col, Row } from "react-bootstrap";

export function QuicksOpenCard({ children }){
    return(
        <Row>
            <Col 
                lg = {4} md = {6} 
                sm = {6} xs = {10} 
                className = 'bg-white overflow-auto rounded p-0' 
                style = {{
                    minHeight: "70vh", 
                    maxHeight: "70vh", 
                    position: "absolute", 
                    right: "1.5rem", 
                    bottom: "6rem"
                }}
            >
                { children }
                
            </Col>
        </Row>
    )
}