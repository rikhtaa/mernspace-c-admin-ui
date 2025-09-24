import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Breadcrumb, Button, Drawer, Form, Space, Table } from "antd"
import React, { useState } from "react"
import { createTenant, getTenants } from "../../http/api"
import { PlusOutlined, RightOutlined } from "@ant-design/icons"
import { useAuthStore } from "../../../store"
import { Link, Navigate } from "react-router-dom"
import type {CreateTenant, FieldData, Tenant} from "../../../types"
import TenantsFilter from "./TenantsFilter"
import { PER_PAGE } from "../../constants"
import { debounce } from "lodash"
import TenantForm from "./TenantForm"
const Tenants = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm()
    const QueryClient = useQueryClient()
    const [queryParams, setQueryParams] = useState({
      perPage: PER_PAGE,
      currentPage: 1
    })
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
  const {user} = useAuthStore()
  
  const debouncedQUpdate = React.useMemo(()=>{
   return debounce((value: string | undefined)=>{
    setQueryParams((prev)=>({...prev, q: value, currentPage: 1}))
   }, 500)
  }, [])
  
  const {data: tenants,  isLoading, isError, error,} = useQuery({
      queryKey: ['tenants', queryParams],
      queryFn: ()=>{
        const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
        return getTenants(queryString).then((res)=> res.data)
      }
  }) 

  const {mutate: userMutate} = useMutation({
    mutationKey: ['tenant'],
    mutationFn: async(data: CreateTenant)=> createTenant(data).then((res)=> res.data),
    onSuccess: async ()=>{
      QueryClient.invalidateQueries({queryKey: ['tenants']})
      return
    }
  })
  const onHandlerSubmit = async()=>{
   await form.validateFields()
   await userMutate(form.getFieldsValue())
   form.resetFields()
   setDrawerOpen(false)
  }


    if (user?.role !== 'admin'){
     return <Navigate to='/' replace={true}/>
    }


    const onFilterChange = (changedFields: FieldData[])=>{
      const onChangedFields = changedFields.map((item)=>({
        [item.name[0]] : item.value
      })).reduce((acc, item)=> ({...acc, ...item}), {})
      if('q' in onChangedFields){
        debouncedQUpdate(onChangedFields.q)
      }else{
        setQueryParams((prev)=>({...prev, ...onChangedFields, currentPage: 1}))
      }
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


    <Form form={filterForm} onFieldsChange={onFilterChange}>
    <TenantsFilter>
        <Button type="primary" icon={<PlusOutlined/>}
        onClick={()=> setDrawerOpen(true)}>
        Add Restaurant
        </Button>
    </TenantsFilter>
    </Form>



    <Table 
    dataSource={tenants?.data}  
    columns={columns} 
    rowKey={'id'}
    pagination={{
      total: tenants?.total,
      pageSize: queryParams.perPage,
      current: queryParams.currentPage,
    onChange: (page)=>{
      setQueryParams((prev)=>{
        return{
          ...prev,
          currentPage: page
        }
      })
    },
    showTotal: (total: number, range: number[])=>{
    return `Showing ${range[0]}-${range[1]} of ${total} items`
    }
    }}/>

    <Drawer
     width={720} destroyOnHidden={true}
     title="Create Tenant"
     onClose={()=>{
         form.resetFields()
         setDrawerOpen(false)
          }
        }
        open={drawerOpen}
        extra={
        <Space>
        <Button onClick={()=>{
         form.resetFields()
        setDrawerOpen(false)}
        }>Cancel</Button>
        <Button type="primary" onClick={onHandlerSubmit}>Submit</Button>
      </Space>
      }>
      <Form layout="vertical" form={form}>
      <TenantForm/>
      </Form>
    </Drawer>
    </Space>         
    </>
  )
}

export default Tenants