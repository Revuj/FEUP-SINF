import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {IconContext} from "react-icons";


const TableHeader = ({ headers, onSorting, color }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th style = {{backgroundColor : color}}
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}

                        {sortingField && sortingField === field && (
                            <IconContext.Provider
                                value={{ size: '50px'}}
                            >
                                {(sortingOrder === "asc") ?  <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                            </IconContext.Provider>

                            
                            
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader; 