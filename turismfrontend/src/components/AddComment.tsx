import React, { useEffect, useReducer, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Card, CardContent } from '@material-ui/core';
import { useAddComment } from '../hooks/useAddComment';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      paddingTop: 10,
    },
    input: {
      border: '0px',
      width: '90%',
      outline: 'none',
    },
    addButton: {
      justifyContent: 'flex-end',
      fontSize: '10px',
    },
    profileImage: {
      alignSelf: 'center',
    },
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      width: '100%',
      marginLeft: 10,
    },
  })
);

type State = {
  comment: string;
  isDisabled: boolean;
  stars: number;
};

type Action =
  | { type: 'setComment'; payload: string }
  | { type: 'setStars'; payload: number }
  | { type: 'setIsDisabled'; payload: boolean };

const initialState: State = {
  comment: '',
  stars: 0,
  isDisabled: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setComment':
      return {
        ...state,
        comment: action.payload,
      };
    case 'setIsDisabled':
      return {
        ...state,
        isDisabled: action.payload,
      };
    case 'setStars':
      return { ...state, stars: action.payload };
  }
};

interface AddCommentProps {
  locationId: string | undefined;
}

const AddComment = (props: AddCommentProps) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const addComment = useAddComment();

  useEffect(() => {
    if (state.comment.trim()) {
      dispatch({
        type: 'setIsDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsDisabled',
        payload: true,
      });
    }
  }, [state.comment]);

  const handleCommentInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setComment',
      payload: event.target.value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if ((event.keyCode === 13 || event.which === 13) && !state.isDisabled) {
      handleAddComment();
    }
  };

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      return history.push('/login');
    }
    await addComment.mutateAsync({
      id: props.locationId,
      text: state.comment,
      stars: state.stars,
    });
    dispatch({
      type: 'setComment',
      payload: '',
    });
    dispatch({
      type: 'setStars',
      payload: 0,
    });
  };

  return (
    <Card
      style={{
        width: '55%',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: 15,
      }}
    >
      <CardContent className={classes.container}>
        <Avatar src='/broken-image.jpg' className={classes.profileImage} />
        <div className={classes.content}>
          <Rating
            precision={0.5}
            icon={<FavoriteIcon fontSize='inherit' />}
            value={state.stars}
            onChange={(e, newRating) =>
              dispatch({ type: 'setStars', payload: newRating || 0 })
            }
            className={`${classes.iconFilled}, ${classes.iconHover}`}
          />
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              placeholder='Scrie un comentariu...'
              value={state.comment}
              onChange={handleCommentInput}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant='contained'
              size='small'
              className={classes.addButton}
              disabled={state.isDisabled}
              onClick={handleAddComment}
            >
              Adauga
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddComment;
