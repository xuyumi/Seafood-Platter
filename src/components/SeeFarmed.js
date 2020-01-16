import React, { Component } from 'react';
import FishListing from './FishListing'
import css from '../App.css'

const CORSDevBypass = 'https://cors-anywhere.herokuapp.com/';

export default class SeeFarmed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currLoadedData: [],
            iter: 0,
            isLoading: true
        };

        // this.scroll = this.scroll.bind(this);
    }

    // sort alphabetically by name
    sortByName(arr) {
        arr.sort(function(a, b) {
          return a["Species Name"].localeCompare(b["Species Name"]);
        });
    }

    

    componentDidMount() {
        let self = this;
        // detect that user has scrolled to the bottom
        // window.addEventListener('scroll', this.scroll, false);

        // Make API call to fetch all data.
        fetch(CORSDevBypass + 'https://www.fishwatch.gov/api/species/',
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
            
            data = data.filter(function(d) {
                return d["Harvest Type"] === "Farmed";
            } );
            for (let i = 0; i < data.length; i ++) {
                if (!data[i]["Image Gallery"] ) {
                    data[i]["Image Gallery"] = [];
                }
                else if (data[i]["Image Gallery"].length === 1) {
                    let stupidAPIDesign = [];
                    stupidAPIDesign.push(data[i]["Image Gallery"]);
                    data[i]["Image Gallery"] = stupidAPIDesign;
                }
            }
            self.sortByName(data);
            console.log(data);
            self.setState({
                currLoadedData: data,
                isLoading: false
            });
            
            
            

        })
        .catch (function(error) {
            console.log('Error:', error);
        });
    }

    componentWillUnmount() {
        // prevent memory leak
        // window.removeEventListener('scroll', this.scroll, false);

    }

    render() {
        return (
            <div className="seeAllPage" >
                <h1>Farmed</h1>
                {this.state.isLoading ? <div id="loadContainer"><div className="lds-dual-ring"></div></div>: null}
                <div className="grid">
                    {this.state.currLoadedData.map((data) =>
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
