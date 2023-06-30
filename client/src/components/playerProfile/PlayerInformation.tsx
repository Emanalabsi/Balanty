import React, { ReactElement, useState } from 'react';
import * as yup from 'yup';
import {
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { FlexBox } from '../stadiumProfile/StadiumProfile.styled';
import { BioBox } from './Player.Styled';
import EditInput from '../stadiumProfile/EditInput';
import updateProfileSchema from '../../validation/PLayerSchema';
import { updatedValue, profileInfoProps } from '../../interfaces/PLayerProfile';

const PlayerInformation = ({
  age,
  position,
  bio,
  phone,
  editMode,
  setEditMode,
}: profileInfoProps): ReactElement => {
  const [editable, setEditable] = useState(true);
  const [save, setSave] = useState(false);
  const [validation, setValidation] = useState<updatedValue>({});
  const [newData, setNewData] = useState<updatedValue>({});

  const handleClick = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      await updateProfileSchema.validate(newData, { abortEarly: false });
      const response = await axios.patch(
        '/api/v1/players/profile/edit',
        newData,
      );

      if (response.status === 200) {
        window.location.reload();
      }
      setEditMode(false);
      setSave(true);
      setValidation({});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};

        error.inner.forEach(err => {
          validationErrors[err.path as string] = err.message;
        });

        setValidation(validationErrors);
      } else {
        console.error(error);
      }
    }
  };

  const handleCancel = async () => {
    setSave(false);
    setEditable(false);
    setValidation({});
  };

  return (
    <Box sx={{ gap: '1px' }}>
      <BioBox
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <FlexBox sx={{ justifyContent: 'space-between' }}>
          <InputAdornment
            sx={{
              mr: '30px',
            }}
            position="end"
          >
            <IconButton onClick={handleClick}>
              <Edit />
            </IconButton>
          </InputAdornment>

          <Typography variant="h5" sx={{ ml: '5px' }}>
            معلومات شخصية
          </Typography>
        </FlexBox>

        <Box sx={{ width: '100%', mt: '10px' }}>
          <FlexBox sx={{ justifyContent: 'flex-end' }}>
            <EditInput
              setNewData={setNewData}
              name="bio"
              editMode={editMode}
              lastValue={bio}
              multiline
            />
            <Typography
              variant="body1"
              sx={{
                width: '7rem',
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              الوصف
            </Typography>
          </FlexBox>
          {validation.bio && (
            <Typography
              variant="body2"
              sx={{ color: 'red', textAlign: 'right' }}
            >
              {validation.bio}
            </Typography>
          )}
        </Box>

        <Box sx={{ width: '100%', mt: '10px' }}>
          <FlexBox sx={{ justifyContent: 'flex-end' }}>
            <EditInput
              setNewData={setNewData}
              name="age"
              editMode={editMode}
              lastValue={age}
              multiline={false}
            />
            <Typography
              variant="body1"
              sx={{
                width: '8rem',
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              العمر
            </Typography>
          </FlexBox>
          {validation.age && (
            <Typography
              variant="body2"
              sx={{ color: 'red', textAlign: 'right' }}
            >
              {validation.age}
            </Typography>
          )}
        </Box>

        <Box sx={{ width: '100%', mt: '10px' }}>
          <FlexBox sx={{ justifyContent: 'flex-end' }}>
            <EditInput
              setNewData={setNewData}
              name="phone"
              editMode={editMode}
              lastValue={phone}
              multiline={false}
            />
            <Typography
              variant="body1"
              sx={{
                width: '8rem',
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              الهاتف
            </Typography>
          </FlexBox>
          {validation.phone && (
            <Typography
              variant="body2"
              sx={{ color: 'red', textAlign: 'right' }}
            >
              {validation.phone}
            </Typography>
          )}
        </Box>

        <Box sx={{ width: '100%', mt: '10px' }}>
          <FlexBox sx={{ justifyContent: 'flex-end' }}>
            <EditInput
              setNewData={setNewData}
              name="position"
              editMode={editMode}
              lastValue={position}
              multiline={false}
            />
            <Typography
              variant="body1"
              sx={{
                width: '5rem',
                textAlign: 'right',
                fontWeight: 700,
              }}
            >
              : المركز
            </Typography>
          </FlexBox>
          {validation.position && (
            <Typography
              variant="body2"
              sx={{ color: 'red', textAlign: 'right' }}
            >
              {validation.position}
            </Typography>
          )}
        </Box>

        {editMode && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: '10px',
            }}
          >
            <Button onClick={handleCancel}>الغاء</Button>
            <Button onClick={handleUpdate}>حفظ</Button>
          </Box>
        )}
      </BioBox>
    </Box>
  );
};

export default PlayerInformation;
