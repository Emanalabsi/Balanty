import { Request } from 'express';
import { Match, Player, User } from '../models';
import updatedPLayerSchema from '../validations/playerSchema';

const getPlayerService = async (id: number) => {
  const isPLayerExist = await Player.findOne({ where: { UserId: id } });

  if (!isPLayerExist) {
    return {
      status: 401,
      messege: 'هذا اللاعب غير موجود',
    };
  }

  const player = await User.findOne({
    where: { id },
    attributes: ['username', 'phone', 'id'],
    include: [
      {
        model: Player,
      },
    ],
  });

  return player;
};

const updatePlayerService = async (req: Request) => {
  // const { UserId } = req.UserData;

  const playerId = 5;
  const { body } = req;
  const isPLayerExist = await Player.findOne({ where: { UserId: playerId } });

  if (!isPLayerExist) {
    return {
      status: 401,
      data: 'هذا اللاعب غير متاح',
    };
  }
  await updatedPLayerSchema.validateAsync(body);

  const updatedPlayer = await Player.update(
    { ...body },
    {
      where: { UserId: playerId },
    },
  );

  return {
    status: 200,
    data: {
      message: 'تم الحفظ بنجاح',
      user: updatedPlayer,
    },
  };
};

const playerMatchesService = async (id: number) => {
  const isPLayerExist = Player.findOne({ where: { UserId: id } });
  if (!isPLayerExist) {
    return {
      status: 401,
      message: 'هذا اللاعب غير موجود',
    };
  }
  const playerMatches = await Match.findAll({
    where: { UserId: id },
  });
  return playerMatches;
};

export { getPlayerService, updatePlayerService, playerMatchesService };
