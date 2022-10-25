import { useEffect, useState } from 'react';
import * as React from 'react';
// material-ui
import { Grid, Card, Box, CardActions, CardContent, Typography, Button, CardMedia, Modal } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import usePlayerService from 'services/player.service';
import { Addplayer } from './Addplayer';

// ==============================|| MODAL STYLING ||============================== //
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    //====================modal setup==================//
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //====================modal setup==================//
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState({});
    const { getAllPlayers, deletePlayer } = usePlayerService();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const players = await getAllPlayers();
        console.log(players);
        setPlayers(players);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                    <Button variant="contained" justifyContent="end" alignItems="end" onClick={() => setOpenAdd(true)}>
                        Add player
                    </Button>
                </Grid>
                {players.map((player) => {
                    return (
                        <Grid item xs={3}>
                            <React.Fragment>
                                <CardContent sx={{ border: 1, backgroundColor: 'white' }}>
                                    <CardMedia component="img" height="194" image="../../../assets/images/player.png" alt="Paella dish" />
                                    <Typography variant="h5" component="div">
                                        {player.firstName} {player.lastName}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {player.poste}
                                    </Typography>
                                    <Typography variant="body2">{player.birth}</Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => {
                                            setPlayer(player);
                                            handleOpen();
                                        }}
                                    >
                                        Delete player
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ ml: 2 }}
                                        onClick={() => {
                                            setPlayer(player);
                                            console.log(player);
                                            setOpenEdit(true);
                                        }}
                                    >
                                        Player details
                                    </Button>
                                </CardContent>
                            </React.Fragment>
                        </Grid>
                    );
                })}
            </Grid>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1>Delete Player</h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>
                            Are you sure you want to delete this player({player.lastName} {player.firstName}) ?
                        </h3>
                    </Typography>
                    <Button
                        variant="contained"
                        justifyContent="end"
                        alignItems="end"
                        sx={{ m: 2 }}
                        onClick={() => {
                            deletePlayer(player.id);
                            fetchData();
                            handleClose();
                        }}
                    >
                        YES
                    </Button>
                    <Button variant="contained" color="error" justifyContent="end" alignItems="end" sx={{ m: 2 }} onClick={handleClose}>
                        NO
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(flase)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1>
                            {player.firstName} {player.lastName}
                        </h1>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        picture:{player.picture}
                        <img src={player.picture} alt={player.lastName} />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        birthdate: {player.birth}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        position : {player.poste}
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        justifyContent="end"
                        alignItems="end"
                        sx={{ m: 2 }}
                        onClick={() => setOpenEdit(false)}
                    >
                        CLOSE
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openAdd}
                onClose={() => setOpenAdd(flase)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Addplayer />
                </Box>
            </Modal>
        </>
    );
};

export default Dashboard;
