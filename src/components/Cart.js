import React, { useEffect,useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import {add,remove} from  '../store/cartSlice'
import { increase,decrease } from '../store/cartCountSlice'
import { useAuth0 } from "@auth0/auth0-react";
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer, NumberInput, NumberIncrementStepper,
     NumberDecrementStepper, Text, NumberInputStepper,Button, useToast
        } from '@chakra-ui/react'

    function Cart() {
        const cartProds=useSelector((state)=>state.cart.cart) 
        const [totalCost,setTotalCost]=useState(0) ;
        const {isAuthenticated} =useAuth0()
        const navigate=useNavigate()
        const dispatch=useDispatch()
        const toast=useToast()

        //to calculate total cost of cart
        useEffect(()=>{
                const totalcost=cartProds.reduce((accumulator,obj)=>
                                (accumulator+obj.price*obj.quantity),0)
                setTotalCost(totalcost) ;

        },[cartProds])

        // to increase the quantity counter
        function incQuan(prod){
            dispatch(add(prod))
            dispatch(increase())
        }

        // to decrease the quantity counter
        function decQuan(prod){
            dispatch(remove(prod)) ;
            dispatch(decrease()) ;
        }
        if(cartProds.length===0) return (
                                    <h1 style={{fontSize:'7vw' ,textAlign:'center',fontWeight:'bold',marginTop:'10vh'}}> Cart is empty...</h1>
                                )
        return (
            <div>
                <TableContainer>
                    <Table variant='simple'  style={{width:'60vw',margin:'auto' }}>
                        <Thead>
                            <Tr>
                                <Th>Product</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Total</Th>
                            </Tr>
                        </Thead>   
                        {
                            cartProds.map((obj,idx)=>(
                                <Tbody key={idx}>  
                                    { obj!==undefined &&
                                            <Tr>
                                                <Td>
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                    <img src={obj.images[0]} alt='' style={{width:'100px'}}></img> 
                                                    <div style={{marginLeft:'20px'}}>{obj.title}</div>
                                                    </div>
                                                </Td>
                                                <Td>Rs {obj.price}</Td>
                                                <Td >
                                                    <NumberInput size='sm' defaultValue={obj.quantity} >
                                                        {obj.quantity}
                                                        <NumberInputStepper>
                                                        <NumberIncrementStepper onClick={()=>{incQuan(obj)}} />
                                                        <NumberDecrementStepper onClick={()=>{decQuan(obj)}}/>
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Td>

                                                <Td >Rs {obj.quantity * obj.price}</Td>
                                            </Tr>
                                    }

                                </Tbody>
                            ))
                        } 
                        <Tr >
                            <Text as='b' fontSize='2xl' style={{marginLeft:'10px'}}> Subtotal-  Rs {totalCost}</Text>
                            <Text style={{marginLeft:'10px'}} >Taxes and Shipping Calculated at Checkout</Text>
                            <Button colorScheme='blue' style={{margin:'10px 0px 10px 10px'}} 
                                        onClick={()=>{
                                            if(isAuthenticated) navigate('/checkout') ;
                                            else{
                                                toast({
                                                    title: 'User Not Logged In',
                                                    description: "Please Log In before checkout",
                                                    status: 'error',
                                                    duration: 3000,
                                                    isClosable: true,
                                                })
                                            }
                                    }}>Checkout
                            </Button>
                            <Link to='/'><Text fontSize='xl' style={{marginLeft:'10px'}} ><i className="fa-solid fa-arrow-left-long"></i> Continue shopping</Text></Link>
                        </Tr>
                    </Table>
                </TableContainer>
            </div>
        )
    }

export default Cart