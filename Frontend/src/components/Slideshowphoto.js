import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Helmet } from 'react-helmet';
import {uploadPhotos} from "../redux/action";


import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import advancedSlides from "./slides";

function Slideshowphoto() {
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

  const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);
  const [photos, setPhotos] = useState({photos:[],});

  const uploadphotos = (e) => {
    const data = new FormData();
    for (let i=0;i<e.target.files.length;i++){
      data.append('file', e.target.files[i]);
    }
    dispatch(uploadPhotos(data,'Christmas'))
  }

  const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

function assetLink(asset) {
  // return `https://assets.yet-another-react-lightbox.com/_next/image?url=${encodeURIComponent(
  //   `/_next/static/media/${asset}`
  // )}&w=${width}&q=75`;
  return `https://api.scanx.io.vn/public/${asset}`
}

const slides = [
  { asset: "1734697699401-baolixiccl-03.png"},
  { asset: "1734697699408-baolixiccl-04.png"},
 
].map(({ asset }) => ({
  src: assetLink(asset),
  srcSet: breakpoints.map((breakpoint) => ({
    src: assetLink(asset, breakpoint),
    width: breakpoint,
    height: "100%",
  })),
}));

const advancedSlides = [
  { ...slides[0]},
  {
    ...slides[1],
  },
  {
    ...slides[2],
    title: "Flamingo",
    description: "Vicko Mozara\n\nVeliki zali, Dubravica, Croatia",
  },
  {
    title: "Big Buck Bunny",
    description:
      "The Peach Open Movie Project\n\nBlender Institute, Netherlands",
    width: 1280,
    height: 720,
    poster:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    sources: [
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
    ],
  },
  {
    ...slides[3],
    title: "Starfish on a sand beach",
    description: "Pedro Lastra\n\nKey West, Florida, United States",
  },
  {
    ...slides[6],
    title:
      "The last night of a two week stay on the North Shore of Oahu, Hawaii",
    description: "Sean Oulashin\n\nNorth Shore, Waialua, Hawaii, United States",
  },
  {
    ...slides[7],
    title: "Sunset on Kauai",
    description: "Cristofer Maximilian\n\nKauai, Hawaii, United States",
  },
  {
    ...slides[9],
    title: "RayBan sunglasses",
    description: "Ethan Robertson\n\nSanta Monica, California, United States",
  },
  {
    ...slides[11],
    title: "Find the time",
    description: "Alex Perez\n\nNaples, Florida, United States",
  },
];

  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap" style={{position:"relative"}}>
              <h2>SLIDESHOW</h2>
                <input type="file" name="file" multiple accept='image/*' onChange={(e)=>uploadphotos(e)}></input>
                <button className="csvbutton" style={{position:"absolute",right:"5%"}}>Upload Photos</button>
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
export default Slideshowphoto;
