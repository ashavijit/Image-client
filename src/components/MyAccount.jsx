import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function MyAccount({user}) {
    return (
        <div className="card">
            <Card >
                <CardContent>
                    <Avatar sx={{ width: 60, height: 60 }}  src={user.picture}></Avatar>
                    <Typography variant="h5" component="div">
                        {user.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
