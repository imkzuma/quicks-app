import { useState } from "react";
import { Container, DropdownButton, Dropdown, Stack, Button } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { BsDash, BsPlus } from "react-icons/bs";

import { QuicksOpenCard } from "@/components/Quicks/QuicksOpenCard";
import TasksLists from "./TasksLists";
import NewTasks from "./NewTasks";

export default function Tasks(){
    const [data, setData] = useState([]);
    const [showNewTask, setShowNewTask] = useState(false);

    

    return(
        <QuicksOpenCard>
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

                    <Button 
                        className = 'd-flex justify-content-center gap-2 align-items-center'
                        onClick = { () => setShowNewTask(!showNewTask) }
                    >
                        {
                            showNewTask? <BsDash className = 'fs-5' /> : <BsPlus className = 'fs-5' /> 
                        }
                        New Task
                    </Button>
                </Stack>
                
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
                    <TasksLists data = { data } />
                </Stack>
            </Container>
        </QuicksOpenCard>
    )
}