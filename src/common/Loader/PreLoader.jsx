import React from 'react'
import { PuffLoader } from 'react-spinners'

const PreLoader = () => {
  return (
    <div className="bg-slate-900 h-[100vh] flex gap-3 flex-col justify-center items-center">
      {/* <ScaleLoader size={200} color="red" /> */}
      <PuffLoader
        color="#05ffe1"
        cssOverride={{}}
        loading
        size={99}
        speedMultiplier={1}
      />
      <div className="text-transparent text-4xl  text-rose-500 font-bold py-2 px-4 rounded ">
      </div>
    </div>
  )
}

export default PreLoader
