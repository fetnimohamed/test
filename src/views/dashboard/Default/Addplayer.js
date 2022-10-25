import React from 'react';
import { Formik } from 'formik';
import { TextField, Button, Stack } from '@mui/material';
import usePlayerService from 'services/player.service';

export const Addplayer = () => {
    const { addPlayer } = usePlayerService();
    const [file, setFile] = React.useState();
    return (
        <div>
            <h1>Add player</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    bith: '',
                    picture: '',
                    poste: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('firstName', values.firstName);
                    formData.append('lastName', values.lastName);
                    formData.append('birth', values.bith);
                    formData.append('poste', values.poste);
                    console.log(formData);
                    const response = await addPlayer(formData);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ mt: 2 }}
                            type="text"
                            label="First name"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            type="text"
                            label="Last name"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            type="date"
                            label="Bithday date"
                            name="bith"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bith}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            type="text"
                            label="Position"
                            name="poste"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.post}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            type="file"
                            onChange={(event) => {
                                console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;', event.target.files[0].name);
                                setFile(event.target.files[0]);
                            }}
                            onBlur={handleBlur}
                        />
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Button variant="contained" justifyContent="end" alignItems="end" type="submit">
                                Add player
                            </Button>
                            <Button variant="contained" justifyContent="end" alignItems="end" color="error">
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </div>
    );
};
