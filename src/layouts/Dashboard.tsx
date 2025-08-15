import { Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Icon, { BellFilled } from "@ant-design/icons"
import { useState } from "react"
import Logo from "../components/icons/Logo"
import Home from "../components/icons/Home"
import Product from "../components/icons/Product"
import { foodIcon } from "../components/icons/FoodIcon"
import UserIcon from "../components/icons/UserIcon"
import GiftIcon from "../components/icons/GiftIcon"
import {useLogoutUser} from '../../hooks/useLogoutUser'
const getMenuItems = (role: string)=>{
   const baseItems = [
      {
    key: '/',
    icon: <Icon component={Home}/>,
    label: <NavLink to='/'>Home</NavLink>
  },
  {
    key: '/restaurants',
    icon: <Icon component={foodIcon}/>,
    label: <NavLink to='/restaurants'>Restaurants</NavLink>
  },
  {
    key: '/products',
    icon: <Icon component={Product}/>,
    label: <NavLink to='/products'>Products</NavLink>
  },
  {
    key: '/promos',
    icon: <Icon component={GiftIcon}/>,
    label: <NavLink to='/promos'>Promos</NavLink>
  },
   ] 
   if(role === 'admin'){
    const menus = [...baseItems]
    menus.splice(1,0, {
    key: '/users',
    icon: <Icon component={UserIcon}/>,
    label: <NavLink to='/users'>Users</NavLink>
    })
    return menus
   }
   return baseItems
  }
  
  
  
  
  const Dashboard = () => { 
 const { _logout} = useLogoutUser()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {user} = useAuthStore()
  if(user === null){
    return <Navigate to='/auth/login' replace={true}/>
  }
  const items = getMenuItems(user.role)
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" ><Logo /></div>

        <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: '16px', paddingRight: '16px', background: colorBgContainer }}>
      <Flex gap="middle" align="start" justify="space-between">
        <Badge text={
          user.role === 'admin' ? 'You are an admin' : user.tenant?.name
        } status="success"/>
        <Space size={16}>
          <Badge dot={true}>
            <BellFilled/>
          </Badge>
              <Dropdown menu={{ items:[
                {
                  key: 'logout',
                  label: 'Logout',
                  onClick: ()=>  _logout(),
                }
              ] }} placement="bottomRight" arrow>
                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>

              </Dropdown>
        </Space>
    </Flex>

    </Header>
        <Content style={{ margin: '24px' }}>
                 <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        Mernspace pizza shop
        </Footer>
      </Layout>
    </Layout>

    </div>  
  )
}

export default Dashboard