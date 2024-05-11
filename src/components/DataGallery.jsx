import  { useState, useEffect } from 'react';
import data from '../data/db.json'; // Importar el archivo JSON directamente

function DataGallery() {
  const totalPages = Math.ceil(data.gallery.length / 9); // Mostrando 9 imágenes por página
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      const startIndex = currentPage * 9;
      const endIndex = Math.min(startIndex + 9, data.gallery.length);
      const slicedPages = data.gallery.slice(startIndex, endIndex);
      setPages(slicedPages);
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);
  

  return {
    loading,
    pages,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}

export default DataGallery;
