import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Widget from './Widget'
import { useMediaQuery } from 'react-responsive'

function Dashboard({search, filteredWidgets, currentWidgets, handleSidebarAdd}) {

  let isMobile = useMediaQuery({maxWidth: 450})

  return (
       <Container fluid className='px-lg-5'>
        <Row className='mx-0'>
          { search ? filteredWidgets.map((filteredWidget)=>{
            return <Col sm={12} className={`mb-lg-3 mb-4 ${filteredWidget.widgets.length > 0 ? '' : 'd-none'}`} key={filteredWidget.id}>
              { isMobile ? <h6>{filteredWidget.title}</h6> : <h5>{filteredWidget.title}</h5>}
              <Row className='g-2'>
              {filteredWidget.widgets.map(widget=><Widget widget={widget} key={widget.id}/>)}
              </Row>
            </Col>
          }): currentWidgets.map((currentWidget, index)=>{
            return <Col sm={12} className='mb-lg-3 mb-4' key={currentWidget.id}>
              { isMobile ?  <h6>{currentWidget.title}</h6> : <h5>{currentWidget.title}</h5>}
              <Row className='g-2'>
              {currentWidget.widgets.map(widget=><Widget widget={widget} key={widget.id}/>)}
              <Col lg={4} md={10}>
                <Card className='bg-light d-flex justify-content-center align-items-center' style={{height: '225px'}}>
                  <Button className='btn bg-light text-dark btn-outline-dark' onClick={()=>{handleSidebarAdd(currentWidget.category, index)}}>+ Add Widget</Button>
                </Card>
              </Col>
              </Row>
            </Col>
          })}
        </Row>
      </Container>
  )
}

export default Dashboard