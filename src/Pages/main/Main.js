import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "../../Components/TeamCard";
import { CgChevronDown } from "react-icons/cg";



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
        <>
        <Header />
        <div className="my-4">
                <h4 className="ms-3">Team Joined <CgChevronDown /></h4>
            <div className="d-flex flex-row flex-wrap">
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />

            </div>
        </div>

        </>
    )
}
