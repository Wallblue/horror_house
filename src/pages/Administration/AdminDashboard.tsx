import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { AccessTime, Explore, People } from '@mui/icons-material';
import adminStyles from "../../css/Administration.module.css"
import { To, useNavigate } from 'react-router-dom';

interface Panel{
  title: string;
  icon: React.ReactNode;
  to: To;
};

const panels: Panel[] = [
  { title: 'Utilisateurs', icon: <People fontSize="large" />, to: "/admin/users"},
  { title: 'Sessions', icon: <Explore fontSize="large" />, to: ""},
  { title: 'Créneaux', icon: <AccessTime fontSize="large" />, to: ""},
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
      <Grid className={adminStyles.containerGrid} container spacing={3}>
        {panels.map((panel, index) => (
          <Grid key={index} margin={2} minWidth={201}>
            <Card
              className={adminStyles.cardAdmin}
              onClick={() => navigate(panel.to)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 12 }}>{panel.icon}</div>
                <Typography variant="h6">{panel.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
  );
}
