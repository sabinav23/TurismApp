import React, { useReducer, useEffect, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Chip } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Autocomplete } from '@material-ui/lab';
import { Location } from '../models/Location';
import { counties } from '../utils/counties';

type State = {
  title: string;
  shortDescription: string;
  mainDescription: string;
  county: string;
  city: string;
  streetName: string;
  streetNumber: number;
  email: string;
  phone: string;
  price: number;
  capacity: number;
  isButtonDisabled: boolean;
  isAddDescriptionVisible: boolean;
  presentationImage: File | null;
  allImages: File[];
  showFiles: boolean;
  showAmenities: boolean;
  amenity: string;
  amenities: string[];
};

const initialState: State = {
  title: '',
  shortDescription: '',
  mainDescription: '',
  county: '',
  city: '',
  streetName: '',
  streetNumber: 0,
  email: '',
  phone: '',
  price: 0,
  capacity: 0,
  isButtonDisabled: true,
  isAddDescriptionVisible: false,
  presentationImage: null,
  allImages: [],
  showFiles: false,
  showAmenities: false,
  amenity: '',
  amenities: [],
};

type Action =
  | { type: 'setTitle'; payload: string }
  | { type: 'setShortDescription'; payload: string }
  | { type: 'setMainDescription'; payload: string }
  | { type: 'setCounty'; payload: string }
  | { type: 'setCity'; payload: string }
  | { type: 'setStreetName'; payload: string }
  | { type: 'setStreetNumber'; payload: number }
  | { type: 'setEmail'; payload: string }
  | { type: 'setPhoneNumber'; payload: string }
  | { type: 'setPrice'; payload: number }
  | { type: 'setCapacity'; payload: number }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'setPresentationImage'; payload: File | null }
  | { type: 'setAllImages'; payload: File[] }
  | { type: 'setIsAddDescriptionVisible'; payload: boolean }
  | { type: 'setShowFiles'; payload: boolean }
  | { type: 'setShowAmenities'; payload: boolean }
  | { type: 'setAmenity'; payload: string }
  | { type: 'setAmenities'; payload: string[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setTitle':
      return {
        ...state,
        title: action.payload,
      };
    case 'setShortDescription':
      return {
        ...state,
        shortDescription: action.payload,
      };
    case 'setMainDescription':
      return {
        ...state,
        mainDescription: action.payload,
      };
    case 'setCounty':
      return {
        ...state,
        county: action.payload,
      };
    case 'setCity':
      return {
        ...state,
        city: action.payload,
      };
    case 'setStreetName':
      return {
        ...state,
        streetName: action.payload,
      };
    case 'setStreetNumber':
      return {
        ...state,
        streetNumber: action.payload,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload,
      };
    case 'setPhoneNumber':
      return {
        ...state,
        phone: action.payload,
      };
    case 'setPrice':
      return {
        ...state,
        price: action.payload,
      };
    case 'setCapacity':
      return {
        ...state,
        capacity: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'setPresentationImage':
      return {
        ...state,
        presentationImage: action.payload,
      };
    case 'setAllImages':
      return {
        ...state,
        allImages: action.payload,
      };
    case 'setIsAddDescriptionVisible':
      return {
        ...state,
        isAddDescriptionVisible: action.payload,
        showFiles: false,
        showAmenities: false,
      };
    case 'setShowFiles':
      return {
        ...state,
        showFiles: action.payload,
        showAmenities: false,
        isAddDescriptionVisible: false,
      };
    case 'setShowAmenities':
      return {
        ...state,
        showAmenities: action.payload,
        showFiles: false,
        isAddDescriptionVisible: false,
      };
    case 'setAmenity':
      return {
        ...state,
        amenity: action.payload,
      };
    case 'setAmenities':
      return {
        ...state,
        amenities: action.payload,
        amenity: '',
      };
  }
};

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '90vh',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageCard: {
      width: '90%',
      height: '90%',
      boxShadow: '5px 5px 18px -1px rgba(0,0,0,0.82)',
      position: 'relative',
    },
    card: {
      height: '100%',
      flexDirection: 'column',
      width: '80%',
      paddingTop: 30,
      display: 'flex',
    },
    media: {
      width: '100%',
      height: '100%',
    },
    container: {
      zIndex: 2,
      width: '40%',
      display: 'flex',
      position: 'absolute',
      top: 135,
      left: 150,
      opacity: 0.9,
      textAlign: 'center',
    },
    bookingBtn: {
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    payment: {
      display: 'flex',
      marginLeft: 20,
      fontSize: 18,
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      width: '80%',
    },
    wrappedContent: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    addLocation: {
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
    },
    addDetailedDescription: {
      fontSize: '12',
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
    },
    addDescriptionButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    DescriptionBox: {
      position: 'absolute',
      zIndex: 2,
      height: 530,
      width: '40%',
      top: 135,
      right: 150,
      opacity: 0.9,
      textAlign: 'center',
    },
    TextAreaDesc: {
      height: '70%',
      width: '70%',
      minHeight: '20%',
      marginBottom: 40,
    },
    DescriptionCard: {
      height: '100%',
    },
    descriptionDetails: {
      height: '100%',
    },
    makeStylesTextAreaDesc17: {
      height: '70%',
    },
    saveDescription: {
      width: '20%',
      display: 'flex',
      justifyContent: 'center',
    },
    saveButtonStyle: {
      display: 'flex',
      justifyContent: 'center',
    },
    imageInput: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageChips: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    imageChip: {
      marginBottom: '10px',
    },
    addFiles: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    filesContainer: {
      height: 'calc(100% - 140px)',
    },
    amenitiesContainer: {
      height: 'calc(100% - 90px)',
    },
    amenitiesInput: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 15,
      marginRight: 15,
    },
    addAmenity: {
      marginLeft: 15,
    },
  });
});

