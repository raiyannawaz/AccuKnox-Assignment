import {
    Navbar, Form, FormGroup, FormControl, 
    Breadcrumb, BreadcrumbItem, Button, 
    NavbarCollapse, NavbarToggle
} from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'

function Navs({search, handleSearchChange}) {

    let isMobile = useMediaQuery({maxWidth: 450})

    return (
        <Navbar expand='lg' className='bg-white shadow-sm px-lg-4 px-2 w-100'>
            <Breadcrumb className='px-2'>
                <BreadcrumbItem href='#'>Home</BreadcrumbItem>
                <BreadcrumbItem href='#' active>Dashboard</BreadcrumbItem>
            </Breadcrumb>
            <NavbarToggle variant='outline-primary' aria-controls='formCollapse' />
            <NavbarCollapse id='formCollapse'>
                <Form className='d-flex ms-auto gap-2 w-full mt-lg-0 pt-2'>
                    <FormGroup>
                        <FormControl size={isMobile?'sm':''} value={search} onChange={handleSearchChange} placeholder='Search'/>
                    </FormGroup>
                    <Button size={isMobile?'sm':''} variant='outline-primary'>Search</Button>
                </Form>
            </NavbarCollapse>
        </Navbar>
    )
}

export default Navs