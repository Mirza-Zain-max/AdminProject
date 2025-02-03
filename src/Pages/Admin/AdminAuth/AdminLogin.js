import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Col, Row, Button, Input, Form, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { auth } from '../../../Config/firebase';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.success("Login Successful!");
            navigate("/admin/dashboard"); // Ensure this is called after successful login
        } catch (error) {
            message.error("Login failed. Please check your credentials.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Redirect if already logged in (this will avoid showing login page if user is already logged in)
    useEffect(() => {
        const user = localStorage.getItem("user"); // Check if user is already logged in
        if (user) {
            navigate("/admin/dashboard"); // If already logged in, go to the dashboard
        }
    }, [navigate]);

    return (
        <main className='auth p-3 p-md-4 p-lg-5'>
            <Fade cascade damping={0.1}>
                <Container>
                    <div className="card p-3 p-md-4 p-lg-4">
                        <Form layout="vertical" onSubmit={handleSubmit}>
                            <h1 className='mb-4 text-center'>
                                <i>Admin Login</i>
                            </h1>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Email" required>
                                        <Input 
                                            type='email' 
                                            placeholder='Enter Your Email' 
                                            name='email' 
                                            value={email} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Password" required>
                                        <Input.Password 
                                            placeholder='Enter Your Password' 
                                            name='password' 
                                            value={password} 
                                            onChange={handleChange} 
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button 
                                        type='primary' 
                                        htmlType='submit' 
                                        onClick={handleSubmit} 
                                        loading={isProcessing} 
                                        className='w-100'
                                    >
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container>
            </Fade>
        </main>
    );
};

export default AdminLogin;
