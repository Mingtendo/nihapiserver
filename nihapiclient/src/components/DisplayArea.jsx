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

const AbstractSection = (props) =>
{
    return (
        <>
            <h3>{props.title}</h3>
            <br />
            {props.text}
        </>
    )
}

const Abstract = (props) =>
{
    const absdata = Object(props.abstractdata)
    const cprtinfo = absdata["CopyrightInformation"]
    const concise = absdata["AbstractText"].map((section) =>
    {
        const sectionObject = 
        {
            "title": section["@Label"],
            "text": section["#text"]
        }
        return sectionObject
    })

    return (
        <>
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
        const returnedJSON = Object(props.efetch)
        const abstractdata = returnedJSON["Abstract"]
        console.dir(returnedJSON)
        return (
            <>
                <Abstract abstractdata={abstractdata} />
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