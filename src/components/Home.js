/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {add} from  '../store/cartSlice'
import { increase } from '../store/cartCountSlice'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { 
        Input, Card, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, 
        CardBody, CardFooter, Menu, MenuButton, MenuItem, MenuList, RangeSlider,
        RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, 
        RangeSliderMark
       } from '@chakra-ui/react'

function Home() {
    const [products,setProducts]=useState([]) ;
    const [filteredProd, setFilter]=useState([]) ;
    const [pricesliderValue, setPriceSliderVal] = useState([0, 100]) ;
    const [ratingsliderValue, setRatingSliderVal] = useState([0, 100]) ;
    const [category,setCategory]=useState('All') ;
    const dispatch=useDispatch()

    // to fetch the data from api in side effects
    useEffect(()=>{
        (async function getproducts(){
            const apiData=await axios.get('https://dummyjson.com/products') ;
            const prods=apiData.data.products 
            setProducts([...prods])
            setFilter([...prods])
        }())
    },[])
    
    // to facilitate the filtering on basis of range, category and rating
    useEffect(()=>{
        const filtered=products.filter((obj)=>(
            obj.rating>=ratingsliderValue[0]/20 &&
            obj.rating<=ratingsliderValue[1]/20 &&
            obj.price>=pricesliderValue[0]*20 &&
            obj.price<=pricesliderValue[1]*20 &&
            (obj.category===category.toLowerCase() || category.toLowerCase()==='all')
        ))
        setFilter(filtered)
    },[pricesliderValue,ratingsliderValue,category])

    // to handle add to cart of product in redux store
    const handleAddtoCart=(prod)=>{
        dispatch(add(prod))
        dispatch(increase()) ;
    }
    
    // to facilitate the search by name functionality
    function searchByName(val){
          if(val===' '){
            setFilter([...products])
            return
          }
            const filter=products.filter((obj)=>{
                const name=obj.title.toLowerCase()
                return name.includes(val.toLowerCase()) ;
            })
            setFilter(filter)
    }

    //to facilitate category selection dropdown
    function categorySelect(e){
        const selectedCategory=e.target.getAttribute('value')
        setCategory(selectedCategory) ;
    }

  return (
    <div>
    <div className={styles.menu_wrapper}>
    <div className={styles.search_category_wrapper}>
    <Input variant='filled' placeholder='Search' onChange={(e)=>searchByName(e.target.value)}
         className={styles.input_search}
     />
    <Menu>
        <MenuButton as={Button} colorScheme='teal' style={{width:'300px', margin:'0px 10px 0px'}} rightIcon={<i className="fa-solid fa-chevron-down"></i>}>
            {category}
        </MenuButton>
        <MenuList onClick={categorySelect}>
            <MenuItem value='All'>All</MenuItem>
            <MenuItem value='Smartphones'>Smartphones</MenuItem>
            <MenuItem value='Laptops'>Laptops</MenuItem>
            <MenuItem value='Fragrances'>Fragrances</MenuItem>
            <MenuItem value='SkinCare'>SkinCare</MenuItem>
            <MenuItem value='Groceries'>Groceries</MenuItem>
            <MenuItem value='Home-Decoration'>Home-Decoration</MenuItem>
        </MenuList>
    </Menu>
    </div>
    <div className={styles.sliders_wrapper}>
    <div className={styles.slider}>
    <Text fontSize='xl' style={{marginRight:'10px'}}>Price (in Rs)</Text>
    <RangeSlider defaultValue={[0, 2000]} maxW='160px' onChange={(val) => setPriceSliderVal(val)}>
        <RangeSliderMark value={pricesliderValue[0]} fontSize='md'
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-8'
            ml='1'
            w='9'
            borderRadius='20px'
        >
         {pricesliderValue[0]*20}
        </RangeSliderMark>
        <RangeSliderMark value={pricesliderValue[1]} fontSize='md'
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-8'
            ml='-8'
            w='9'
            borderRadius='20px'
        >
         {pricesliderValue[1]*20}
        </RangeSliderMark>
        <RangeSliderTrack >
        <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
    </RangeSlider>
    </div>
    
    <div className={styles.slider}>
    <Text fontSize='xl' style={{marginRight:'10px'}}>Ratings (in<i className="fa-solid fa-star" style={{fontSize:'20px'}}></i>)</Text>
    <RangeSlider defaultValue={[0, 100]} maxW='150px' onChange={(val)=>{setRatingSliderVal(val)}}>
    <RangeSliderMark value={ratingsliderValue[0]} fontSize='md' 
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-8'
            ml='-1'
            w='9'
            borderRadius='20px'
        >
         {ratingsliderValue[0]/20}
        </RangeSliderMark>
        <RangeSliderMark value={ratingsliderValue[1]} fontSize='md' 
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-8'
            ml='-8'
            w='9'
            borderRadius='20px'
        >
         {ratingsliderValue[1]/20}
        </RangeSliderMark>
        <RangeSliderTrack >
        <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
    </RangeSlider>
    </div>
    </div>
    </div>
    <div className={styles.prod_con}>
        {
        filteredProd.map((obj,idx)=>(
            <Card  className={styles.prod_card} key={idx}>
                <CardBody>
                    <Image className={styles.card_img}
                    src={obj.images[0]} alt={obj.title}
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>{obj.title}</Heading>
                    <Text>
                        {obj.description}
                    </Text>
                    <div style={{display:'flex', 'justifyContent':'space-between'}}>
                    <Text color='blue.600' fontSize='2xl'>
                        Rs {obj.price}
                    </Text> 
                    <div style={{display:'flex', 'marginRight':'3px'}}>
                    <Text color='blue.600' fontSize='lg'>
                         {obj.rating}
                    </Text>
                    <i className="fa-solid fa-star" style={{'marginTop':'4px', 'marginLeft':'5px'}}></i>
                    </div>
                    </div>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue' onClick={()=>handleAddtoCart(obj)}>
                        Add to cart
                    </Button>
                    <Link to='/cart'>
                    <Button variant='ghost' colorScheme='blue' >
                        View Cart
                    </Button>
                    </Link>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        ))
        }
    </div>
    </div>
  )
}

export default Home