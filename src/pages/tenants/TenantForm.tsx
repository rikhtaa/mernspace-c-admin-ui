import { Card, Col, Form, Input, Row } from "antd"

const TenantForm = () => {
  return <Card title='Basic info' variant={'borderless'}>
  <Row>
    <Col span={24}>
      <Row gutter={20}>
        <Col span={12}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "please input your name!"}]}>
            <Input  size="large"/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Address" name="address" rules={[{ required: true, message: "please input your address!"}]}>
            <Input  size="large"/>
        </Form.Item>
        </Col>
      </Row>
    </Col>
  </Row>
  </Card>
}

export default TenantForm