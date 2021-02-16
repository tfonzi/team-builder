import {useState} from 'react'
import {Link} from 'react-router-dom'
import FileBase from 'react-file-base64';


const Debug = ({addBerry}) => {
    
    const [berryName, setBerryName] = useState('')
    const [berryImage, setBerryImage] = useState('')
    const [berryDescription, setBerryDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault() //prevents from submitting to page

        if(!berryName){
            alert('Please add Berry Name')
            return
        }
        if(!berryImage){
            alert('Please add Berry Image')
            return
        }
        if(!berryDescription){
            alert('Please add Berry Description')
            return
        }

        addBerry({berryName, berryImage, berryDescription})

        setBerryName('')
        setBerryImage('')
        setBerryDescription('')
    }
    return (
        <>
            <h1>DEBUG MENU</h1>
            <form  onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Berry Name</label>
                    <input type="text" placeholder="Add Berry Name" value={berryName} onChange={(e) => setBerryName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Berry Image</label>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setBerryImage(base64)} />                
                </div>
                <div className="form-control form-control-check">
                    <label>Berry Description</label>
                    <input type="text" placeholder="Add Berry Description" value={berryDescription} onChange={(e) => setBerryDescription(e.target.value)} />
                </div>

                <input type="submit" value="Add Berry" className="btn btn-block" />
            </form>
            <Link to='/'> Return</Link>
        </>
    )
}

export default Debug
