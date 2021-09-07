import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Comment } from '../models/Comment';
import LocationRating from './LocationRating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 5,
      width: '55%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    commentHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    commentBox: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 15,
      marginTop: 10,
    },
    textBox: {
      justifyContent: 'flex-start',
      textAlign: 'left',
      marginLeft: '10',
      marginTop: 10,
    },
  })
);

type commentProps = {
  comments: Comment[];
};

function Comments(props: commentProps) {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardContent>
        {props.comments.map((comment) => (
          <div className={classes.commentBox}>
            <div className={classes.commentHeader}>
              <Avatar
                src={comment.user.avatar}
                style={{ justifyContent: 'center' }}
              />
              <h4
                style={{
                  alignSelf: 'center',
                  margin: 0,
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                {comment.user.firstName} {comment.user.lastName}
              </h4>
              <LocationRating stars={comment.stars} />
            </div>
            <div className={classes.textBox}> {comment.text} </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Comments;
