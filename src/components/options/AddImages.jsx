import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function AddImages({setOpen,setItemData}) {
    const [showimages,setShowImages] = useState([]);
    const setImages = (e)=>{
        let imagedata = [];
        setShowImages([])
        for(let i=0;i<e.target.files.length;i++){
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[i])
            reader.onload = async ()=> {
                const base64 = await reader.result;
                imagedata.push(base64.toString())
                setShowImages(imagedata);
            };
        }
    }
    const handleDelete = (key)=>{
        setShowImages(showimages.filter((img,index)=>{
            return index!==key;
        }))
    }
    const handleAdd = async ()=>{
        const data = await axios.post(process.env.REACT_APP_SERVER_URL+"/user/addimages",
        {
            images:showimages
        },{
            withCredentials: true
        })
        if(data.status===200){
            alert(data.data.message);
            const url = process.env.REACT_APP_SERVER_URL+"/user/getimages";
            const raw = await axios.get(url,{ withCredentials: true });
            setItemData(raw.data.images)
            setOpen(false);
        }else{
            alert(data.data.message);
        }
    }
    return (
        <div className='myimages'>
            <div className="selected_images">
                {showimages.length?showimages.map((image,ind)=>{
                    return (
                        <div className="imagebox">
                            <DeleteIcon onClick={()=>handleDelete(ind)}/>
                            <img src={image} key={image+ind} alt="uploaded_images" />
                        </div>
                    )
                }):null}
            </div>
            <input style={{color:"transparent"}} onChange={setImages} type='file' accept="image/*" multiple />
            <Button onClick={handleAdd} variant="contained" color="success">Add</Button>
        </div>
    )
}
