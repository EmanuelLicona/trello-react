import { InfinitySpin } from 'react-loader-spinner'

import './Loader.css'
export const Loader = () => {
  return (
    <div className='background-loader'>
      <InfinitySpin
        color='#00a8ff'
        width='200'
      />
    </div>
  )
}
