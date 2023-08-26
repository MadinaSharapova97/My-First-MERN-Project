import { createGlobalStyle } from "styled-components";
import './fonts.css'

const GlobalStyle = createGlobalStyle`
     *{
        margin: 0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Poppins', sans-serif;
        
     }
     body{
        background-color: #edf3ff;
     }
    


`
export default GlobalStyle;