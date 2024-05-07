import { Navigate, } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
   

  return (
    <>
    <div className="mainunaceess">
        <center><h1>No Access to this module</h1></center>
        <center><img style={{width:"60%",height:"100%",marginBottom:"25px"}} src="https://www.areasafe.com.au/images/detailed/3/440OL.JPG" alt="img" /></center>
        <center><a style={{fontSize:"22px",color:"blue"}} href="/">Back to Home page</a></center>
    </div>
    </>
  )
}

export default Unauthorized