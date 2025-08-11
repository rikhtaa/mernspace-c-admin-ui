import {Alert, Button, Card, Checkbox, Flex, Form, Input, Layout,  Space} from 'antd'
import 'antd/dist/reset.css'
import {LockFilled, LockOutlined, UserOutlined} from '@ant-design/icons'
import Logo from '../../components/icons/Logo'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { Credentails } from '../../../types'
import { login, self } from '../../http/api'
import {usePermission} from '../../../hooks/usePermission'
import {useLogoutUser} from '../../../hooks/useLogoutUser'
import {useAuthStore} from '../../../store'

const loginUser = async (credentails : Credentails)=>{
  //server call login
 const {data} =  await login(credentails)
 return data
}

const getSelf = async ()=>{
  const {data} =  await self()
  return data
}

const LoginPage = () => {
  const {setUser} = useAuthStore()
  const {_logout} = useLogoutUser()
  const { isAllowed} = usePermission()

  const {refetch} = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false, 
  }) 

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () =>{
    const selfDataPromise = await refetch()
    //logout or redirect to client ui
    //window.location.href = "http://clientui/url"
    if(!isAllowed(selfDataPromise.data)){
      _logout()
      return
    }

      setUser(selfDataPromise.data)
    }
  }) 
  return <>
    <Layout style={{height: '100vh', display: 'grid', placeItems: 'center'}}>
      <Space direction='vertical' align='center' size='large'>
       <Layout.Content
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Logo/>
      </Layout.Content>
      <Card 
      variant={"borderless"}
      style={{width: 300}}
      title={
        <Space style={{width: '100%', fontSize: 16, justifyContent: 'center'}}>
          <LockFilled/>
          Sign in
        </Space>
        }>
          <Form 
          initialValues={{remember: true}}
          onFinish={(values)=>{
            mutate({email: values.username, password: values.password})
            console.log(values)
          }}
          >
            {isError && ( 
           <Alert 
            style={{marginBottom: 24}} 
            type='error'
             message={error?.message}
            
            />
          )}
            <Form.Item name='username' rules={[
              {
                required: true,
                message: 'Please input your Username'
              },
              {
                type: 'email',
                message: 'Email is not valid'
              }
            ]}>
              <Input prefix={<UserOutlined/>} placeholder='Username' />
            </Form.Item>
            <Form.Item name='password' rules={[
              {
                required: true,
                message: 'Please input your Password'
              }]}>
              <Input.Password prefix={<LockOutlined/>} placeholder='Password' />
            </Form.Item>
            <Flex justify='space-between'>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
              <a href="" id='login-form-forgot'>Forget password</a>
            </Flex>
               <Form.Item>
              <Button type='primary' htmlType='submit' style={{width: '100%'}} loading={isPending}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  </>
  
}

export default LoginPage 