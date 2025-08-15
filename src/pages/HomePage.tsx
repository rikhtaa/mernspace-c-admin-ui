import { Avatar,  Button,  Card,  Col,  Flex, Row, Space, Statistic,Typography } from "antd"
import { useAuthStore } from "../../store"
import TotalOrdersIcon from "../components/icons/TotalOrdersIcon"
import TotalSaleIcon from "../components/icons/TotalSaleIcon"
import { Header } from "antd/es/layout/layout"
import { Link } from "react-router-dom"
import BasketIcon from "../components/icons/BasketIcon"
import Icon from "@ant-design/icons";
import type { ComponentType } from "react";
const { Title} = Typography

interface CardTitleProp {
  title: string
  prefixIcon: ComponentType<unknown>
 }
 const CardTitle = ({title, prefixIcon}: CardTitleProp)=>{
  return (
  <Space>
    <Icon component={prefixIcon}/>
    <Title style={{fontSize: '18px', fontWeight: "500"}}>{title}</Title>
  </Space>
  )
 }
function HomePage() {
  const chartData = [
    {OrderSummary: "Rakesh Kohali",
    address: "main street, bandra",
    amount: '₹ 125',
    status: 'Preparing',
  },
    {OrderSummary: "John Doe",
    address: "side street, bandra",
    amount: '₹ 900',
    status: 'On the way',
  },
    {OrderSummary: "John Doe",
    address: "side street, bandra",
    amount: '₹ 900',
    status: 'On the way',
  },
    {OrderSummary: "John Doe",
    address: "side street, bandra",
    amount: '₹ 900',
    status: 'On the way',
  },
    {OrderSummary: "John Doe",
    address: "side street, bandra",
    amount: '₹ 900',
    status: 'On the way',
  },
]
  const {user} = useAuthStore()
  return (
    <div>
    <Title level={4}>Welcome, {user?.firstName}😁</Title>
    <Flex gap={7}>
    <Flex gap="small" vertical style={{ flexWrap:'wrap'}}>
        <Space>
         <Card
           size={'small'}
           style={{ width: 250}}
          >
            <Statistic        
            title={
              <Space style={{alignItems: 'start'}}>
                <Icon component={TotalOrdersIcon} /> 
                <span style={{fontWeight: "500", lineHeight: '0px' }}>Total orders</span>
              </Space>
            }
            value={28}
            valueStyle={{paddingLeft: '45px', fontSize: "35px", fontWeight: "500"}}
            />
         </Card>
          <Card
           size={'small'}
           style={{ width: 250}}
          >
             <Statistic        
            title={
              <Space style={{alignItems: 'start'}}>
                <Icon component={TotalSaleIcon} /> 
                <span style={{fontWeight: "500", lineHeight: '0px' }}>Total sale</span>
              </Space>
            }
            value={'50000'}
            prefix={'$'}
            valueStyle={{paddingLeft: '45px', fontSize: "35px", fontWeight: "500"}}
            />
       </Card>
        </Space>
    <Card 
     size={"small"}
     style={{width: 510}}
    >
      <Header style={{ padding: '3px',  background: "white" }}>
       <Flex gap="middle" align="start" justify="space-between" style={{lineHeight: '0px'}}>
        <CardTitle
        prefixIcon={TotalSaleIcon}
        title="Sales"
        />
         <Space
          style={{lineHeight: '0px'}}
         >
          <Flex gap={'small'}>
            <Avatar style={{color: 'black' }}>W</Avatar>
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>M</Avatar>
            <Avatar style={{color: 'black' }}>Y</Avatar>
          </Flex>
         </Space>
       </Flex>
     </Header>
    </Card>
    </Flex>
    <Card style={{width: '511px'}}>
          <CardTitle
          prefixIcon={BasketIcon}
          title={'Recent Orders'}
          />
      <Space  direction="vertical" style={{width: '100%'}}>
        {
          chartData.map(({OrderSummary, address, amount, status}, i )=>(
    <Row  style={{background: 'white', alignItems: 'center'}} key={i}>
      <Col span={16}>
        <Col  style={{fontSize: '14px', fontWeight: '600'}}><a href="https://ant.design">{OrderSummary}</a></Col>
        <Col>{address}</Col>
      </Col>
      <Col span={3} style={{fontSize: '14px', fontWeight: '700'}}>
      {amount}
      </Col>
      <Col span={2}>
      <Button color="primary" variant="filled">{status}</Button>
      </Col>
    </Row>
          ))
        }
      </Space>
        <div style={{ marginTop: 20 }}>
            <Button type="link" style={{padding: '0px'}}>
                <Link to="/orders">See all orders</Link>
            </Button>
          </div>
    </Card>
    </Flex>

    
    </div>
  )
}

export default HomePage
