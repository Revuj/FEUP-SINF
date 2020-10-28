import {useMemo, useEffect, useState} from 'react';
import Pagination from "react-bootstrap/Pagination";
import '../styles/Pagination.css';


const PaginationComponent = ({
    total = 0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {


    const [totalPages, setTotalPages] = useState(0);
   //    let  [pages, setPages] = useState([]);
    const set = new Set();
    const pages = [];



    useEffect(() => {
        if (total > 0 && itemsPerPage > 0)
            setTotalPages(Math.ceil(total / itemsPerPage));
                
    }, [total, itemsPerPage]);

    /*
    useEffect(() => {
        set.clear();
        const offset = 5;
            set.add(1);
            set.add(totalPages);
    
            for(let i = 0 ; i < offset; i++) {
                set.add(Math.min(1 + i, totalPages));
                set.add(Math.max(currentPage - i, 1));
                set.add(Math.min(currentPage + i , totalPages));
                set.add(Math.max(totalPages - i, 1));
            }
    
    
            pages = Array.from(set).sort((a,b) => a-b);
            setPages(pages);

    }, [currentPage, totalPages]);*/

    
    const paginationItems = useMemo(() => {
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <Pagination.Item 
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)
                    }
                > 
                {i}
                </Pagination.Item>
            );
        }


        return pages;
    }, [totalPages, currentPage]);

    if (totalPages === 0) return null;

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => { if (currentPage > 1) onPageChange(currentPage - 1)}}
                disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
                onClick={() => {if (currentPage < totalPages) onPageChange(currentPage + 1)}}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

export default PaginationComponent;