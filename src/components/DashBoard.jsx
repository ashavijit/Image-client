import React,{useState,useEffect} from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import AddImages from './options/AddImages';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import ShowImage from './ShowImage';

const style = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, -100%)',
    width: "fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DashBoard() {
    const [open, setOpen] = useState(false);
    const [itemData,setItemData] = useState([]);
    const [message,setMessage] = useState(null);
    const [heading,setHeading] = useState(null);
    const [optionform,setOptionForm] = useState(null);
    const [modal,setModal] = useState(null);
    const option = {
        "Add Images":<AddImages setOpen={setOpen} setItemData={setItemData}/>
    }
    const handleOpen = (e) => {
        setHeading(e)
        setOptionForm(option[e]);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const actions = [
        { icon: <AddPhotoAlternateIcon />, name: 'Add Images' }
    ];
    const getImages = async ()=>{
        try{
            const url = process.env.REACT_APP_SERVER_URL+"/user/getimages";
            const raw = await axios.get(url, { withCredentials: true },{headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            }});
            if(raw.status===200){
                setItemData(raw.data.images)
            }else if(raw.status===206){
                setMessage(raw.data.message)
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getImages();
    },[])
    const openImage = (item)=>{
        setModal(item)
    }
    return (
        <div className="dashboard">
            {itemData.length===0?<h1 style={{textAlign:"center"}}>{message}</h1>:null}
            <div className="imageList">
                {itemData.map((item,ind) => (
                    <LazyLoadImage
                        key={"Image"+ind}
                        src={item.imageUrl}
                        effect="blur"
                        onClick={()=>openImage(item)}
                        style={{cursor:"pointer"}}
                    />
                ))}
            </div>
            {modal?<ShowImage item={modal} getImages={getImages}/>:null}
            <div className="modal">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {heading}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {optionform}
                        </Typography>
                    </Box>
                </Modal>
                <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={()=>handleOpen(action.name)}
                            defaultValue={action.name}
                        />
                    ))}
                </SpeedDial>
            </div>
        </div>
    )
}
