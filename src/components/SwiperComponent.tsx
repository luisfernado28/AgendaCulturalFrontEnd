// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Autoplay, Navigation, Pagination } from "swiper";
import { CardMedia } from "@mui/material";

// Import Swiper styles
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
import { Link } from "react-router-dom";

function createSlide(imageId: string, imageLink: string) {
	return (
		<SwiperSlide style={{ width: "100%", height: "400px" }}>
			<Link to={`/events/${imageId}`}>
				<CardMedia
					component="img"
					height="350px"
					image={`${process.env.REACT_APP_Blob_API}/eventsimages/${imageLink}`}
				></CardMedia>
			</Link>{" "}
		</SwiperSlide>
	);
}
interface imagesObj {
	eventId: string;
	imageUrl: string;
}
interface props {
	imagesLink: imagesObj[];
}
function SwiperComponent(imagesArray: props): JSX.Element {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			slidesPerView={1}
			navigation
			autoplay={{ delay: 5000 }}
			pagination={{ clickable: true }}
		>
			{imagesArray.imagesLink.map((x: imagesObj) => {
				return createSlide(x.eventId, x.imageUrl);
			})}
		</Swiper>
	);
}

export default SwiperComponent;
