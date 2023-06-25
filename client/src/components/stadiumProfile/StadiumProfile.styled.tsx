import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const arrowStyle = {};

export const ArrowStyle = styled(Box)({
  width: '35px',
  height: '35px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  color: 'white',
  fontSize: '34px',
  transition: '0.5s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: '#01031C',
    scale: '1.1',
  },
});

export const ThumbnailImage = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundPosition: 'bottom',
  backgroundSize: 'cover',
  gap: '3%',
  backgroundRepeat: 'no-repeat',
  width: '23%',
  height: '80px',
  transition: '0.4s',
  borderRadius: '5px',
  border: '1px solid #CCC',
});

export const ThumbnailBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const SliderImage = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundPosition: 'bottom',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  borderRadius: '5px',
});

export const SliderBox = styled(Box)({
  width: 'calc(100% - 240px)',
  borderRadius: '5px',
  height: '75vh',
});