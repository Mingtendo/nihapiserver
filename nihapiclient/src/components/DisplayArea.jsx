const Count = (props) =>
{
    return (
        <h3>Number of results: {props.count}</h3>
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
                papers.map((p) =>
                {
                    return <ID uidnumber={p} />
                })
            }
        </ul>
    )
}

const DisplayArea = (props) =>
{
    if (props.uidcount > 0)
    {
        return (
            <>
                <Count count={props.uidcount} />
                <IDList papers={props.returnedIDs} showlist={true} />
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