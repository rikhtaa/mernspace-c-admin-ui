import { useQuery } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Space, Table } from "antd"
import { useState } from "react"
import { getTenants } from "../../http/api"
import { PlusOutlined, RightOutlined } from "@ant-design/icons"
import TenantsFilter from "./TenantsFilter"
import { useAuthStore } from "../../../store"
import { Link, Navigate } from "react-router-dom"
const Tenants = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const columns=[
        {
           title: 'Id',
           dataIndex: 'id',
           key: 'id'
        },
        {
             title: 'Name',
             dataIndex: 'name',
             key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
           key: 'address',
        },

  ]
  
  const {data: tenants,  isLoading,
    isError,
    error,} = useQuery({
      queryKey: ['tenants'],
      queryFn: ()=>{
        return getTenants().then((res)=> res.data.data)
      }
  }) 
    const {user} = useAuthStore()
  
    if (user?.role !== 'admin'){
     return <Navigate to='/' replace={true}/>
    }

  return (
    <>
    <Space direction="vertical" style={{width: '100%'}}>
    <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to="/">Dashboard</Link> }, { title: 'Tenants' }]}
                />
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error.message}</div>}

    <TenantsFilter
   onFilterChange={(filterName: string, filterValue: string)=>console.log(filterName, filterValue)}
    >
        <Button type="primary" icon={<PlusOutlined/>}
        onClick={()=> setDrawerOpen(true)}>
        Add Restaurant
        </Button>
    </TenantsFilter>
    <Table dataSource={tenants}  columns={columns} pagination={false}/>
    </Space>
     <Drawer
     width={720} destroyOnHidden={true}
        title="Create Tenant"
        onClose={
          ()=>{
            setDrawerOpen(false)
          }
        }
        open={drawerOpen}
        extra={
    <Space>
      <Button>Cancel</Button>
      <Button type="primary">Submit</Button>
    </Space>
  }>
      </Drawer>
    </>
  )
}

export default Tenants