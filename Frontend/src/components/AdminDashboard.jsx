import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import UserTable from './UserTable';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('/api/v1/admin', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (response.status === 401) {
                    dispatch({ type: 'LOGOUT' });
                    localStorage.removeItem('userActivities');
                    localStorage.removeItem('activities');
                    localStorage.removeItem('userEvents');
                    localStorage.removeItem('events');
                    localStorage.removeItem('user');
                    navigate('/');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                const data = await response.json();
                setStatistics(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [user.token]);

    if (loading) return <Loading />;
    if (error) return <Error error={error} />;

    const statisticsData = [
        { title: 'Total Users', value: statistics.totalUsers, color: theme.palette.primary.main },
        { title: 'Total Activities', value: statistics.totalActivities, color: theme.palette.secondary.main },
        { title: 'Total Events', value: statistics.totalEvents, color: theme.palette.info.main },
        { title: 'Total Announcement', value: statistics.totalAnnouncement, color: theme.palette.success.main },
        { title: 'Total Reserved Activity Slots', value: statistics.totalReservedActivities, color: theme.palette.warning.main },        
        { title: 'Total Reserved Event Slots', value: statistics.totalReservedEvents, color: theme.palette.error.main },
     
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" component="div" sx={{ mb: 3 }}>
                Administration Dashboard
            </Typography>
            <Grid container spacing={3}>
                {statisticsData.map((stat, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h2" sx={{ color: stat.color, fontWeight: 'bold' }}>
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <UserTable />
        </Box>
    );
};

export default AdminDashboard;
