import { Card, Col, Form, Input, Row } from "antd"

// React.ReactNode it means any renderable content in React.
type TenantFilterProps = {
  children: React.ReactNode
} 
const TenantsFilter = ({children}: TenantFilterProps) => {

  return (
       <Card>
        <Row justify="space-between">
          <Col span={8}>
            <Form.Item name="q">
              <Input.Search  allowClear={true} placeholder="Search"/>
            </Form.Item>
          </Col>
          <Col>
            {children}
          </Col>
        </Row>
       </Card>
  )
}

export default TenantsFilter