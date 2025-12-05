import React from "react";
import { Header } from "./Header";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Css/StudentProfile.css";
import image1 from "../Pictures/aboutus1.jpg"; 
import image2 from "../Pictures/aboutus2.jpg"; 

export default function AboutUs() {
    return (
        <>
            <Header />
            <div className="container my-5">
                <div className="column align-items-center">
                    <div className="col-md-6 d-flex flex-md-row gap-3 images">
                        <img src={image1} alt="Why section image 1" className="img-fluid rounded" />
                        <img src={image2} alt="Why section image 2" className="img-fluid rounded" />
                    </div>

                    <div className="mt-5 w-75">
                        <h2 className="fw-bold">About Us</h2>
                        <p className="lead">
                            We created this app to connect local businesses with talented interns 
                            who are eager to learn, grow, and make a real impact. Our mission is 
                            to make finding opportunities simple, accessible, and community focused.
                            Whether you’re a student looking for hands-on experience or a business 
                            seeking fresh ideas, we’re here to help both sides succeed. 
                            By supporting local talent and empowering small enterprises, 
                            we aim to build a stronger, more connected community internship at 
                            a time.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
