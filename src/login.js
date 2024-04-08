import  React,{Component} from 'react';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import './login.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

function Login()  
{
  const navigate = useNavigate();
  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post(`http://localhost:5000/login`, { email, paswd })
      .then((resp) => {
        console.log(resp.data)
        var name=resp.data['name'];
        sessionStorage.setItem("name",name);
        if(resp.status===200)
        {
          navigate('/Mybookshelf')

        }
      })
    }

  const [email, setEmail] = useState()
  const [paswd, setPassword] = useState()
 
  return (
    <div >
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
                </Toolbar>
              </Container>
            </AppBar>
    
    <Grid container spacing={0.5} >
        <Grid item xs={8} >
        <Card sx={{ maxWidth: "50" }}> 
        <CardMedia
            sx={{ height:700 }}
            image="/istockphoto.png"
            title="green iguana"
          />
        </Card>
        </Grid>
  <Grid item xs={12} sm={4} ms={4} >
    <Card sx={{ maxWidth: 500 }}> 
    <form action="" id="login" method="post" onSubmit={handleSubmit}>
    <div class="form-box">
    <div class="form-group">
    <label for="email">Email</label>
      <input class="form-control" id="email" type="email" name="Email" onChange={(e) => {setEmail(e.target.value) }}/>
    </div><br></br>
    <div class="form-group">
      <label for="email">Password</label>
      <input class="form-control" id="password" type="password" name="password" onChange={(e) => {setPassword(e.target.value) }}/>
    </div>
    <br></br>
    <input class="btn btn-danger" type="submit" value="Submit"/>
    </div>
    </form>
    </Card>
  </Grid>
</Grid>
</Container>
</div>
  )
  }

export default Login