import React from 'react';
import DataGallery from './DataGallery';
import PaginationButtons from './PaginationButtons';

function Galeria() {
  const { loading, pages, totalPages, currentPage, setCurrentPage } = DataGallery();

  return (
    <section id='galeria' className='mt-[16rem]'>
      {loading ? (
        <div className='text-center text-Bebas text-5xl text-acentColor'>
          Cargando...
        </div>
      ) : (
        <>
          <h1 className="sm:text-5xl text-3xl font-bold text-white font-Bebas text-center py-5">
          Galería
        </h1>
          <div className='grid grid-cols-3 gap-3 '>
            {pages.map((page) => (
              <div key={page.id}>
                <img src={page.url} alt={page.title} />
              </div>
            ))}
          </div>
          <PaginationButtons 
            totalPages={totalPages} // Corregido: Se pasó totalPages como prop a PaginationButtons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}

export default Galeria;
