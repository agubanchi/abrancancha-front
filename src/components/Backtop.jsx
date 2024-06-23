import { FaChevronUp } from "react-icons/fa";

const Backtop = () => {

const top = ()=>{
    window.scrollTo(0,0);
};

  return (
    <>
    <div onClick={top} className='rounded-md bg-white/70 py-4 px-4 fixed top-auto bottom-0 left-auto right-0 mb-4 mr-4 cursor-pointer'>
    <FaChevronUp className=' text-acentColor'/> 
    </div>
    </>
  )
}

export default Backtop