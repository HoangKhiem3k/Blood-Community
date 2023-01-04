import React from 'react'
import { useSelector } from 'react-redux';
import LoaderGif from '../../assets/images/loader2.gif'
import './Loadding.css'
export default function Loading() {
  const isLoading = useSelector((state) => state.loader.isLoading);
  return (
    <div className={isLoading === true ? 'loader-container1' : 'loader-container1 hide-loading1'}>
      <div className='loader1'>
        <img src={LoaderGif} alt="loading..." />
      </div>
    </div>
  )
}



