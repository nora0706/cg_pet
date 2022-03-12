import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const listStyle = {
    width: '100%',
    bgcolor: 'background.paper',
};

function LoadList(props) {
    const { db, loadPet, setMsg } = props;
    const [petList, setPetList] = useState([]);

    useEffect(()=>{
        db.getList(setPetList, setMsg);
    }, [db, setMsg]);
    const deletePet = (e, pet) => {
        db.delete(pet.name, setMsg);
        db.getList(setPetList, setMsg);
        e.stopPropagation();
    }
    return (
        <Box sx={boxStyle}>
            <List sx={listStyle} component="nav" aria-label="mailbox folders">
                {petList.length > 0 ? petList.map((pet, idx) => (
                    <ListItem
                        button
                        divider
                        key={pet.name}
                        onClick={e => loadPet(pet)}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={e => deletePet(e, pet)}>
                                <DeleteIcon />
                            </IconButton>
                        }

                    >
                        <ListItemText primary={pet.name}/>
                    </ListItem>
                )) : <ListItem
                    button
                    divider
                >
                    <ListItemText primary="無紀錄" />
                </ListItem>}
            </List>
        </Box>
    );
}

export default LoadList;