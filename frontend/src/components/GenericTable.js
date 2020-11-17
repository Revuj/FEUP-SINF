import React, { useEffect, useState, useMemo } from 'react';
import useFullPageLoader from '../hooks/FullPageLoader';
import PaginationComponent from './Pagination';
import Search from './Search';
import TableHeader from './TableHeader';
import '../styles/Table.css';

/**
 *  example of usage
 *   <GenericTable
      title = "Table title"
      numberItemsPerPage = {4}
      headers = {[
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Comment", field: "body", sortable: false }
        ]}
      containerStyle = {{width: '100%'}}
      themeColor = "orange"
    />
 */
const GenericTable = ({
  title,
  numberItemsPerPage,
  headers,
  containerStyle,
  themeColor,
}) => {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = numberItemsPerPage;

  /* this is going to be used in the feature when doing the api call */
  const [comments, setComments] = useState([]);
  /* insert the information fetched in the api (now using a dummy api) */
  useEffect(() => {
    const getData = () => {
      showLoader();

      fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((json) => {
          hideLoader();
          setComments(json);
          //console.log(json);
        });
    };

    getData();
  }, []);

  /*to able to sort the data we are going to retrieve */
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  return (
    <>
      <section className="table" style={containerStyle}>
        <header className="header_info">
          <h3 className="table-title">{title}</h3>
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </header>

        <table className="content">
          <TableHeader
            color={themeColor}
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {commentsData.map((comment) => (
              <tr key={comment.id}>
                <th scope="row">{comment.id}</th>
                <td>{comment.email}</td>
                <td>{comment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationComponent
          color={themeColor}
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {loader}
      </section>
    </>
  );
};

export default GenericTable;
