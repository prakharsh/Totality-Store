/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState}from 'react'
import { Card, CardBody,Heading, Table, TableContainer, Tr, Td, Tbody } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
function OrderSummary() {
    const order=useSelector(state=>state.cart.cart)
    const itemCount=useSelector(state=>state.count)
    const [totalCost,setCost]=useState(0) ;
    
    // to calculate total cost of cart
    useEffect(()=>{
        const totalcost=order.reduce((accumulator,obj)=>
                        (accumulator+obj.price*obj.quantity),0)
        setCost(totalcost) ;
    },[itemCount])
    
  return (
    
    <Card style={{ margin:'auto',marginTop:'20px'}} maxWidth={800} shadow="1px 1px 3px rgba(0,0,0,0.3)">
      <CardBody style={{textAlign:'center'}}>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
          Order Summary
        </Heading>
        <TableContainer>
          <Table variant='simple'>
            <Tbody style={{fontWeight:'500'}}>
              <Tr>
                <Td>SubTotal-</Td>
                <Td>Rs {totalCost}</Td>
              </Tr>
              <Tr>
                <Td>Taxes and Shipping Fee-</Td>
                <Td>Rs 100</Td>
              </Tr>
              <Tr>
                <Td>Discount(5%)-</Td>
                <Td>Rs {totalCost/20}</Td>
              </Tr>
              <Tr>
                <Td>Amount to Pay- </Td>
                <Td>Rs {totalCost- totalCost/20 + 100}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default OrderSummary