import { PlusOutlined, RightOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Space, Table } from "antd"
import { Link, Navigate } from "react-router-dom"
import { getUsers } from "../../http/api"
import type { User } from "../../../types"
import { useAuthStore } from "../../../store"
import UserFilter from "./UserFilter"
import { useState } from "react"

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

const {data: users, isLoading, isError, error} = useQuery({
  queryKey: ['users'],
  queryFn:  ()=>{
    return getUsers().then((res)=> res.data.data)
  }
})
  const {user} = useAuthStore()
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
 <Table  dataSource={users} columns={columns} pagination={false} rowKey={'id'}/>;

 <Drawer title="Create user" width={720} destroyOnHidden={true} 
 onClose={()=> {
  setDrawerOpen(false)
 }}
  open={drawerOpen}
  extra={
    <Space>
      <Button>Cancel</Button>
      <Button type="primary">Submit</Button>
    </Space>
  }
  >
  
 </Drawer>
  </Space>
  </>
}

export default Users