// import React, { useState } from 'react';
// import { Container } from 'react-bootstrap';
// import { Col, Row, Button, Input, Form, message} from 'antd';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { Link, useNavigate } from 'react-router-dom';
// import { Fade } from 'react-awesome-reveal';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, fireStore } from '../../../Config/firebase';

// const AdminRegister = () => {
//     const navigate = useNavigate();
//     const initialState = { fullName: "", email: "", password: "", confirmPassword: "" };
//     const [state, setState] = useState(initialState);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });

//     const handleSubmit = e => {
//         e.preventDefault();
//         let { fullName, email, password, confirmPassword } = state;
//         fullName = fullName.trim();
//         if (fullName.length < 3) return message.error("Please Enter Your Name Correctly");
//         if (password.length < 8) return message.error("Password must be at least 8 characters.");
//         if (confirmPassword !== password) return message.error("Passwords do not match.");

//         setIsProcessing(true);

//         // Create Admin User
//         createUserWithEmailAndPassword(auth, email, password)
//             .then(async (userCredential) => {
//                 const user = userCredential.user;
//                 const userData = { uid: user.uid, fullName, email, password, role: 'admin' };

//                 // Save admin data in Firestore in the "admins" collection
//                 await setDoc(doc(fireStore, "admins", user.uid), userData);

//                 message.success("Admin registered successfully!");
//                 navigate("/admin/dashboard"); // Redirect to Admin Dashboard after registration
//             })
//             .catch((error) => message.error("Account is already registered"))
//             .finally(() => setIsProcessing(false));
//     }

//     return (
//         <main className='auth p-3 p-md-4 p-lg-5'>
//             <Fade cascade damping={0.1}>
//                 <Container>
//                     <div className="card p-3 p-md-4 p-lg-4">
//                         <Form layout="vertical">
//                             <h1 className='mb-4 text-center'>
//                                 <i>
//                                     Admin Register
//                                 </i>
//                             </h1>
//                             <Row>
//                                 <Col span={24}>
//                                     <Form.Item label="FullName" required>
//                                         <Input type='text' placeholder='Enter Your Full Name' name='fullName' onChange={handleChange} />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={24}>
//                                     <Form.Item label="Email" required>
//                                         <Input type='email' placeholder='Enter Your Email' name='email' onChange={handleChange} />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={24}>
//                                     <Form.Item label="Password" required>
//                                         <Input.Password placeholder='Enter Your Password' name='password' onChange={handleChange} />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={24}>
//                                     <Form.Item label="Confirm Password" required>
//                                         <Input.Password placeholder='Enter Your Confirm Password' name='confirmPassword' onChange={handleChange} />
//                                     </Form.Item>
//                                 </Col>
//                                 <Col span={24}>
//                                     <Button type='primary' htmlType='submit' onClick={handleSubmit} className='w-100' loading={isProcessing}>Register</Button>
//                                 </Col>
//                                 <Col span={12} className='mt-2'>
//                                     <p>
//                                         Already have an account?
//                                     </p>
//                                 </Col>
//                                 <Col span={12}>
//                                     <Link to='/admin/login' className='mt-2 btn text-center nav-link'>Login</Link>
//                                 </Col>
//                             </Row>
//                         </Form>
//                     </div>
//                 </Container>
//             </Fade>
//         </main>
//     );
// };

// export default AdminRegister;
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Col, Row, Button, Input, Form, message } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { auth, fireStore } from '../../../Config/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Import setDoc to create Firestore document

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (password !== confirmPassword) {
            message.error("Passwords do not match.");
            setIsProcessing(false);
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore (excluding password)
            await setDoc(doc(fireStore, "admins", user.uid), {
                email: user.email,
                role: "admin", // Set the role as "admin"
                createdAt: serverTimestamp(), // Save creation timestamp
            });

            message.success("Registration Successful!");
            navigate("/admin/dashboard"); // Redirect to Admin Dashboard after successful registration
        } catch (error) {
            message.error("Registration failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Redirect if already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/admin");
        }
    }, [navigate]);

    return (
        <main className='auth p-3 p-md-4 p-lg-5'>
            <Fade cascade damping={0.1}>
                <Container>
                    <div className="card p-3 p-md-4 p-lg-4">
                        <Form layout="vertical" onSubmit={handleSubmit}>
                            <h1 className='mb-4 text-center'>
                                <i>Admin Register</i>
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
                                    <Form.Item label="Confirm Password" required>
                                        <Input.Password
                                            placeholder='Confirm Your Password'
                                            name='confirmPassword'
                                            value={confirmPassword}
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
                                        Register
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

export default AdminRegister;
