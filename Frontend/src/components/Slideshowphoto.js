import { useDispatch, useSelector } from "react-redux";
import React,{ useEffect,useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from 'react-helmet';
import {uploadPhotos,getPhotos} from "../redux/action";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

// used for show snackbar and alert
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const alrertstylesuccess = {
  width: "100%",
  marginBottom: 4,
  marginRight: 2,
  backgroundColor: "var(--backgroundbody)"
};

function Slideshowphoto() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState({ open: false, message: "" });

  if (state.user == null) {
    navigate("/")
  }

  const closealert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    dispatch(getPhotos())
  }, []);

  const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);

  const uploadphotos = (e) => {
    const data = new FormData();
    for (let i=0;i<e.target.files.length;i++){
      data.append('file', e.target.files[i]);
    }
    dispatch(uploadPhotos(data))
    setAlert({open:true, message:"You have uploaded photos successfully"})
  }

  const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

  function assetLink(asset) {
    // return `https://assets.yet-another-react-lightbox.com/_next/image?url=${encodeURIComponent(
    //   `/_next/static/media/${asset}`
    // )}&w=${width}&q=75`;
    return `https://api.scanx.io.vn/public/${asset}`
      // return `../../public/img/photos/${asset}`
  }

  var listphotosname = []
  state.photos.forEach((photo) => listphotosname.push({asset:photo}))

  // const slides = [
  //   { asset: "1735100551246-baolixiccl-01.png"},
  //   { asset: "1735100640720-baolixiccl-03.png"},
  
  // ].map(({ asset }) => ({
  //   src: assetLink(asset),
  //   srcSet: breakpoints.map((breakpoint) => ({
  //     src: assetLink(asset, breakpoint),
  //     width: breakpoint,
  //     height: "100%",
  //   })),
  // }));

  const slides = listphotosname.map(({ asset }) => ({
    src: assetLink(asset),
    srcSet: breakpoints.map((breakpoint) => ({
      src: assetLink(asset, breakpoint),
      width: breakpoint,
      height: "100%",
    })),
  }));

  const advancedSlides = [...slides]
  // const advancedSlides = [
  //   { ...slides[0]},
  //   {
  //     ...slides[1],
  //   },
  //   {
  //     ...slides[2],
  //     title: "Flamingo",
  //     description: "Vicko Mozara\n\nVeliki zali, Dubravica, Croatia",
  //   },
  //   {
  //     title: "Big Buck Bunny",
  //     description:
  //       "The Peach Open Movie Project\n\nBlender Institute, Netherlands",
  //     width: 1280,
  //     height: 720,
  //     poster:
  //       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
  //     sources: [
  //       {
  //         src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  //         type: "video/mp4",
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap" style={{position:"relative"}}>
              <h2>SLIDESHOW</h2>
                <label className="csvbutton" style={{position:"absolute",right:"5%",cursor:"pointer",padding:"5px 10px"}}>Upload Photos
                  <input type="file" name="file" multiple accept='image/*' onChange={(e)=>uploadphotos(e)} style={{display:"none"}}></input>
                </label>
            </div>
            <Lightbox
        open={advancedExampleOpen}
        close={() => setAdvancedExampleOpen(false)}
        slides={advancedSlides}
        plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
      />
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
                <div className="item" onClick={()=>setAdvancedExampleOpen(true)}>
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
          <Snackbar
            open={alert.open}
            autoHideDuration={2000}
            onClose={closealert}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={closealert}
              severity={
                alert.message.includes("successfully") ? "success" : "error"
              }
              sx={
                alert.message.includes("successfully")
                  ? { ...alrertstylesuccess, color: "var(--success)" }
                  : { ...alrertstylesuccess, color: "var(--error)" }
              }
            >
              {alert.message}
            </Alert>
          </Snackbar>       
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Slideshowphoto;