interface AddLocationFormProps {
  isAccomodation: boolean;
  addLocation: any;
  state?: Location;
  isEditing?: boolean;
}

const dataURItoBlob = (dataURI: string, name: string) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString = atob(dataURI);

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ia], name, { type: 'image/png' });
};

const getPresentationImage = (location: Location) => {
  const presentationImage = location.images.find((i) => i.isPresentationImage);

  if (!presentationImage?.data) {
    return null;
  }

  return dataURItoBlob(presentationImage.data, presentationImage.title);
};

const getImages = (location: Location) => {
  const presentationImages = location.images.filter(
    (i) => !i.isPresentationImage
  );

  return presentationImages.map((i) => dataURItoBlob(i.data, i.title));
};

const AddLocationForm = ({
  isAccomodation,
  addLocation,
  state: initialLocationState,
  isEditing,
}: AddLocationFormProps) => {
  const classes = useStyles();

  const locationState: State | null = initialLocationState
    ? {
        ...initialLocationState,
        isAddDescriptionVisible: false,
        isButtonDisabled: false,
        showAmenities: false,
        showFiles: false,
        presentationImage: getPresentationImage(initialLocationState),
        allImages: getImages(initialLocationState),
        amenity: '',
        amenities: initialLocationState.amenities.map((a) => a.label),
        streetNumber: parseInt(initialLocationState.streetNumber),
      }
    : null;

  const [state, dispatch] = useReducer(reducer, locationState || initialState);

  const presentationImageInput = useRef<any>();
  const allImagesInput = useRef<any>();

  useEffect(() => {
    const accomodationSpecific = isAccomodation
      ? state.price && state.capacity
      : true;
    if (
      state.title.trim() &&
      state.shortDescription.trim() &&
      state.mainDescription.trim() &&
      state.county.trim() &&
      state.city.trim() &&
      state.streetName.trim() &&
      state.streetNumber &&
      state.email.trim() &&
      state.phone.trim() &&
      state.presentationImage &&
      accomodationSpecific
    ) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [
    state.title,
    state.shortDescription,
    state.mainDescription,
    state.county,
    state.city,
    state.streetName,
    state.streetNumber,
    state.email,
    state.phone,
    state.price,
    state.presentationImage,
    state.capacity,
  ]);

  const handleAddLocation = () => {
    addLocation({ ...state, isAccomodation });
  };

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (
      (event.keyCode === 13 || event.which === 13) &&
      !state.isButtonDisabled
    ) {
      handleAddLocation();
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setTitle',
      payload: event.target.value,
    });
  };
  const handleShortDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setShortDescription',
      payload: event.target.value,
    });
  };

  const handleMainDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'setMainDescription',
      payload: event.target.value,
    });
  };

  const handleCountyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    dispatch({
      type: 'setCounty',
      payload: value || '',
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setEmail',
      payload: event.target.value,
    });
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setPhoneNumber',
      payload: event.target.value,
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setCity',
      payload: event.target.value,
    });
  };

  const handleStreetNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setStreetName',
      payload: event.target.value,
    });
  };

  const handleStreetNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'setStreetNumber',
      payload: parseInt(event.target.value),
    });
  };

  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setAmenity',
      payload: event.target.value,
    });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setPrice',
      payload: parseInt(event.target.value),
    });
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'setCapacity',
      payload: parseInt(event.target.value),
    });
  };

  const handleAddDescriptionVisibility = () => {
    dispatch({
      type: 'setIsAddDescriptionVisible',
      payload: !state.isAddDescriptionVisible,
    });
  };

  const handlePresentationImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event?.target?.files;

    if (files) {
      const presentationFile = files[0];
      dispatch({ type: 'setPresentationImage', payload: presentationFile });
    }

    presentationImageInput.current.value = null;
  };

  const handlePresentationImageDelete = () => {
    dispatch({ type: 'setPresentationImage', payload: null });
  };

  const handleAllImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (files) {
      const allImages = [];

      for (let i = 0; i < files.length; i++) {
        allImages.push(files[i]);
      }

      dispatch({
        type: 'setAllImages',
        payload: [...state.allImages, ...allImages],
      });
    }

    allImagesInput.current.value = null;
  };

  const handleAllImagesDelete = (name: string) => {
    const files = state.allImages.filter((file) => file.name !== name);
    dispatch({ type: 'setAllImages', payload: files });
  };

  const handleAmenityDelete = (name: string) => {
    const amenities = state.amenities.filter((amenity) => amenity !== name);
    dispatch({ type: 'setAmenities', payload: amenities });
  };

  const closeFiles = () => {
    dispatch({ type: 'setShowFiles', payload: false });
  };

  const showFiles = () => {
    dispatch({ type: 'setShowFiles', payload: !state.showFiles });
  };

  const showAmenities = () => {
    dispatch({ type: 'setShowAmenities', payload: !state.showAmenities });
  };

  const addAmenity = () => {
    dispatch({
      type: 'setAmenities',
      payload: [...state.amenities, state.amenity],
    });
  };

  return (
    <>
      <form className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <TextField
              fullWidth
              id='title'
              type='text'
              label='Titlu'
              placeholder='Titlu'
              margin='normal'
              onChange={handleTitleChange}
              onKeyPress={handleKeypress}
              value={state.title}
            />
            <TextField
              fullWidth
              id='shortDescription'
              type='text'
              label='Scurta descriere'
              placeholder='Scurta descriere'
              margin='normal'
              onChange={handleShortDescriptionChange}
              onKeyPress={handleKeypress}
              value={state.shortDescription}
            />
            <div className={classes.wrappedContent}>
              <Autocomplete
                options={counties}
                onChange={handleCountyChange}
                value={state.county}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Judet'
                    placeholder='County'
                    margin='normal'
                    InputProps={{ ...params.InputProps, className: '' }}
                  />
                )}
              />
              <TextField
                id='city'
                type='text'
                label='Oras'
                placeholder='city'
                margin='normal'
                onChange={handleCityChange}
                onKeyPress={handleKeypress}
                value={state.city}
              />
            </div>
            <div className={classes.wrappedContent}>
              <TextField
                id='streetName'
                type='text'
                label='Strada'
                placeholder='streetName'
                margin='normal'
                onChange={handleStreetNameChange}
                onKeyPress={handleKeypress}
                value={state.streetName}
              />
              <TextField
                id='streetNumber'
                type='text'
                label='Numar'
                placeholder='streetNumber'
                margin='normal'
                onChange={handleStreetNumberChange}
                onKeyPress={handleKeypress}
                value={state.streetNumber}
              />
            </div>
            <div className={classes.wrappedContent}>
              <TextField
                id='email'
                type='text'
                label='Email'
                placeholder='email'
                margin='normal'
                onChange={handleEmailChange}
                onKeyPress={handleKeypress}
                value={state.email}
              />
              <TextField
                id='phoneNumber'
                type='text'
                label='Numarul de telefon'
                placeholder='phoneNumber'
                margin='normal'
                onChange={handlePhoneNumberChange}
                onKeyPress={handleKeypress}
                value={state.phone}
              />
            </div>
            {isAccomodation && (
              <div className={classes.wrappedContent}>
                <TextField
                  id='pricePerNight'
                  type='number'
                  label='Pretul pe noapte'
                  placeholder='pricePerNight'
                  margin='normal'
                  onChange={handlePriceChange}
                  onKeyPress={handleKeypress}
                  InputProps={{ inputProps: { min: 1 } }}
                  value={state.price}
                />
                <TextField
                  id='capacity'
                  type='number'
                  label='Camere'
                  placeholder='Camere'
                  margin='normal'
                  onChange={handleCapacityChange}
                  onKeyPress={handleKeypress}
                  InputProps={{ inputProps: { min: 1 } }}
                  value={state.capacity}
                />
              </div>
            )}

            <div className={classes.addDescriptionButton}>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={handleAddDescriptionVisibility}
              >
                {isEditing
                  ? 'Modifica descrierea detaliata'
                  : 'Adauga descriere detaliata'}
              </Button>
            </div>
            <div className={classes.addDescriptionButton}>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={showFiles}
              >
                {isEditing ? 'Modifica imagini' : 'Adauga imagini'}
              </Button>
            </div>
            {isAccomodation && (
              <div className={classes.addDescriptionButton}>
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={showAmenities}
                >
                  {isEditing ? 'Modifica facilitati' : 'Adauga facilitati'}
                </Button>
              </div>
            )}

            <CardActions>
              <Button
                className={classes.addLocation}
                variant='contained'
                size='large'
                color='secondary'
                onClick={handleAddLocation}
                disabled={state.isButtonDisabled}
              >
                {isEditing ? 'Modifica locatia' : 'Publica locatia'}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
      {state.isAddDescriptionVisible && (
        <div className={classes.DescriptionBox}>
          <Card className={classes.DescriptionCard}>
            <div className={classes.descriptionDetails}>
              <h1>Adauga descrierea</h1>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3}
                rowsMax={10}
                className={classes.TextAreaDesc}
                onChange={handleMainDescriptionChange}
                value={state.mainDescription}
              />
              <CardActions className={classes.saveButtonStyle}>
                <Button
                  className={classes.saveDescription}
                  variant='contained'
                  size='large'
                  color='secondary'
                  disabled={false}
                  onClick={handleAddDescriptionVisibility}
                >
                  Salveaza
                </Button>
              </CardActions>
            </div>
          </Card>
        </div>
      )}
      {state.showFiles && (
        <div className={classes.DescriptionBox}>
          <Card className={classes.DescriptionCard}>
            <div className={classes.descriptionDetails}>
              <h1>Adauga Imagini</h1>
              <div className={classes.filesContainer}>
                <div className={classes.imageInput}>
                  {state.presentationImage && (
                    <div className={classes.imageChips}>
                      <div className={classes.imageChip}>
                        <Chip
                          label={state.presentationImage.name}
                          onDelete={handlePresentationImageDelete}
                          color='primary'
                        />
                      </div>
                    </div>
                  )}
                  <input
                    accept='image/*'
                    id='presentation-image'
                    type='file'
                    hidden
                    onChange={handlePresentationImage}
                    ref={presentationImageInput}
                  />
                  <label htmlFor='presentation-image'>
                    <Button
                      variant='contained'
                      component='span'
                      color='secondary'
                    >
                      Adauga imagine principala
                    </Button>
                  </label>
                </div>
                <div className={classes.imageInput}>
                  {state.allImages && (
                    <div className={classes.imageChips}>
                      {state.allImages.map(({ name }) => (
                        <div className={classes.imageChip} key={name}>
                          <Chip
                            label={name}
                            onDelete={() => handleAllImagesDelete(name)}
                            color='primary'
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    accept='image/*'
                    id='all-images'
                    type='file'
                    multiple
                    hidden
                    onChange={handleAllImages}
                    ref={allImagesInput}
                  />
                  <label htmlFor='all-images'>
                    <Button
                      variant='contained'
                      component='span'
                      color='secondary'
                    >
                      Adauga mai multe imagini
                    </Button>
                  </label>
                </div>
              </div>
              <CardActions className={classes.saveButtonStyle}>
                <Button
                  className={classes.saveDescription}
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={closeFiles}
                >
                  Salveaza
                </Button>
              </CardActions>
            </div>
          </Card>
        </div>
      )}
      {state.showAmenities && (
        <div className={classes.DescriptionBox}>
          <Card className={classes.DescriptionCard}>
            <div className={classes.amenitiesContainer}>
              <h1>Adauga facilitati</h1>
              <div className={classes.amenitiesInput}>
                <TextField
                  fullWidth
                  type='text'
                  label='Facilitate'
                  placeholder='Facilitate'
                  margin='normal'
                  onChange={handleAmenityChange}
                />
                <Button
                  className={classes.addAmenity}
                  variant='contained'
                  size='large'
                  color='secondary'
                  disabled={false}
                  onClick={addAmenity}
                >
                  Adauga
                </Button>
              </div>
              {state.amenities.map((amenity) => (
                <div className={classes.imageChip} key={amenity}>
                  <Chip
                    label={amenity}
                    onDelete={() => handleAmenityDelete(amenity)}
                    color='primary'
                  />
                </div>
              ))}
            </div>
            <CardActions className={classes.saveButtonStyle}>
              <Button
                className={classes.saveDescription}
                variant='contained'
                size='large'
                color='secondary'
                disabled={false}
                onClick={showAmenities}
              >
                Salveaza
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddLocationForm;
