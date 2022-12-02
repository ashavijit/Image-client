import React,{useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShowImage({item,getImages}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=>{
        handleOpen();
    },[item])
    const time = new Date(item.date).toLocaleTimeString(undefined, {timeZone: 'Asia/Kolkata'});
    const date = new Date(item.date).toLocaleDateString(undefined, {timeZone: 'Asia/Kolkata'});
    const handleDelete = async ()=>{
        try{
            const url = process.env.REACT_APP_SERVER_URL+"/user/deleteimage";
            const raw = await axios.post(url,
            {
                id:item._id
            },{
                withCredentials: true
            })
            if(raw.status===200){
                getImages()
                handleClose()
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div className="dateTime">
                        <h3 style={{margin:0}}>Date: {date.toString()}</h3>
                        <span>Time: {time.toString()}</span>
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <img style={{width:"30rem"}} src={item.imageUrl} alt="" />
                </Typography>
                <div className="deletebutton">
                    <DeleteIcon onClick={handleDelete}/>
                </div>
            </Box>
        </Modal>
    )
}
