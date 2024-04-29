import ReactPaginate from "react-paginate"
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

export default function PaginationButtons({setCurrentPage, currentPage, totalPages}) {

    const handlePageClick =({selected})=>{
        setCurrentPage(selected)
    }

    const showNextButton = currentPage !== totalPages -1;
    const showPrevButton = currentPage !== 0;
    
  return (
    <div>
          <ReactPaginate
        breakLabel={
            <span className="text-white mr-4">...</span>
        }
        nextLabel={
          showNextButton ? (  <span className="w-10 text-acentColor h-10 flex items-center justify-center bg-white rounded-md">
          <FaChevronRight />   
         </span>) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
           showPrevButton ? ( <span className=" w-10 text-acentColor h-10 flex items-center justify-center bg-white rounded-md mr-4">
           <FaChevronLeft />   
          </span>) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4 "
        pageClassName="text-white block border- border-solid border-acentColor hover:bg-acentColor w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-acentColor text-textColor"
     />
    </div>
  )
}
