import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { imagePath } from '../../../helper/imagePath'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Pagination, Navigation } from 'swiper/modules'
export default function ImagePreviews({ onClose, images }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 ">
      <div className="relative overflow-hidden bg-white rounded shadow max-h-[90vh] w-full md:w-6/12">
        <div className="absolute right-0 z-10">
          <button
            onClick={onClose}
            className="focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
          >
            <RxCross1 size={20} />
          </button>
        </div>
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="h-[500px]"
          >
            {images?.map(imgItem => (
              <SwiperSlide key={imgItem?.id}>
                <img
                  src={`${imagePath}/${imgItem?.name}`}
                  alt={`Image ${imgItem?.id}`}
                  className="h-full w-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
