import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';
import widgetsData from './widgetsData.json'

function App() {

  document.title = 'Dashboard'

  const [dashboard, setDashboard] = useState(widgetsData)

  const [searchDashboard, setSearchDashboard] = useState(dashboard)

  // AddToCategory
  const handleAdd = (newWidget) => {
    let updatedDashboard = {...dashboard, categories: dashboard.categories.map(category=>{
      if(category.id === newWidget.category){
        return {...category, widgets: [...category.widgets, newWidget]}
      }
      return category
    })}
    setDashboard(updatedDashboard)
  }
  // AddToCategory

  // RemoveFromCategory
  const handleRemove = (id, categoryId) => {
    let updatedDashboard = {...dashboard, categories: dashboard.categories.map(category=>{
      if(category.id === categoryId){
        return {...category, widgets: category.widgets.filter(widget=>{
          return widget.id !== id
        })}
      }
      return category
    })}

    setDashboard(updatedDashboard)
  }
  // RemoveFromCategory

  let [value, setValue] = useState('')

  const [isSearching, setIsSearching] = useState(false)

  // Search Widgets
  const handleSearch = (event) => {
    event.preventDefault()

    if(value){
      let updatedSearchDashboard = {...dashboard, categories: dashboard.categories.map(category=>{
        return {...category, widgets: category.widgets.filter(widget=>{
          return widget.title.toLowerCase().includes(value.toLowerCase()) || widget.data.toLowerCase().includes(value.toLowerCase())
        })}
      })}
  
      setIsSearching(true)
      setSearchDashboard(updatedSearchDashboard)
    }
    else{
      setIsSearching(false)
      setSearchDashboard(dashboard)
    }
  }
  // Search Widgets

  return (
    <div className="container-fluid bg-light min-vh-100 vw-100 g-0">
      <Navbar value={value} setValue={setValue} handleSearch={handleSearch} />

      <div className="container-fluid">
        <h4 className='py-3 m-0'>CNAPP Dashboard</h4>

        {/* Dashboard */}
        {isSearching && searchDashboard.categories[0].widgets.length === 0 && searchDashboard.categories[1].widgets.length === 0 ? <h5 className='ms-2'>No Widgets Found</h5> : 
        isSearching ? searchDashboard.categories.map(category => {
          return <Dashboard category={category} isSearching={isSearching} handleAdd={handleAdd} handleRemove={handleRemove} key={category.id} />
        }) : dashboard.categories.map(category => {
          return <Dashboard category={category} isSearching={isSearching} handleAdd={handleAdd} handleRemove={handleRemove} key={category.id} />
        })  }
        {/* Dashboard */}
      </div>
    </div>
  );
}

export default App;