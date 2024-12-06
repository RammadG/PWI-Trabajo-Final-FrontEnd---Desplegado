import React, { useState } from 'react'

const useSearchTerm = () => {

    const [searchTerm, setSearchTerm] = useState('')

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    };


    return {
        searchTerm,
        handleChangeSearchTerm
    }
}

export default useSearchTerm