import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { db } from '../firebase';
import AdminPageContainer from './AdminPageContainer';
import AdminNewJobForm from './AdminNewJobForm';
import AdminJobCard from './AdminJobCard';

const useStyles = makeStyles(theme => ({
  activeJob: {
    backgroundColor: 'blue'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export const AdminJobsPage = () => {
  const classes = useStyles();
  const [jobs, loading] = useCollectionData(db.collection('jobs'), {
    idField: 'id'
  });

  if (loading) {
    return (
      <AdminPageContainer>
        <LinearProgress />
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <Grid container>
        <Grid item md={4} xs={12}>
          <Paper>
            <List>
              {jobs.map(({ title, categories = [], id }, i) => (
                <ListItem
                  component={NavLink}
                  to={`/admin/jobs/${id}`}
                  activeClassName={classes.activeJob}
                  key={i}
                >
                  <ListItemText
                    primary={title}
                    secondary={categories.join(', ')}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item md xs={12}>
          <Switch>
            <Route exact path="/admin/jobs/new" component={AdminNewJobForm} />
            <Route path="/admin/jobs/:jobID" component={AdminJobCard} />
          </Switch>
        </Grid>
      </Grid>
      <Fab
        className={classes.fab}
        color="primary"
        component={Link}
        to="/admin/jobs/new"
      >
        <AddIcon />
      </Fab>
    </AdminPageContainer>
  );
};

export default AdminJobsPage;
