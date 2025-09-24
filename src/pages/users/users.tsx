import { LoadingOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, theme, Typography } from "antd"
import { Link, Navigate } from "react-router-dom"
import { createUser, getUsers } from "../../http/api"
import type { CreateUserData, FieldData, User } from "../../../types"
import { useAuthStore } from "../../../store"
import UserFilter from "./UserFilter"
import React, { useState } from "react"
import UserForm from "./forms/UserForm"
import { PER_PAGE } from "../../constants"
import { debounce } from "lodash"

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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form] =Form.useForm()
  const [filterForm] = Form.useForm()
  const QueryClient = useQueryClient()
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,
  })

  const {
    token: {colorBgLayout},
  } = theme.useToken()
  

const {data: users, isFetching, isError, error} = useQuery({
  queryKey: ['users', queryParams],
  queryFn:  ()=>{
    const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
    return getUsers(queryString).then((res)=> res.data)
  },
  placeholderData: keepPreviousData

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
    await userMutate(form.getFieldsValue())
    form.resetFields()
    setDrawerOpen(false)
  }

  const debouncedQUpdate = React.useMemo(()=> {
    return debounce((value: string | undefined)=>{
      setQueryParams((prev)=> ({...prev, q: value}))
    }, 1000)
  },[])

  const onFilterChange = (changedFields: FieldData[])=>{
    const changeFiltersFields = changedFields.map((item)=>({
      [item.name[0]]: item.value,
    })).reduce((acc, item)=> ({...acc, ...item}), {})
     
    if('q' in changeFiltersFields){
      debouncedQUpdate(changeFiltersFields.q)
    }else{
      setQueryParams((prev)=> ({...prev, ...changeFiltersFields}))
    }
  }
  if(user?.role !== 'admin'){
    return <Navigate to="/" replace={true}/> 
  }
  return <>
  <Space direction='vertical' size={'large'} style={{width: '100%'}}>
  <Flex justify="space-between">
  <Breadcrumb separator={<RightOutlined/>} items={[{ title: <Link to="/">Dashboard</Link> }, {title: 'Users'}]} />
 {isFetching && (
 <Spin indicator={<LoadingOutlined style={{fontSize: 24}}/>}/>
 )}
 {isError && <Typography.Text type="danger">{error.message}</Typography.Text>}
  </Flex>

  
  <Form form={filterForm} onFieldsChange={onFilterChange}>
 <UserFilter>
   <Button type="primary" 
   icon={<PlusOutlined/>}
   onClick={()=> setDrawerOpen(true)}
   >
        Add User
   </Button>

  </UserFilter>
  </Form>


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