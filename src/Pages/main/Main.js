import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Main() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    let { userData } = userLogin;

    useEffect(()=>{
        if(localStorage.getItem('userData')){
            userData=JSON.parse(localStorage.getItem('userData'));
        }else{
            navigate("/auth/login")
        }
    })

    return (
        <Header />
    )
}
