import React, { Component } from 'react';
import FishListing from './FishListing'
import {Button} from '@material-ui/core';
import css from '../App.css'

const CORSDevBypass = 'https://cors-anywhere.herokuapp.com/';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            results: [],
        };
    }

    // sort alphabetically by name
    sortByName(arr) {
        arr.sort(function(a, b) {
          return a["Species Name"].localeCompare(b["Species Name"]);
        });
    }

    search(searchInput) {
        console.log(searchInput);
        searchInput = searchInput.toLowerCase();
        // find all data listings with search input a substring in name
        let foundListings = this.state.data.filter(obj => {
            return obj["Species Name"].toLowerCase().indexOf(searchInput) !== -1;
        });
        console.log(foundListings);
        let final = [];
        for (let i = 0 ; i < foundListings.length; i++) {
            var check = foundListings[i];
            if (typeof check !== 'undefined') {
                if (foundListings[i]["Harvest Type"] === "Farmed") {
                    let farmed = foundListings[i];
                    farmed["Species Name"] += " (Farmed)";
                    final.push(farmed);
                } else {
                    final.push(foundListings[i]);
                }
            }
        }
        this.setState({
            results: final
        });

    }

    handleBack = event => {
        console.log("Back button pressed");
        this.props.hide(event);
    }

    componentWillMount() {
        let self = this;

        // Make API call to fetch all data once. It's bad, yeah.
        fetch(CORSDevBypass + 'https://www.fishwatch.gov/api/species/' ,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "localhost",
                "Access-control-allow-credentials": "true",
            }

        })
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            self.sortByName(data);
            self.setState({
                data: data,
            });
            // actually do the search (bleh)
            self.search(self.props.searchinput);
        })
        .catch (function(error) {
            console.log('Error:', error);
        });
    }

    render() {
        return (
            <div id="searchResultsPage" searchinput={this.props.searchinput}>
                <h1>Search Results: {'"'+ this.props.searchinput + '"'}</h1>
                <Button variant="outlined" color="primary" onClick={this.handleBack} >Back</Button>
                {(this.state.results.length == 0) ? <div><br/><br/><h2>No Results</h2></div> : null}
                <div className="grid">
                    {this.state.results.map((data) =>
                    <FishListing
                        key={data["Species Name"]}
                        name={data["Species Name"]}
                        illustration={data["Species Illustration Photo"].src}
                        sciname={data["Scientific Name"]}
                        availability={data["Availability"]}
                        images={data["Image Gallery"]}
                        data={data}
                    />
                    )}
                </div>
            </div>
        );
    }
}
