// Anything below this is for ESearch results. 
const Count = (props) =>
{
    return (
        <h4>Number of results: {props.count}</h4>
    )
}

const ID = ({uidnumber}) =>
{   
    const direct_link = "https://pubmed.ncbi.nlm.nih.gov/"
    return (
        <div><a href={`${direct_link}${uidnumber}`}>{`${direct_link}${uidnumber}`}</a></div>
    )
}

const IDList = ({papers, showlist}) =>
{
    const toshow = showlist ? 'hide' : 'show'

    return (
        <ul>
            {
                papers.map((p, index) =>
                {
                    return <ID uidnumber={p} key={`paper${index}`}/>
                })
            }
        </ul>
    )
}

// Anything below this is for EFetch results.
const AbstractSection = (props) =>
{
    // This is used for abstracts that have multiple sections.
    return (
        <>
            <h4>{props.title}</h4>
            {props.text}
        </>
    )
}

const Abstract = (props) =>
{
    const absdata = Object(props.abstractdata)
    const cprtinfo = absdata["CopyrightInformation"]
    let concise = ""

    // Typical abstracts are just strings.
    if (typeof absdata["AbstractText"] === "string")
    {
        concise = absdata["AbstractText"]
        return (
            <>
            <h3>Abstract</h3>
            {concise}
            <footer>{cprtinfo}</footer>
        </>
        )
    }

    // Some abstracts are fancy and have sections, so they must be parsed differently
    concise = absdata["AbstractText"].map((section) =>
    {
        const sectionObject = 
        {
            "title": section["@Label"],
            "text": section["#text"]
        }
        return sectionObject
    })
        
    // Base return case assumes fancy abstracts with multiple sections. They appear as arrays of data in the "AbstractText" key.
    return (
        <>
            <h3>Abstract</h3>
            {
                concise.map((s, index) =>
                {
                    return <AbstractSection key={`abssect${index}`} title={s["title"]} text={s["text"]}/>
                })
            }
            <footer>{cprtinfo}</footer>
        </>
    )
}

const Author = (props) =>
{
    return (
        <li>
            {props.firstname} {props.lastname}
        </li>
    )
}

const AuthorList = (props) =>
{
    const names = props.authorlist["Author"].map((a) =>
    {
        const authorObject =
        {
            "first": a["ForeName"],
            "last": a["LastName"]
        }
        return authorObject
    })

    return (
        <ul>
        {
            names.map((a, index) =>
            {
                return <Author key={`author${index}`} firstname={a["first"]} lastname={a["last"]}/>
            })
        }
        </ul>
    )
}

const ArticleInfoConstructor = (props) =>
{
    // console.log("Rearched Article Info Constructor")
    // console.dir(props.artjson)
    const returnedJSON = Object(props.artjson)
    const abstractdata = returnedJSON["Abstract"]
    const authors = returnedJSON["Author List"]
    const title = returnedJSON["Title"]
    const PMID = returnedJSON["PMID"]
    const journal = returnedJSON["Journal"]
    return (
        <>
            <h2>{title}</h2>
            <h3>{journal}</h3>
            PMID: {PMID}
            <Abstract abstractdata={abstractdata} />
            <AuthorList authorlist={authors} />
        </>
    )
}

const DisplayArea = (props) =>
{
    if (props.esearch !== null)
    {
        const returnedJSON = Object(props.esearch)
        console.log("converted esearch result to proper object:")
        console.dir(returnedJSON)
        const uidcount = returnedJSON["esearchresult"]["count"]
        const returnedids = Array.from(returnedJSON["esearchresult"]["idlist"])
        const querytranslation = returnedJSON["esearchresult"]["querytranslation"]
        return (
            <>
                <Count count={uidcount} />
                <IDList papers={returnedids} showlist={true} />
                querytranslation: {querytranslation}
            </>
        )
    }

    if (props.efetch !== null)
    {
        console.log("Reached efetch clause")
        const rawInfoArray = Array.from(props.efetch)
        return (
            <>
            {
                rawInfoArray.map((dataObject, index) =>
                {
                    return <ArticleInfoConstructor key={`article${index}`} artjson={dataObject}/>
                })
            }
            </>
        )
    }

    return (
        <div>
            <h4>Nothing searched, nothing gained. :D</h4>
        </div>
    )
        
}

export default DisplayArea