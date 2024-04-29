// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import './styles.css'

// import required modules
import { Pagination, Autoplay, Keyboard } from 'swiper/modules'

export default function ProductDetailsSlider() {
  return (
    <section className="border bg-gray-100">
      <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, Keyboard]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // Enable autoplay even when user interacts with swiper
        }}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        style={{
          width: '100%' /* Set width to 100% to fill the container */,
          maxWidth: '500px' /* Set maximum width to 500px */,
          height: 'auto' /* Set height to auto to maintain aspect ratio */,
          maxHeight: '500px' /* Set maximum height to 500px */,
          margin: '0 auto' /* Center the div horizontally */,
        }}
      >
        <SwiperSlide>
          <img
            src="https://react.spruko.com/synto-js/preview/assets/1-0b2eec75.png"
            alt=""
            className="md:w-500px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://react.spruko.com/synto-js/preview/assets/1-0b2eec75.png"
            alt=""
            className="md:w-500px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://react.spruko.com/synto-js/preview/assets/5-45c1b4f9.png"
            alt=""
            className="md:w-500px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://react.spruko.com/synto-js/preview/assets/1-0b2eec75.png"
            alt=""
            className="md:w-500px"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}
