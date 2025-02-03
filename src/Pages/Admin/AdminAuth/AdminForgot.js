import React, { useState } from 'react';
import { Button, Input, Form, message, Row, Col } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { auth } from '../../../Config/firebase';

const AdminForgot = () => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await sendPasswordResetEmail(auth, email);
      message.success("Password reset email sent!");
      navigate("/admin"); // Redirect to login after password reset request
    } catch (error) {
      message.error("Failed to send password reset email. Please check the email address.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <div className="auth-card">
        <h2 className="text-center">Forgot Password</h2>
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isProcessing}
                className="w-100"
              >
                Reset Password
              </Button>
            </Col>
            <Col span={24} className="text-center mt-2">
              <a href="/admin/login">Back to Login</a>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default AdminForgot;
