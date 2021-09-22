import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Moment from 'react-moment';
import inbound from "../../asserts/icons/inbound.png"
import outbound from "../../asserts/icons/outbound.png"
import Footer from "../Footer";
import {Link} from "react-router-dom";

const ActivityFeedStyle = styled.div`
      overflow: hidden;

`

const Date = styled.div`
    text-align: center;
    margin: 10px 0;
    position: relative;
    
    color: #c5c5c4;
    font-weight: bolder;
    text-transform: uppercase;
    
    
    :before {
        content: "";
        position: absolute;
        top: 5px;
        left: -20px;
        border: 1px dashed #e1e1e1;
        width: 130px;
    }
    
    :after {
        content: "";
        position: absolute;
        top: 5px;
        right: -20px;
        border: 1px dashed #e1e1e1;
        width: 130px;
    
    }

`

const Feed = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;


    width: 330px;
    height: 60px;
    border: 1px solid #e9e9e8;
    border-radius: 12px;
    margin: 10px 0;
    
    :hover {
       
    
    }


`

// inBound or outBound
const BoundIcon = styled.img`


    position: absolute;
    top: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
`

// from & to
const PhoneInfo = styled.div`
      position: absolute;
      top: 10px;
      left: 55px;
      

      font-weight: bolder;
      font-size: large;
      font-family: sans-serif;
      color: #727272;
      overflow: hidden;      
      padding: 0 5px;
      
      span{
          font-weight: normal;
          font-size: xx-small;
          color: #afafaf;
      
      
      }


`

// call time
const PhoneTime = styled.div`
    position: absolute;
    top: 20px;
    right: 5px;
    width: 60px;
    font-weight: bolder;
    color: #afafaf;
    padding-left: 10px;
    border-left: 3px dotted #afafaf;


`

const ActivityFeed = () => {

    const url = "https://aircall-job.herokuapp.com/activities"
    const [list, setList] = useState([]);
    let dates = [];




    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(result => setList(result));

    }, [])

    return <ActivityFeedStyle>

        {
            list
                .filter((item) => {
                    return !item.is_archived;
                })
                .map((item) => {
                    const time = item.created_at;
                    const date = time.substr(0, 10);

                    return (
                        <div>
                            {
                                (() => {
                                    if (!dates.includes(date)) {
                                        dates.push(date);
                                        return (
                                            <Date>
                                                <Moment date={item.created_at} format={"MMMM, DD YYYY"}/>
                                            </Date>
                                        )
                                    }
                                })()

                            }

                            <Link to={{pathname: "/detail", query: {id: item.id}}}>
                                <Feed>
                                    <BoundIcon src={item.direction === "inbound" ? inbound : outbound} alt={"inbound"}/>
                                    <PhoneInfo>
                                        {item.direction === "inbound" ? item.from : item.to}
                                        <br/>

                                        <span>
                                    tried to call on {item.direction === "inbound" ? item.to : item.from}
                                </span>

                                    </PhoneInfo>
                                    <PhoneTime>
                                        <Moment date={item.created_at} format={"LT"}/>
                                    </PhoneTime>
                                </Feed>
                            </Link>

                        </div>
                    )
                })


        }
        <Footer/>
    </ActivityFeedStyle>

}

export default ActivityFeed;