const SearchBar = (props) =>
{
    return (
        <form id={props.id}>
            <textarea id="searchbar" rows={5} cols={50} value={props.query} onChange={props.handler} placeholder="To use pagination, type [pg] after your query (i.e. cancer[pg])"/>
            <br/>
            <button type="submit" onClick={props.generalQueryHandler}>ESearch</button>
            <button type="submit" onClick={props.idQueryHandler}>EFetch</button>
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
            <SearchBar id="searchbar" query={props.query} handler={props.handler} generalQueryHandler={props.generalQueryHandler} idQueryHandler={props.idQueryHandler} />
            <FieldSelector fieldtags={props.fieldtags}/>
        </>
    )
}

export default SearchArea