import React from 'react'
import { Button, Form } from 'react-bootstrap';

export default function Blog() {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <Form>
                <Form.Control
                    type="text"
                    placeholder='Enter here'
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid', borderRadius: '0%' }}>
                </Form.Control>
            </Form>
        </div>
    );
}
