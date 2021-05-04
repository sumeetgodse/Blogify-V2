import React, { useRef, useState } from 'react'
import {Card, Form ,Button , Alert} from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext';
import {Link ,useHistory} from "react-router-dom"

const Login=()=> {
    const emailRef=useRef();
    const passwordRef=useRef();
    const {login} = useAuth();
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const history=useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/")
        } catch{
            setError('Falied to sign in!')
        }

        setLoading(false)

    }

    return (
        <>
            <Card style={{padding:"20px"}}>
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign In</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                <Link to="forgot-password">Forgot Password?</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login;