import React, { Component } from 'react';
import {Grid, Container, TextField, Button, withStyles } from '@material-ui/core';
import css from '../App.css';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 500,
    }
    },
});

class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {classes} = this.props;

        return (
            <Container maxWidth="sm" style={{height: "100vh"}}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}
                >
                    <Grid item style={{
                        marginTop: "5vh",
                        backgroundColor: "#fff",
                        boxShadow: "5px 5px #000",
                        padding: "6vh",
                        color: "black"
                    }}>
                        <h1>Contact Us</h1>
                        <form className={classes.root} noValidate autoComplete="off">
                          <TextField className='field' required id="standard-basic" label="Full name" />
                          <TextField className='field' required id="standard-basic" label="E-mail" />
                          <TextField className='field' required id="standard-basic" label="Favorite fish" />
                          <TextField className='field' required multiline rows="4" rowsMax="10" id="standard-basic" label="Questions/comments" />
                          <Button variant="contained">Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withStyles(useStyles)(ContactUs);
