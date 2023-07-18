import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import MatchCard from './MatchCard';
import { open } from '../../context';

interface Match {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  seats: number;
  stadiumMatch: {
    username: string;
    Stadium: {
      stadiumGallery: {
        image: string;
      }[];
    };
  };
  ownerUser: {
    username: string;
  };
  // eslint-disable-next-line no-use-before-define
  Players: Player[];
}

interface Player {
  id: number;
  avatar: string;
  age: number;
  position: string;
  cover: string;
  bio: string;
}

const MatchesPage = (): React.ReactElement => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string>('');
  const [join, setJoin] = useState<boolean>(false);

  const navigate = useNavigate();

  const { openPage } = useContext(open);

  const getMatches = async () => {
    try {
      const response = await axios.get('/api/v1/matches');
      const playerMatches = response.data.playerMatches.map(
        (match: { matchId: number }) => match.matchId,
      );
      const filteredMatches = response.data.data.filter(
        (math: Match) => !playerMatches.includes(math.id),
      );
      setMatches(filteredMatches);
    } catch (err) {
      setError('Error fetching match data');
      navigate('/serverError');
    }
  };

  useEffect(() => {
    getMatches();
  }, [openPage, join]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {error ? (
        <p>{error}</p>
      ) : (
        matches.map(match => (
          <MatchCard
            key={match.id}
            join={join}
            setJoin={setJoin}
            match={match}
          />
        ))
      )}
      {!matches.length && (
        <Alert severity="success" sx={{ marginTop: '8%', width: '300px' }}>
          لا يوجد دوريات حاليا
        </Alert>
      )}
    </Box>
  );
};

export default MatchesPage;
