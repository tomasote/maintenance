import React,{Component} from "react";
import {Link,  Box} from "@mui/material";
import { componentDidMount } from "./utils";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
      }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });
      }
    render() {
    return (
            <div className={"welcome"}>
                <h2 className="header">Welcome to NotSquare</h2>
                <nav>
                    <Link href='/login' className="nav-link">
                        <Box textAlign="center">
                    <button className="buttons" variant="contained">
                        Proceed
                    </button>
                        </Box>
                        </Link>
                </nav>
            </div>
        );}
}

export default Home;