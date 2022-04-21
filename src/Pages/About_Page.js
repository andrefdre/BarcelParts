import React from "react";


function About_Page() {

    return (
        <React.Fragment>
            {/* <!-- Main Content of the Webpage --> */}
            {/* <!-- Items that will not be displayed with all width of the Page --> */}
            <div className="container-md">
                <br></br>
                <h2>Store of Cars Parts</h2>
                <hr className="break-line"></hr>
                <div className="row">
                    <div className="col-6 h-100">
                        <p>
                            Barcelparts is a store that belong to the Group Trust and sells car parts, it's motto is:
                            <br></br>
                            A different way of doing business - Quality, Independence, Trust, Innovation our DNA
                        </p>

                        <p>
                            Address: Av. Alcaides de Faria, 4750-106 Arcozelo, Portugal
                            <br></br>
                            Phone number: +351 253 142 643
                            <br></br>
                            Working time:
                            <ul>
                                <li>Monday to Friday: 09:00–13:00, 14:00–19:00</li>
                                <li>Saturday: 09:00–13:00</li>
                                <li>Sunday: Closed</li>
                            </ul>
                        </p>
                    </div>
                    <div className="col-6">
                        <svg className="bd-placeholder-img" width="100%" height="400px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            preserveAspectRatio="xMidYMid meet" focusable="false">
                            <image width="100%" xlinkHref="./Assets/Images/outside_frontstore.png" x="0" y="0" />
                        </svg>
                    </div>
                </div>
                <hr className="break-line"></hr>
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-6">
                    <svg className="bd-placeholder-img" width="100%" height="400px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            preserveAspectRatio="xMidYMid meet" focusable="false">
                            <image width="100%" xlinkHref="./Assets/Images/insidestore.svg" x="0" y="0" />
                        </svg>
                    </div>
                    <div className="col-5 d-flex">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.5255358040135!2d-8.612765484569596!3d41.53621707925083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24530465e45c5b%3A0xb21c57b050c53689!2sBarcelParts%20-%20Pe%C3%A7as%20e%20acess%C3%B3rios%20para%20autom%C3%B3veis!5e0!3m2!1spt-PT!2spl!4v1650558610448!5m2!1spt-PT!2spl"
                            width="400" height="300" style={{ 'border': '0', 'margin-top': '20px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </div>
                <div className="d-flex justify-content-center">

                </div>

            </div>
        </React.Fragment>
    )

}

export default About_Page;