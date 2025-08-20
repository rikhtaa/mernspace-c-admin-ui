import { PlusOutlined, RightOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd"
import { Link, Navigate } from "react-router-dom"
import { createUser, getUsers } from "../../http/api"
import type { CreateUserData, User } from "../../../types"
import { useAuthStore } from "../../../store"
import UserFilter from "./UserFilter"
import { useState } from "react"
import UserForm from "./forms/UserForm"
import { PER_PAGE } from "../../constants"

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstname',
    render: (_text: string, record: User)=>{
      return (

        <div>
          {record.firstName} {record.lastName}
        </div>
      )
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role' 
  }
];
const Users = () => {
  const [form] =Form.useForm()
  const QueryClient = useQueryClient()

  const {
    token: {colorBgLayout},
  } = theme.useToken()
  
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  })

const [drawerOpen, setDrawerOpen] = useState(false)
const {data: users, isLoading, isError, error} = useQuery({
  queryKey: ['users', queryParams],
  queryFn:  ()=>{
    const queryString = new URLSearchParams(
      queryParams as unknown as Record<string, string>
    ).toString()
    return getUsers(queryString).then((res)=> res.data)
  }
})
  const {user} = useAuthStore()

  const {mutate: userMutate} = useMutation({
    mutationKey: ['user'],
    mutationFn: async(data: CreateUserData)=> createUser(data).then((res)=> res.data),
    onSuccess: async ()=>{
      QueryClient.invalidateQueries({queryKey: ['users']})
      return 
    }
  })

  const onHandlerSubmit = async()=>{
    await form.validateFields()
    console.log('Form values', form.getFieldValue())
    await userMutate(form.getFieldValue())
    form.resetFields()
    setDrawerOpen(false)
  }
  if(user?.role !== 'admin'){
    return <Navigate to="/" replace={true}/> 
  }
  return <>
  <Space direction='vertical' size={'large'} style={{width: '100%'}}>
 <Breadcrumb separator={<RightOutlined/>} items={[{ title: <Link to="/">Dashboard</Link> }, {title: 'Users'}]} />
 {isLoading && <div>Loading...</div>}
 {isError && <div>{error.message}</div>}
 <UserFilter onFilterChange={(filterName: string, filterValue: string) =>{
   console.log(filterName, filterValue)
 }}>

   <Button type="primary" 
   icon={<PlusOutlined/>}
   onClick={()=> setDrawerOpen(true)}
   >
        Add User
   </Button>

  </UserFilter>
 <Table  
 dataSource={users?.data} 
 columns={columns} 
 rowKey={'id'}

 pagination={{
  total: users?.total,
  pageSize: queryParams.perPage,
  current: queryParams.currentPage,
  onChange: (page)=>{
    setQueryParams((prev)=>{
      return{
        ...prev,
        currentPage: page,
      }
    })
  }
 }} 
 />

 <Drawer title="Create user" width={720} destroyOnHidden={true} 
 onClose={()=> {
  form.resetFields()
  setDrawerOpen(false)
 }}
 styles={{body: {background: colorBgLayout}}}
  open={drawerOpen}
  extra={
    <Space>
      <Button onClick={()=>{
         form.resetFields()
        setDrawerOpen(false)}
      }>Cancel</Button>
      <Button type="primary" onClick={onHandlerSubmit}>Submit</Button>
    </Space>
  }
  >
    <Form layout="vertical" form={form}>
     <UserForm/>
    </Form>
 </Drawer>
  </Space>
  </>
}

export default Users