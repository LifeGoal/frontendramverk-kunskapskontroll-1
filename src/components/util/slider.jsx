import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SkinCarousel = ({ skinsData }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative w-full">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="mySwiper"
            >
                {skinsData.map((skin, i) => (
                    <SwiperSlide key={i}>
                        <img src={skin.splash} className="w-full h-auto" alt={skin.name}/>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 text-white text-2xl font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {skinsData[activeIndex].name === "default" ? "DEFAULT SKIN" : skinsData[activeIndex].name.toUpperCase()}
            </div>
        </div>
    );
};

export default SkinCarousel;