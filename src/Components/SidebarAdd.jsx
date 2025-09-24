import { useEffect, useState } from 'react'
import {
    Offcanvas, OffcanvasHeader,
    OffcanvasTitle, OffcanvasBody,
    Nav, NavItem, NavLink,
    Form, FormGroup,
    ButtonGroup, Button,
    FormControl, Container
} from 'react-bootstrap'

function SidebarAdd({ sidebarAdd, handleSidebarAdd, defaultSidebarAdd, handleAddWidget }) {

    let { category, index } = sidebarAdd

    const [ widget, setWidget ] = useState({title: '', text: ''})

    const handleChangeWidget = (event) =>{
        let { name, value } = event.target;
        setWidget({...widget, [name]: value})
    }

    const [navActiveStyle, setNavActiveStyle] = useState({
        height: '3px', width: '25%', left: `${index*25}`,
        transition: '0.3s all ease-in-out'
    })

    const handleChangeCategory = (event) => {
        let eventKey = event.target.dataset.rrUiEventKey;
        let tabIndex = event.target.tabIndex

        setNavActiveStyle({ ...navActiveStyle, left: `${tabIndex * 25}%` })
        handleSidebarAdd(eventKey, tabIndex)
    }

    const handleSubmitWidget = (event) =>{
        event.preventDefault()
        handleAddWidget(widget, category)
        defaultSidebarAdd()
        setWidget({title: '', text: ''})
    }

    useEffect(()=>{
        setNavActiveStyle({...navActiveStyle, left: `${index*25}%`})
    }, [category])

    return (
        <Offcanvas show={sidebarAdd.isShown} placement='end' onHide={defaultSidebarAdd}>
            <OffcanvasHeader style={{ background: 'navy' }} closeButton closeVariant='white'>
                <OffcanvasTitle className='text-white fs-5'>Add Widget</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody className='p-2'>
                <Nav variant='underline' style={{ '--bs-nav-underline-gap': 0 }} className='position-relative w-100' defaultActiveKey={category}>
                    <NavItem className='w-25'>
                        <NavLink eventKey={'cspm'} className={`${category === 'cspm' ? 'fw-bold' : 'fw-normal'} text-center text-muted border-0`} tabIndex={0} onClick={handleChangeCategory}>CSPM</NavLink>
                    </NavItem>
                    <NavItem className='w-25'>
                        <NavLink eventKey={'cwpp'} className={`${category === 'cwpp' ? 'fw-bold' : 'fw-normal'} text-center text-muted border-0`} tabIndex={1} onClick={handleChangeCategory}>CWPP</NavLink>
                    </NavItem>
                    <span style={navActiveStyle} className='position-absolute bottom-0 bg-secondary' />
                </Nav>
                <Container fluid className='py-3'>
                    <Form onSubmit={handleSubmitWidget}>
                        <FormGroup className='mb-3'>
                            <FormControl name='title' value={widget.title} onChange={handleChangeWidget} placeholder='Title'/>
                        </FormGroup>
                         <FormGroup>
                            <FormControl name='text' value={widget.text} onChange={handleChangeWidget} placeholder='Text'/>
                        </FormGroup>
                        <ButtonGroup className='position-absolute bottom-0 end-0 m-3'>
                            <Button variant='outline-primary' className='mx-2 rounded' onClick={defaultSidebarAdd}>Cancel</Button>
                            <Button type='submit' variant='primary' className='mx-2 rounded'>Confirm</Button>
                        </ButtonGroup>
                    </Form>
                </Container>
            </OffcanvasBody>
        </Offcanvas >
    )
}

export default SidebarAdd