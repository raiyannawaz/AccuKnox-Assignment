const Navbar = ({value, setValue, handleSearch}) => {
    
  const handleChange = (event) =>{
    setValue(event.target.value)
  }

    return (
        <nav className="bg-white px-4 py-2 d-flex justify-content-between align-items-center" aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/" className="text-primary">Dashboard</a></li>
            </ol>
            <form className="d-flex" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" value={value} onChange={handleChange}/>
                <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
        </nav>
    )
}

export default Navbar