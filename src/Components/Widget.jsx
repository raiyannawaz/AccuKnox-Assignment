import { Col,  Card } from 'react-bootstrap'

function Widget({widget}) {
    return (
        <Col lg={4} md={12} key={widget.id}>
            <Card className='bg-white p-3 shadow' style={{ height: '225px' }}>
                <h6 className='mb-0'>{widget.title}</h6>
            </Card>
        </Col>
    )
}

export default Widget