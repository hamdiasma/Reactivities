import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/images/categoryImages/cafev.jpg",
  "/images/categoryImages/travelv.jpg",
  "/images/categoryImages/sport.jpg",
  "/images/categoryImages/camping.jpg",
  "/images/categoryImages/food.jpg",
  "/images/categoryImages/drinks.jpg",
  "/images/categoryImages/travelv.jpg",
  "/images/categoryImages/campingv.jpg",
];

const Carousel = () => {
  const settings = {
    dots: false,           // hide dots navigation
    arrows: false,         // hide prev/next arrows
    infinite: true,
    speed: 500,
    slidesToShow: 3,       // number of visible slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
  };

  return (
    <div style={{ margin: "40px" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} style={{ padding: "0 10px" , boxShadow: "0 4px 15px rgba(0,0,0,0.8)" }}> {/* space between slides */}
            <div
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                margin:5,
              }}
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
