import React from 'react'

const Productdescription = () => {
  return (
    <div className='mt-20'>
      <div className='flex gap-3 mb-4'>
        <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
      </div>
      <div className='flex flex-col pb-16'>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi dolorem id omnis iure vel quasi repudiandae at ut consequatur molestias hic error aperiam, quis officiis enim! Voluptates corporis enim eligendi ipsam iusto! Nisi, consequatur modi.</p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cupiditate voluptatum eligendi aspernatur facere nesciunt repellat est pariatur, fugit cumque, saepe labore nobis maxime?</p>
      </div>
    </div>
  )
}

export default Productdescription
