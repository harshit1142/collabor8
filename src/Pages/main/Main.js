import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "../../Components/TeamCard";
import { CgChevronDown } from "react-icons/cg";
import { getAllTeam } from "../../action/userAction";



export default function Main() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;
    const teams = useSelector((state) => state.getTeam);
    var { team ,loading} = teams;

    useEffect(()=>{
        if(localStorage.getItem('userData')){
            userData=JSON.parse(localStorage.getItem('userData'));
        }else{
            navigate("/auth/login")
        }
    },[userData,dispatch])

    useEffect(()=>{
     if(userData){
        dispatch(getAllTeam(userData._id))
     }
    },[userData,dispatch])
    
  

    return (
        <>
        <Header />
        <div className="my-4">
                <h4 className="ms-3">Team Joined <CgChevronDown /></h4>
            <div className="d-flex flex-row flex-wrap">
           {team && team.map((team,ind)=>
           <TeamCard team={team} key={ind}/>
           )}

            </div>
        </div>

        </>
    )
}
