import './App.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Navs from './Components/Navs'
import SidebarRemove from './Components/SidebarRemove'
import SidebarAdd from './Components/SidebarAdd'
import { useState } from 'react'
import Header from './Components/Header'
import Dashboard from './Components/Dashboard'
import allWidgets from './assets/widgets.json'

function App() {

  const [sidebarAdd, setSidebarAdd] = useState({isShown: false, category: 'cspm', index: 0})
  const [sidebarRemove, setSidebarRemove] = useState({isShown: false, category: 'cspm'})

  const [ currentWidgets, setCurrentWidgets ] = useState(allWidgets)
  const [ filteredWidgets, setFilteredWidgets ] = useState(allWidgets)

  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) =>{
    let value = event.target.value;

    let filterWidgets = currentWidgets.map(currentWidget=>{
      return { ...currentWidget,
        widgets: currentWidget.widgets.filter(widget=>widget.title.toLowerCase().includes(search.toLocaleLowerCase())) 
      }
    })
    setFilteredWidgets(filterWidgets)
    setSearch(value)
  }
  
  const handleSidebarAdd = (category, index) => {
    setSidebarAdd({isShown: true, category, index})
  }
  
  const defaultSidebarAdd = () =>{ 
    setSidebarAdd({...sidebarAdd, isShown: false})
  }
  
  const handleSidebarRemove = (category) => {
    setSidebarRemove({isShown: true, category})
  }

  const defaultSidebarRemove = () =>{
    setSidebarRemove({...sidebarRemove, isShown: false})
  }

  const handleAddWidget = (widget, category) =>{
    let newWidgets = currentWidgets.map(currentWidget=>{
      if(currentWidget.category === category){
        let newWidget = { id: currentWidget.widgets.length+1, ...widget }
        return {...currentWidget, widgets: [...currentWidget.widgets, newWidget]}
      }
      else{
        return currentWidget
      }
    })
    setCurrentWidgets(newWidgets)
  }

  const handleRemoveWidget = (widgets, category) =>{
    let newWidgets = currentWidgets.map(currentWidget=>{
      if(currentWidget.category === category){
        return {...currentWidget, widgets: currentWidget.widgets.filter(curWid=>!widgets.some(widget=>curWid.id===widget.id))}
      }
      else{
        return currentWidget
      }
    })

    setCurrentWidgets(newWidgets)
  }

  return (
    <Container fluid className='bg-light p-0 m-0 content min-vh-100'>
      <Navs search={search} handleSearchChange={handleSearchChange}/>
      <SidebarAdd sidebarAdd={sidebarAdd} handleSidebarAdd={handleSidebarAdd} defaultSidebarAdd={defaultSidebarAdd} handleAddWidget={handleAddWidget} />
      <SidebarRemove currentWidgets={currentWidgets} sidebarRemove={sidebarRemove} handleSidebarRemove={handleSidebarRemove} defaultSidebarRemove={defaultSidebarRemove} handleRemoveWidget={handleRemoveWidget}/>
      <Header search={search } sidebarAdd={sidebarAdd} handleSidebarAdd={handleSidebarAdd} sidebarRemove={sidebarRemove} handleSidebarRemove={handleSidebarRemove}/>
      <Dashboard search={search} filteredWidgets={filteredWidgets} currentWidgets={currentWidgets} handleSidebarAdd={handleSidebarAdd}/>
    </Container>
  );
}

export default App;