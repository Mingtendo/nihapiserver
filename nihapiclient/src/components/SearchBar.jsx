const SearchBar = (props) =>
{
    return (
        <form onSubmit={props.submithandler}>
            <input value={props.query} onChange={props.handler} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default SearchBar