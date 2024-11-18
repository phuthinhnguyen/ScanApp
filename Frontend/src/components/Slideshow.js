import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


function Slideshow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const colors = ["C:\Users\Admins\Desktop\ScanApp\Frontend\public\img\logo.png", "#00C49F", "#FFBB28"];
  const delay = 2500;  
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  if (state.user == null) {
    navigate("/")
  }
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    // dispatch(getItem());
    // dispatch(getallusersforposts());
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

 
  return (
    <div>
      {state.user != null ? (
        <div>
          <Header />
          <div className="home-body" style={{marginTop:"0"}}>
            <div className="home-body-wrap">
              <h2>SLIDESHOW</h2>
            </div>
            <div className="slideshow" style={{marginTop:"50px"}}>
              <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)`,marginTop:"0" }}
              >
                {colors.map((backgroundColor, index) => (
                 
                  <image
                    className="slide"
                    key={index}
                    src = {backgroundColor}
                    // style={{ backgroundColor }}
                    onClick={ console.log(backgroundColor)}
                  ></image>
                ))}
              </div>

              <div className="slideshowDots">
                {colors.map((_, idx) => (
                  <div
                    key={idx}
                    className={`slideshowDot${index === idx ? " active" : ""}`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Slideshow;
