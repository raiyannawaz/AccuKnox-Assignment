import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = ({ category, isSearching, handleAdd, handleRemove }) => {
    
    let { widgets } = category

    const [widgetDetails, setWidgetDetails] = useState({ title: '', data: '', id: '', category: category.id })

    const [isAdding, setIsAdding] = useState(false)
    
    const handleIsAdding = () => {
        setIsAdding(true)
    }

    const handleChange = (event) =>{
        let {name, value} = event.target;

        setWidgetDetails({...widgetDetails, [name]: value, id: new Date().getTime()})
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(widgetDetails.title !== '' || widgetDetails.data !== ''){
            handleAdd(widgetDetails)
            setWidgetDetails({title: '', data: '', id: '', category: category.id})
            setIsAdding(false)
        }
        else{
            alert('Please Write All Inputs')
        }
    }

    return (
        <div className="container-fluid pb-3">
            <h5>{isSearching && widgets.length === 0 ? '' : category.name}</h5>
            <div className="row g-3">
                {widgets.map(widget => {
                    return <DashboardCard widget={widget} handleRemove={handleRemove} key={widget.id} />
                }).concat( !isSearching &&
                    <div className="col-lg-4 col-12" key={`${category}-add-widget`}>
                        <div className="dashboard-card dashboard-card-add shadow rounded d-flex justify-content-center align-items-center">
                            {isAdding ? <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Title: </label>
                                    <input type="text" name='title' className='ms-2 form-control-sm' value={widgetDetails.title} onChange={handleChange} style={{ border: 'none', outline: 'none' }} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className='form-label'>Data: </label>
                                    <input type="text" name='data' className='ms-1 form-control-sm' value={widgetDetails.data} onChange={handleChange} style={{ border: 'none', outline: 'none' }} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type='submit' className='btn btn-sm btn-primary mx-auto'>Add</button>
                                </div>
                            </form>
                                : <Button onClick={handleIsAdding} size='medium' variant='outlined'><Add /> <span className='ps-2'>Add Widgets</span></Button>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard