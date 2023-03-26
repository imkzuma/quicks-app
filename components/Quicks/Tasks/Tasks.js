import { useState } from "react";
import { Container, DropdownButton, Dropdown, Stack, Button, Row, Col } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { BsDash, BsPlus } from "react-icons/bs";

import { QuicksOpenCard } from "@/components/Quicks/QuicksOpenCard";
import TasksLists from "./TasksLists";
import NewTasks from "./NewTasks";

export default function Tasks(){
    const [showNewTask, setShowNewTask] = useState(false);

    return(
        <QuicksOpenCard>
            <Container fluid className = 'px-4 py-3'>
                <Row
                    className = 'ps-0 ps-xl-5 pb-3 align-items-center justify-content-between'
                >
                    <Col 
                        lg = {4} md = {4}
                        sm = {6} xs = {6}
                        className = 'p-0 bg-warning'
                    >
                        <DropdownButton 
                            variant = "outline-dark" 
                            className = 'w-100 bg-white'
                            title = "My Tasks"
                        >
                            <Dropdown.Item>Personal Errands</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Urgent To Do</Dropdown.Item>
                        </DropdownButton>
                    </Col>

                    <Col 
                        lg = {6} md = {5}
                        sm = {6} xs = {6}
                        className = 'p-0 d-flex justify-content-end'
                    >
                        <Button 
                            className = 'd-flex justify-content-center gap-2 align-items-center'
                            onClick = { () => setShowNewTask(!showNewTask) }
                        >
                            {
                                showNewTask? <BsDash className = 'fs-5' /> : <BsPlus className = 'fs-5' /> 
                            }
                            New Task
                        </Button>
                    </Col>
                </Row>
                
                <Stack direction = "vertical">
                    {
                        showNewTask && 
                        <AnimatePresence>
                            <motion.div
                                initial = {{ opacity: 0, y: -100 }}
                                animate = {{ opacity: 1, y: 0 }}
                                exit = {{ opacity: 0, y: -100 }}
                            >
                                <NewTasks />
                            </motion.div>
                        </AnimatePresence>
                    }
                    <TasksLists />
                </Stack>
            </Container>
        </QuicksOpenCard>
    )
}