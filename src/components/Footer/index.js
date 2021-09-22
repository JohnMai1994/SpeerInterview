import React from "react";
import styled from "styled-components";
import bookLine from "../../asserts/icons/address book-line.png"
import listLine from "../../asserts/icons/address list-line.png"
import setLine from "../../asserts/icons/set-line.png"
import userLine from "../../asserts/icons/user -line.png"
import pot from "../../asserts/icons/pot.png"


const FooterStyle = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #f3f3f2;
    background: #fff;
    
    display: flex;
    justify-content: space-around;
    align-items: center;


`

const Component = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
`



const IconStyle = styled.div`

    cursor: pointer;
    position: relative;
    
    
    :before{
        position: absolute;
        content: "";
        bottom: -5px;
        left: 7px;
        width: 30px;
        border: 2px solid #43be21 ;
        border-radius: 20px;
        opacity: 0;
        transition: 0.5s ease;
    }
    
    
    img{
      width: 30px;
      height: 30px;
      border: none;
      margin: 0 10px;
      filter: invert(52%) sepia(33%) saturate(29%)  brightness(111%) contrast(133%);
      
    }
    
    :hover{
          
          img {
              filter: brightness(0);

          }  
          
          :before{
              opacity: 1;
              box-shadow: 0 0 5px #43be21, 0 0 10px #43be21,0 0 25px #43be21;
            
          }
      
    }
    
    

`

const CallComponent = styled.div`
      position: absolute;
      top: -30px;
      left: 155px;
      width: 70px;
      height: 70px;
      border: 1px solid #f3f3f2;
      border-radius: 50%;
      background: #fefefe;
      
      display: flex;
      align-items: center;
      justify-content: center;
      
      
      img {
          width: 75px;
          height: 75px;
      }
      

`






const Footer = () => {

    return <FooterStyle>
        {/*Left*/}
        <Component>
            <IconStyle active>
                <img src={listLine} alt="listLine"/>
            </IconStyle>

            <IconStyle>
                <img src={bookLine} alt="bookLine"/>
            </IconStyle>

        </Component>

        {/*Center*/}

        <CallComponent>
            <img src={pot} alt="pot"/>


        </CallComponent>



        {/*Right*/}
        <Component>
            <IconStyle>
                <img src={setLine} alt="setLine"/>
            </IconStyle>

            <IconStyle>
                <img src={userLine} alt="userLine"/>
            </IconStyle>
        </Component>

    </FooterStyle>

}

export default Footer