import { useState } from 'react'
import {
  Offcanvas, OffcanvasHeader,
  OffcanvasTitle, OffcanvasBody,
  Nav, NavItem, NavLink,
  FormGroup, FormCheck,
  ButtonGroup, Button,
  Container
} from 'react-bootstrap'

function SidebarRemove({ currentWidgets, sidebarRemove, handleSidebarRemove, defaultSidebarRemove, handleRemoveWidget }) {

  const { category } = sidebarRemove

  const [widgets, setWidgets] = useState([])

  const handleChangeWidgets = (widget) => {

    let widgetsExist = widgets.find(wid=>wid.id === widget.id)

    if(widgetsExist){
      let newWidgets = widgets.filter(wid=>wid.id!==widget.id)
      setWidgets(newWidgets)
    }
    else{
      setWidgets([...widgets, widget])
    }

  }

  const [navActiveStyle, setNavActiveStyle] = useState({
    height: '3px', width: '25%', left: '0',
    transition: '0.3s all ease-in-out'
  })

  const handleChangeCategory = (event) => {
    let eventKey = event.target.dataset.rrUiEventKey;
    let tabIndex = event.target.tabIndex

    setNavActiveStyle({ ...navActiveStyle, left: `${tabIndex * 25}%` })
    handleSidebarRemove(eventKey)
    setWidgets([])
  }

  const handleSubmitWidgets = () => {
    handleRemoveWidget(widgets, category)
    defaultSidebarRemove()
    setWidgets([])
  }

  return (
    <Offcanvas show={sidebarRemove.isShown} placement='end' onHide={defaultSidebarRemove}>
      <OffcanvasHeader style={{ background: 'navy' }} closeButton closeVariant='white'>
        <OffcanvasTitle className='text-white fs-5'>Remove Widgets</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody className='p-2'>
        <Nav variant='underline' style={{ '--bs-nav-underline-gap': 0 }} className='position-relative w-100' defaultActiveKey={category}>
          <NavItem className='w-25'>
            <NavLink eventKey={'cspm'} className={`text-center text-muted border-0`} tabIndex={0} onClick={handleChangeCategory}>CSPM</NavLink>
          </NavItem>
          <NavItem className='w-25'>
            <NavLink eventKey={'cwpp'} className={`text-center text-muted border-0`} tabIndex={1} onClick={handleChangeCategory}>CWPP</NavLink>
          </NavItem>
          <span style={navActiveStyle} className='position-absolute bottom-0 bg-secondary' />
        </Nav>
        <Container fluid className='p-2'>
          {currentWidgets.find(currentWidget => currentWidget.category === category)?.widgets.map(widget => {
            return <FormGroup className='m-1' key={widget.id}>
              <FormCheck label={widget.title} checked={widgets.find(wid=>wid.id===widget.id)?true:false} onChange={()=>{handleChangeWidgets(widget)}} />
            </FormGroup>
          })}
          <ButtonGroup className='position-absolute bottom-0 end-0 m-3'>
            <Button variant='outline-primary' className='mx-2 rounded' onClick={defaultSidebarRemove}>Cancel</Button>
            <Button variant='primary' className='mx-2 rounded' onClick={handleSubmitWidgets}>Confirm</Button>
          </ButtonGroup>
        </Container>
      </OffcanvasBody>
    </Offcanvas>
  )
} 

export default SidebarRemove