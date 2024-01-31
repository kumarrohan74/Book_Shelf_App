import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../card/card.component';
import './search.styles.css';

const Search = () => {

    const [bookData, setBookData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [urlParam, setUrlParam] = useState('author');
    const [isSort, setIsSort] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const baseURL = `http://localhost:5005/books`;

    useEffect(() => {
        axios.get(`http://localhost:5005/getTotalCount`).then((response) => {
            setTotalCount(response.data[0]["count(title)"]);
        })
    },[])

    useEffect(() => {
        axios.post(`${baseURL}/?isSort=${isSort}&param=${urlParam}&page=${currentPage}&pageSize=${pageSize}`, { 'name': inputValue }).then((response) => {
            setBookData(response.data.response);
        })
    }, [currentPage, pageSize, isSort, urlParam, inputValue]);

    const onInputChange = (e) => {
        axios.post(`${baseURL}/?isSort=${isSort}&param=${urlParam}&page=${currentPage}&pageSize=${pageSize}`, { 'name': e.target.value }).then((response) => {
            setInputValue(e.target.value)
            setBookData(response.data.response);
        })
    }

    const onButtonClick = () => {
        axios.post(`${baseURL}/?isSort=${isSort}&param=${urlParam}&page=${currentPage}&pageSize=${pageSize}`, { 'fromDate': fromDate, "toDate": toDate }).then((response) => {
            setBookData(response.data.response);
        })
    }

    const onSortButtonClick = (param) => {
        setIsSort(true);
        setUrlParam(param);
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="search-container">
            <div className="header-container">
                <div>
                    <button onClick={() => onSortButtonClick('title')}>Sort By Title</button>
                    <button onClick={() => onSortButtonClick('author')}>Sort By Author</button>
                    <button onClick={() => onSortButtonClick('published_date')}>Sort By Published Date</button>
                </div>
            </div>
            <div className="input-container">
                <div>
                    <h2>Search Books here</h2>
                    <input name="searchInput" type="text" onChange={onInputChange} placeholder="Search by author or title or genre" />
                    From <input type="date" name="fromDate" onChange={(e) => setFromDate(e.target.value)} />
                    To <input type="date" name="toDate" onChange={(e) => setToDate(e.target.value)} />
                    <button className="submit-button" onClick={onButtonClick}>Submit Date</button>
                </div>
                <div>

                </div>

            </div>
            <div className="books-container">
                {bookData?.map((book, i) => {
                    return (
                        <Card bookData={book} key={i} />
                    )
                })}
            </div>
            <div>
                <div className="paging-container">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span> Page {currentPage} </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={Math.ceil(totalCount/pageSize) === currentPage}>Next</button>
                </div>
            </div>
           
        </div>
    )
}

export default Search;