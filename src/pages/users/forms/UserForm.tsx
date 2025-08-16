import { useQuery } from "@tanstack/react-query"
import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { getTenants } from "../../../http/api"
import type { Tenant } from "../../../../types"

const UserForm = () => {
    const {data: tenants} = useQuery({
      queryKey: ['tenants'],
      queryFn: ()=>{
        return getTenants().then((res)=> res.data.data)
      }
  }) 
  return <Row>
  <Col span={24}>
  <Space direction="vertical" size={'large'}>
    <Card title='Basic info' variant={'borderless'}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label='First Name' name='firstName' rules={[
          {
            required: true,
            message: 'First name is required'
          }
          ]}>
             <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Second Name' name='secondName' rules={[
          {
            required: true,
            message: 'Last Name is required'
          }
          ]}>
             <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Email' name='email'rules={[
          {
            required: true,
            message: 'Email is required'
          },
          {
            type: 'email',
            message: 'Email is not valid',
          }
          ]}>
             <Input size="large" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
    <Card title='Security info' variant={'borderless'}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label='Password' name='password' rules={[
          {
            required: true,
            message: 'Password is required'
          }   
        ]}>
             <Input size="large" type="password"/>
          </Form.Item>
        </Col>
      </Row>
    </Card>
    <Card title='Role' variant={'borderless'}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label='Role' name='role' 
           rules={[
          {
            required: true,
            message: 'Role is required'
          }   
        ]}>
               <Select 
         size="large"
         style={{width: '100%'}} 
         allowClear={true} 
         onChange={()=> {}}
         placeholder="Select role">
           <Select.Option value="admin">Admin</Select.Option>
           <Select.Option value="user">Manager</Select.Option>
           <Select.Option value="customer">Customer</Select.Option>
         </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Restaurant' name='tenantId'
           rules={[
          {
            required: true,
            message: 'Restaurant is required'
          }   
        ]}>
               <Select 
         size="large"
         style={{width: '100%'}} 
         allowClear={true} 
         onChange={()=> {}}
         placeholder="Select restaurant">
            {
            tenants?.map((tenant: Tenant)=>(
                <Select.Option value={tenant.id} key={tenant.id}>{tenant.name}</Select.Option>
            ))
            }
         </Select>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  </Space>
  </Col>
  </Row>
}

export default UserForm