const Error = ({errorStatus, errorMessage}) => {
    return (
<div className="error">
    <p className="error error-status">{errorStatus}</p>
    <p className="error error-text">{errorMessage}</p>
</div>
    )
}

export default Error;