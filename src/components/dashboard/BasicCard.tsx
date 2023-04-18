import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Listen } from '../../types';
import * as d3 from 'd3';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface BasicCardProps {
    song: Listen
}



export default function BasicCard({song}: BasicCardProps) {

    // create a function that takes seconds and returns a string of the format "w, days, x hours, y minutes, z seconds" only show the ones that are not 0
    const formatTime = (seconds: number) => {
        const weeks = Math.floor(seconds / (3600 * 24 * 7));
        seconds -= weeks * 3600 * 24 * 7;
        const days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        const hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        let timeString = "";
        if (weeks > 0) {
            timeString += `${weeks} weeks, `;
        }
        if (days > 0) {
            timeString += `${days} days, `;
        }
        if (hours > 0) {
            timeString += `${hours} hours, `;
        }
        if (minutes > 0) {
            timeString += `${minutes} minutes, `;
        }
        if (seconds > 0) {
            timeString += `${d3.format(".0f")(seconds)} seconds, `;
        }

        return timeString;
    }

  return (
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Most Listened to Song (or Podcast)
            </Typography>
            <Typography variant="h5" component="div">
                {song.trackName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {song.artistName}
            </Typography>
            <Typography variant="body2">
                {formatTime(song.seconds)}
            </Typography>
        </CardContent>
    </Card>
  );
}