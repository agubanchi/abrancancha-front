import React, { useState, useEffect } from 'react';

function DataGallery() {
  const datagallery = 'https://jsonplaceholder.typicode.com/photos';
  const totalPages = 10; 
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      const result = await fetch(`${datagallery}?_page=${page}`);
      const data = await result.json();
      setPages(data);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, totalPages]); // Corregido: Se agregó totalPages como dependencia

  return {
    loading,
    pages,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}

export default DataGallery;
