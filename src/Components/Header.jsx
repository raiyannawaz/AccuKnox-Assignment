import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { Plus, Trash } from 'react-bootstrap-icons'

function Header({ search, sidebarAdd, handleSidebarAdd, sidebarRemove, handleSidebarRemove }) {
    let isMobile = useMediaQuery({ maxWidth: 450 })
    return (
        <Container fluid className={`d-flex justify-content-between align-items-center px-lg-5 px-3 my-3 ${search ? 'py-1' : ''}`}>
            {isMobile ? <h5 className='mb-0'>CNAPP Dashboard</h5> : <h4 className='mb-0'>CNAPP Dashboard</h4>}
            {search ? '' : <ButtonGroup>
                <Button className={`${isMobile ? 'btn-sm' : 'btn'} rounded mx-1 btn-outline-dark bg-white text-dark`} onClick={()=>{handleSidebarAdd(sidebarAdd.category, sidebarAdd.index)}}>Add Widget <Plus /></Button>
                <Button className={`${isMobile ? 'btn-sm' : 'btn'} rounded mx-1`} onClick={()=>handleSidebarRemove(sidebarRemove.category)}><Trash /></Button>
            </ButtonGroup>}
        </Container>
    )
}

export default Header