import React, { Component } from 'react';
import {Grid, Container, TextField, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Image from '../img/fish.jpg';
import SearchResults from "./SearchResults";
import css from '../App.css';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            isResultsOpen: false
        };

    }

    handleBackButton = event => {
        console.log("Hiding search result page");
        this.setState({
            searchInput: ""
        });
    }

    handleSearchClick = event => {
        console.log("search button clicked!: " + this.state.searchInput);
        // render search results page
        this.setState({
            isResultsOpen: true
        });
    }

    hideResults = event => {
        this.setState({
            isResultsOpen: false
        });
    }

    onSearchChange = value => {
        this.setState({
            searchInput: value
        });
    }

    render() {
        return (
            <div id="homeAndSearchContainer">
                <div id="SearchResultsContainer">
                    { this.state.isResultsOpen ? <SearchResults searchinput={this.state.searchInput} hide={this.hideResults}/> : null }
                </div>
                <div id="homepage" style={{backgroundImage: `url(${Image})`, backgroundSize: "cover", padding:"0vh"}}>
                    <Container maxWidth="sm" style={{height: "100vh"}}>

                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '50vh' }}
                    >
                        <Grid item xs={10} style={{
                            marginTop: "25vh",
                            backgroundColor: "rgb(0,0,0, 0.4)",
                            padding: "10vh",
                            color: "white"
                        }}>
                            <h1>Find a Fish</h1>
                            <form noValidate autoComplete="off">
                                <TextField id="filled-size-small" size="small" variant="filled" label="Seafood Name"
                                    style = {{
                                        width: 250,
                                        backgroundColor: "rgb(255,255,255,0.6)",
                                        borderColor: "white"}}
                                    InputProps={{
                                        style: {
                                            color: "white"
                                        }
                                    }}
                                    value={this.state.searchInput} onChange={e => this.onSearchChange(e.target.value)}
                                />

                                <IconButton aria-label="search" onClick={this.handleSearchClick}>
                                    <SearchIcon style={{fill:"white"}}/>
                                </IconButton >
                            </form>
                        </Grid>
                    </Grid>
                    </Container>

                </div>
            </div>
        );
    }
}

export default Homepage;
