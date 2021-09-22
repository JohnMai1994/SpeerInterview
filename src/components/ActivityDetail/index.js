import React, {useState, useEffect} from "react";
import styled from "styled-components"
import user from "../../asserts/icons/user.png"
import mail from "../../asserts/icons/mail.png"
import phone from "../../asserts/icons/phone.png"
import video from "../../asserts/icons/video.png"
import message from "../../asserts/icons/message.png"
import back from "../../asserts/icons/back.png"
import axios from "axios";
import Moment from 'react-moment';
import {Link} from "react-router-dom";


const colorList = {
    "red": "#cf6a69",
    "grey": "#9aa0a6",
    "blue": "#0064fe"

}


const ActivityDetailStyle = styled.div`
    overflow: hidden;
    position: relative;
`

const BackButton = styled(Link)`
    position: absolute;
    top: 0;
    left: 15px;
    
    
    img {
      width: 20px;
      height: 20px;
      
    }
    


`

const AvatarStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;

`

const Avatar = styled.img`

    width: 60px;
    height: 60px;
`

const PhoneInfo = styled.div`
    text-align: center;
    font-weight: bolder;
    font-size: x-large;
    font-family: sans-serif;
    color: #4f4f4f;
    margin: 5px 0 20px;
    
    span {
      font-weight: lighter;
      font-size: small;
      color: #b0b0b0;
    
    }


`


const MediaTools = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
`

const MediaTool = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    


`

const PhoneDetail = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    
    height: 60px;    
    margin: 15px 20px;
    border-radius: 10px;
    border: 1px solid #afafaf;
    
    background: transparent;
    
    div {
        width: 50%;
        margin-left: 15px;
        line-height: 25px;
        font-weight: bold;
        font-size: large;
        color: #4f4f4f;
        
        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: medium;
            font-weight: normal;
        }
    }

`


const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 180px;    
    margin: 15px 20px;
    border-radius: 10px;
    border: 1px solid #afafaf;


`

const ButtonList = styled.div`
     width: 100%;
     height: 100%;
     margin: 0 15px;
     
     


`

const Button = styled.div`

     padding: 10px 0;
     border-bottom: 1px solid #afafaf;
     font-weight: bolder;
     cursor: ${({disable, danger}) => disable || danger ? "" : "pointer"};;
     color: ${({color}) => colorList[color]};
     


`


const ActivityDetail = (props) => {
    const query = props.location.query;
    const id = query.id;
    const url = `https://aircall-job.herokuapp.com/activities/${id}`;

    const [item, setItem] = useState({
        id: "",
        created_at: "",
        direction: "",
        from: "",
        to: "",
        via: "",
        duration: "",
        is_archived: false,
        call_type: "missed"
    })


    function archiveCall() {
        axios({
                method: "post",
                url: url,
                data: {
                    "is_archived": true
                }
            }
        ).then(result => {
            alert("Archive Success! ")

        }).catch(error => {
            alert("Something wrong on the backend Server")
        })
    }


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(result => setItem(result));
    }, [])


    return (<ActivityDetailStyle>
        <BackButton to={"/"}>
            <img src={back} alt=""/>
        </BackButton>

        <AvatarStyle>
            <Avatar src={user} alt="user"/>
        </AvatarStyle>
        <PhoneInfo>
            {item.direction === "outbound" ? item.to : item.from}
            <br/>
            <span>
                {item.direction === "outbound" ? item.from : item.to}
            </span>
        </PhoneInfo>

        <MediaTools>
            <MediaTool src={message}/>
            <MediaTool src={phone}/>
            <MediaTool src={video}/>
            <MediaTool src={mail}/>
        </MediaTools>

        <PhoneDetail>
            <div>
                <Moment date={item.created_at} format={"MMMM, DD YYYY"}/>
                <br/>
                <span>
                    <Moment date={item.created_at} format={"LT"}/>

                    {item.duration} mins

                </span>
            </div>
        </PhoneDetail>

        <Box>
            <ButtonList>
                <Button color={"blue"} onClick={archiveCall}>Add To Archived</Button>
                <Button color={"grey"} disable>Share Contact</Button>
                <Button color={"grey"} disable>Create New Contact</Button>
                <Button color={"grey"} disable>Add to Existing Contact</Button>
                <Button color={"red"} danger>Block this Caller</Button>

            </ButtonList>
        </Box>


    </ActivityDetailStyle>)

}

export default ActivityDetail;