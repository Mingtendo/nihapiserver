import React, {useEffect, useState } from 'react'
import SearchArea from './components/SearchArea'
import PaperIDQueryService from './services/communicator'
import DisplayArea from './components/DisplayArea'

const App = () =>
{
    const [retstart, setRetstart] = useState(0)
    const [retmax, setRetmax] = useState(20)
    const [searchterms, setTerms] = useState("")
    const [returnIDs, setreturnIDs] = useState([])
    const [esearchres, setEsearchres] = useState(null)
    const fieldtags = 
    [
        "Affiliation [ad]","All Fields [all]","Article Identifier [aid]","Author [au]","Author Identifier [auid]","Book [book]",
        "Comment Correction Type","Completion Date [dcom]","Conflict of Interest Statement [cois]","Corporate Author [cn]","Create Date [crdt]",
        "EC/RN Number [rn]","Editor [ed]","Entry Date [edat]","Filter [filter] [sb]","First Author Name [1au]","Full Author Name [fau]",
        "Full Investigator Name [fir]","Grants and Funding [gr]","Investigator [ir]","ISBN [isbn]","Issue [ip]","Journal [ta]","Language [la]",
        "Last Author Name [lastau]","Location ID [lid]","MeSH Date [mhda]","MeSH Major Topic [majr]","MeSH Subheadings [sh]","MeSH Terms [mh]",
        "Modification Date [lr]","NLM Unique ID [jid]","Other Term [ot]","Owner","Pagination [pg]","Personal Name as Subject [ps]",
        "Pharmacological Action [pa]","Place of Publication [pl]","PMCID and MID","PMID [pmid]","Publication Date [dp]","Publication Type [pt]",
        "Publisher [pubn]","Secondary Source ID [si]","Subset [sb]","Supplementary Concept [nm]","Text Words [tw]","Title [ti]",
        "Title/Abstract [tiab]","Transliterated Title [tt]","Volume [vi]"
    ]

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
            setEsearchres(returnData)
        })
    }


    return (
        <div>
            <h2>Search NIH Databases!</h2>

            <SearchArea query={searchterms} handler={handleSearch} submithandler={submitQueryHandler} fieldtags={fieldtags}/>

            <DisplayArea esearch={esearchres}/>
        </div>
    )
}

export default App
