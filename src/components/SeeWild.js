import React, { Component } from 'react';
import FishListing from './FishListing'
import css from '../App.css'

const CORSDevBypass = 'https://cors-anywhere.herokuapp.com/';

export default class SeeWild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currLoadedData: [],
            iter: 0,
            isLoading: true
        };

        this.scroll = this.scroll.bind(this);
    }

    // sort alphabetically by name
    sortByName(arr) {
        arr.sort(function(a, b) {
          return a["Species Name"].localeCompare(b["Species Name"]);
        });
    }

    // load next num entries from data and combine with what is already loaded
    loadNext(num) {
        console.log("Loading next " + num + " listings");

        let next20 = [];
        let newIter = this.state.iter + num; // move marker
        for (let i = this.state.iter ; i < newIter; i++) {
            var check = this.state.data[i];
            if (typeof check !== 'undefined') {
                if (!check["Image Gallery"] ) {
                    check["Image Gallery"] = [];
                }
                else if (check["Image Gallery"].length === 1) {
                    let stupidAPIDesign = [];
                    stupidAPIDesign.push(check["Image Gallery"]);
                    check["Image Gallery"] = stupidAPIDesign;
                }
                next20.push(check);
            }
        }
        
        // concat with old listings
        let copy = this.state.currLoadedData.slice(0);

        let final = [...copy, ...next20];
        // console.log(final);

        this.setState({
            iter: newIter,
            currLoadedData: final
        });

    }

    scroll() {
        let self = this;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            // make fetch request to api
            self.loadNext(20);
         }
    }

    componentDidMount() {
        let self = this;
        // detect that user has scrolled to the bottom
        window.addEventListener('scroll', this.scroll, false);

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
            console.log(data);
            data = data.filter(function(d) {
                return d["Harvest Type"] === "Wild";
            } );
            self.sortByName(data);
            
            self.setState({
                data: data,
                isLoading: false
            });
            self.loadNext(20);
            

        })
        .catch (function(error) {
            console.log('Error:', error);
        });
    }

    componentWillUnmount() {
        // prevent memory leak
        window.removeEventListener('scroll', this.scroll, false);

    }

    render() {
        return (
            <div className="seeAllPage" >
                <h1>Wild</h1>
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
