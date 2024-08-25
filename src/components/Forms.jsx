import React from 'react'
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


function Forms() {
  return (

    <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="on">
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!', },]} >
        <Input />
      </Form.Item>

      <Form.Item label="Company Name" name="Company Name" rules={[{ required: true, message: 'Please input your Company Name!', },]} >
        <Input />
      </Form.Item>

      <Form.Item name='email' label="Email" rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!', },]}    >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
        <Button type="primary" htmlType="submit">Submits </Button>
      </Form.Item>
    </Form>
  )
}

export default Forms

