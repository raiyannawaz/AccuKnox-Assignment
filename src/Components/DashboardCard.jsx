import { Clear } from "@mui/icons-material"
import { Button } from '@mui/material';

const DashboardCard = ({widget, handleRemove}) => {
    return (
        <div className="col-lg-4 col-12" key={widget.id}>
            <div className="dashboard-card bg-white shadow rounded p-3">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h6>{widget.title}</h6>
                        <p>{widget.data}</p>
                    </div>
                    <Button size='medium' variant='outlined' onClick={()=>{handleRemove(widget.id, widget.category)}}><Clear /></Button>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard