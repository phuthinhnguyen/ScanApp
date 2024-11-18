import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from 'react-helmet';

function Slideshow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  if (state.user == null) {
    navigate("/")
  }
  useEffect(() => {
    // dispatch(getItem());
    // dispatch(getallusersforposts());
    
  }, []);

 
  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap">
              <h2>SLIDESHOW</h2>
            </div>
            <div className="section-collection-container">
              <div className="section-collection-head container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                  <span className="col-8 text-start">CCL Collection</span>
                  <div className="arrow col-4 text-end">
                    <a><i className="fa fa-arrow-left" aria-hidden="true"></i></a>
                    <a><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              <div className="section-collection-content">
                <div className="item">
                  <div className="content">
                    <img src="../img/christmas.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Christmas</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/tet.png" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Tet</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/halloween.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Halloween</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/womensday.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Women's day</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/midautumn-.png" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Mid-autumn</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/birthday.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Birthday</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/newyear.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>New Year</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="content">
                    <img src="../img/yearend.jpg" alt=""></img>
                    <div className="text">
                      <div className="text-content">
                        <h2>Year End</h2>
                        <p>8 photos</p>
                      </div>
                      <a href=""><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
		        </div>
            <Helmet>
              <script src="../js/slideshowsurf.js"></script>
            </Helmet> 
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Slideshow;
