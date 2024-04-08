
import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PreviewIcon from '@mui/icons-material/Preview';
import InfoIcon from '@mui/icons-material/Info';
import CardHeader from '@mui/material/CardHeader';
import Link from '@material-ui/core/Link';
import Stack from '@mui/material/Stack';
import {CardActions} from '@mui/material';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    
  },
  marginLeft: 0,
  width: '100%',
 
  
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function MyBookshelf (  ) {
    const [data, setData] = useState({items: []});
    const [searchTerm, setSearchTerm] = useState('Flower');
   
    const navigate = useNavigate();
    useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40&printsec=frontcover&img=1&zoom=10&key=AIzaSyDVqOWoSU3UhbVb5GOzhUH51I5Q_EDA74A `)
    .then(response => response.json())
    .then(result => setData(result));
    console.log(data)
  },[searchTerm])

  
  
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
  const logout=(e)=>{
    sessionStorage.clear();
    navigate('/Home')
  }

  
    return (
      <div style={{ height: 350, width: '100%' }}>
        <Container maxWidth={false} disableGutters>
        <AppBar position="sticky" sx={{ bgcolor: "crimson"}}>
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box
                    component="img"
                    sx={{
                    height: 70,
                    borderRadius:50
                    
                    }}
                    alt="Your logo."
                    src="/bookicon.png"
                />
                 <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/home"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
            UniBooks
          </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>  
                  </Box>
                  <Search>
        <SearchIconWrapper>
        <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
            onChange={onInputChange}
        />
        </Search>
        <Badge badgeContent={sessionStorage.getItem('name')} color="primary">
        <IconButton  onClick={logout} sx={{ p: 0 }}>
        <LogoutIcon></LogoutIcon>
      </IconButton>
      </Badge>
      </Toolbar>
      </Container>
      </AppBar>
          <Grid container spacing={3} style={{marginTop:"20px"}}>
            {
              data.items.map((result,index)=>(
                
                <Grid item xs={12} sm={4} ms={4} key={index} >
                  <Card sx={{ maxWidth: 500 }}>
                  <CardHeader 
                 title={
                  <Typography gutterBottom noWrap variant="body1"  component="h2">
                    {result.volumeInfo.title}
                  </Typography> 
                 }
                 style={{textAlign:"center",backgroundColor:"rgb(245, 142, 104)"}}
                 />     
                  <CardMedia
                    sx={{ height: 350}}
                    image= {`http://books.google.com/books/content?id=${result.id}&printsec=frontcover&img=1&zoom=1&edge=curl`}
                    title={result.volumeInfo.title}
                    
                  />
                  <CardContent  style={{textAlign:"center"}}>
                  <Typography gutterBottom noWrap variant="body2"  inline  >
                  {result.volumeInfo.authors}
                  </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions >
                    <Stack direction="row" spacing={4} >
                        <Link href={result.volumeInfo.infoLink}  target="_blank" >
                        <InfoIcon ></InfoIcon>
                        </Link>
                        <Link href={result.volumeInfo.previewLink}  target="_blank" >
                        <PreviewIcon ></PreviewIcon>
                        </Link>
                        <Link href={result.saleInfo.buyLink}  target="_blank" >
                        <ShoppingCartIcon ></ShoppingCartIcon>
                        </Link>
                        <Typography gutterBottom noWrap variant="body2" component="div" textAlign={"unset"} >
                       {result.volumeInfo.publisher}
                        </Typography>
                       
                    </Stack>
                </CardActions> 
                </Card>
               
                </Grid>
                  )
                  )
                  }
          
          </Grid>
         
          
          
          </Container>
          
          
          </div>   
          
                 )
                }

export default MyBookshelf;