import { Card, Input, Space } from "antd"

// React.ReactNode it means any renderable content in React.
type TenantFilterProps = {
  children: React.ReactNode
  onFilterChange: (filterName: string, filterValue: string)=> void
} 
const TenantsFilter = ({children,onFilterChange}: TenantFilterProps) => {
  return (
       <Card>
           <Space  style={{justifyContent: "space-between", width: '100%'}} direction="horizontal" size={'large'}>
            <Input.Search  allowClear={true} placeholder="Search" onChange={(e)=>onFilterChange('SearchFilter', e.target.value) }/>
            {children}
           </Space>
       </Card>
  )
}

export default TenantsFilter