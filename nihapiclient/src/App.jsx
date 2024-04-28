import React, {useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import PaperIDQueryService from './services/communicator'
import DisplayArea from './components/DisplayArea'

const App = () =>
{
    const [retstart, setRetstart] = useState(0)
    const [retmax, setRetmax] = useState(20)
    const [searchterms, setTerms] = useState("")
    const [returnIDs, setreturnIDs] = useState([])

    const handleSearch = (event) =>
    {
        const typedIn = String(event.target.value)

        setTerms(typedIn)
    }

    const submitQueryHandler = (event) =>
    {
        event.preventDefault()
        const searchData = 
        {
            "term": searchterms,
            "retstart": retstart,
            "retmax": retmax
        }
        console.dir(searchData)
        // Send the POST request with this JSON object.
        PaperIDQueryService
        .getPubIDs(searchData)
        .then((returnData) =>
        {
            console.dir(returnData)
            const listofids = Array.from(returnData["esearchresult"]["idlist"])
            console.log(`list of ids: ${listofids}`)
            setreturnIDs(listofids)
        })
    }


    return (
        <div>
            <h2>Search NIH Databases!</h2>

            <SearchBar query={searchterms} handler={handleSearch} submithandler={submitQueryHandler} />

            <DisplayArea uidcount={returnIDs.length} returnedIDs={returnIDs}/>
        </div>
    )
}

export default App
