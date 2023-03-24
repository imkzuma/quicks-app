import Image from "next/image";
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion";
import { Stack, Button } from "react-bootstrap";

// components Chat and Todo
import Chat from "@/components/Quicks/Chats/Chat";
import Tasks from "@/components/Quicks/Tasks/Tasks";

export default function QuicksButton(){
    const [showChat, setShowChat] = useState(false);
    const [showTodo, setShowTodo] = useState(false);
    const [Show, setShow] = useState(false);

    const handleTodoClick = () => {
        setShowChat(false);
        setShowTodo(!showTodo);
    }

    const handleChatClick = () => {
        setShowChat(!showChat);
        setShowTodo(false);
    }

    function BtnTodo() {
        return(
            <Stack direction = "vertical" gap = {2}>
                { !showChat&& !showTodo&& 
                    <small className = 'text-white text-center fw-bold'>Tasks</small>
                }
                <Button 
                    onClick = { handleTodoClick } 
                    className = 'rounded-circle p-3'
                    style = {{
                        background: showTodo? "#F8B76B" : "#F2F2F2", 
                        border: `1px solid ${showTodo? "#F8B76B" : "#f2f2f2"}`
                    }}
                >
                    <Image 
                        src = {`assets/icon/${showTodo? "todo-white" : "todo-color"}.svg`}
                        width = "26"
                        height = "20"
                        priority
                        alt = "Todo Icon"
                    />
                </Button>
            </Stack>
        )
    }

    function BtnChat(){
        return(
            <Stack direction = "vertical" gap = {2}>
                { !showChat&& !showTodo&& 
                    <small className = 'text-white text-center fw-bold'>Inbox</small>
                }
                <Button 
                    onClick = { handleChatClick } 
                    className = 'rounded-circle p-3 quicks-btn-chat' 
                    style = {{
                        background: showChat ? "#8785FF" : "#F2F2F2", 
                        border: `1px solid ${showChat? "#8785FF" : "#f2f2f2"}`
                    }}
                >
                    <Image 
                        src = {`assets/icon/${showChat? "chat-white" :"chat-color"}.svg`}
                        width = "26"
                        height = "20"
                        priority
                        alt = "Chat Icon"
                    />
                </Button>
            </Stack>
        )
    }

    return(
        <>
            <AnimatePresence>
                { 
                    showChat&& 
                    <motion.div
                        initial = {{ opacity: 0 }}
                        animate = {{ opacity: 1 }}
                        exit = {{ opacity: 0 }}
                    >
                        <Chat /> 
                    </motion.div>
                }
            </AnimatePresence>

            <AnimatePresence>
                { 
                    showTodo&& 
                    <motion.div
                        initial = {{ opacity: 0 }}
                        animate = {{ opacity: 1 }}
                        exit = {{ opacity: 0 }}
                    >
                        <Tasks /> 
                    </motion.div>
                }
            </AnimatePresence>
            
            <Stack 
                direction = 'horizontal' 
                gap = {3} 
                className = 'align-items-end'
                style = {{
                    position: "absolute", 
                    bottom: "1.5rem", 
                    right: "1.5rem"
                }}
            >
                <AnimatePresence>
                    {
                        Show&& 
                            <motion.div
                                initial = {{ opacity: 0, x: 65 }}
                                animate = {{ opacity: 1, x: 0 }}
                                exit = {{ opacity: 0, x: 65 }}
                                className = 'd-flex gap-3 overflow-hidden'
                            >
                                <>
                                    {(!showChat && !showTodo) && <>
                                        <BtnTodo />
                                        <BtnChat />
                                    </>}
                                    {(showChat && !showTodo) && <>
                                        <BtnTodo />
                                        <BtnChat />
                                    </>}
                                    {(showTodo && !showChat) && <>
                                        <BtnChat />
                                        <BtnTodo />
                                    </>}
                                </>

                            </motion.div>
                    }
                </AnimatePresence>
                
                {
                    !showTodo && !showChat &&
                    <Button onClick = {() => setShow(!Show)} className = 'rounded-circle p-3'> 
                        <Image 
                            src = "/assets/icon/quicks-icon.svg"
                            width = "24"
                            height = "18"
                            priority
                            alt = "Quicks Icon"
                        />
                    </Button>
                }
                

            </Stack>
        </>
    )
}