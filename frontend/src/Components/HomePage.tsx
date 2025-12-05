import { Link, Navigate, useNavigate } from "react-router-dom";
import '../Css/StudentProfile.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Header } from "./Header";


export default function HomePage(){
    const navigate = useNavigate();
    function findJob() {
        navigate('/FindJob');
    }
    return(
        <>
            <Header/>
            <div className='homepage d-flex-column justify-content-center align-items-center'>
                <div className="hero_section pt-5">
                    <div className="container home">
                        <div className="row pt-md-5">
                            <div className="d-grid gap-5 pt-5 px-5">
                                <div>
                                    <h1 className='pt-md-5 px-md-5'>Every beginner deserves a great opportunity</h1>
                                    <h1 className="pink_text px-md-5">Find the perfect job in the first step of your career</h1>
                                </div>
                                <h5 className="text px-md-5"></h5>
                                <button
                                        type="button"
                                        className="see_the_recipe text-center"  
                                        onClick={()=>findJob()}
                                    >
                                        Find Job
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}