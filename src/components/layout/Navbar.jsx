import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { applySearch } from '../../features/filter/filterSlice'

const Navbar = () => {
    const { search } = useSelector(state => state.filter)
    const dispatch = useDispatch();

    const debounce = (cb, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    };


    const handleSearch = e => {
        dispatch(applySearch(e.target.value.toLowerCase()))
    }

    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <img src={logo} />
                </Link>
                {/* There are nothing to do with the search in add or edit task page, but kept for looking good */}
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search Job"
                        className="search-input "
                        id="lws-searchJob"
                        defaultValue={search}
                        onChange={debounce(handleSearch, 500)}
                    />
                </div>
            </div>
        </nav>

    )
}

export default Navbar