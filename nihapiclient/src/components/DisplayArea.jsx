const Count = (props) =>
{
    return (
        <h4>Number of results: {props.count}</h4>
    )
}

const ID = ({uidnumber}) =>
{
    return <div>{uidnumber}</div>
}

const IDList = ({papers, showlist}) =>
{
    const toshow = showlist ? 'hide' : 'show'

    return (
        <ul>
            {
                papers.map((p, index) =>
                {
                    return <ID uidnumber={p} key={index}/>
                })
            }
        </ul>
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
    return (
        <div>
            <h4>Nothing searched, nothing gained. :D</h4>
        </div>
    )
        
}

export default DisplayArea