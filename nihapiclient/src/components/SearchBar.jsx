const SearchBar = (props) =>
{
    return (
        <form onSubmit={props.submithandler} id={props.id}>
            <textarea value={props.query} onChange={props.handler} placeholder="To use pagination, type [pg] after your query (i.e. cancer[pg])"/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}

const FieldSelector = (props) =>
{
    // Generate all field tags from the given list.
    return (
        <select id="fieldselector">
            {
                props.fieldtags.map((f, index) => 
                {
                    <option key={index} value={f}>{f}</option>
                })
            }
        </select>
    )
}

const SearchArea = (props) =>
{
    return (
        <>
            <SearchBar id="searchbar" query={props.query} handler={props.handler} submithandler={props.submithandler} />
            <FieldSelector fieldtags={props.fieldtags}/>
        </>
    )
}

export default SearchArea