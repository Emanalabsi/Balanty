import { IMatchMessage, IResponseProps } from '../interfaces';
import { Match, Message } from '../models';

const addMessageService = async ({
  message,
  senderId,
  matchId,
}: IMatchMessage): Promise<IResponseProps> => {
  const newMessage = await Message.create({
    UserId: senderId,
    MatchId: matchId,
    message,
  });

  return {
    status: 201,
    data: {
      message: 'Message added successfully',
      newMessage,
    },
  };
};

const getMessageByIdService = async (
  messageId: number,
): Promise<IResponseProps> => {
  const message = await Message.findOne({ where: { id: messageId } });

  if (message) {
    return {
      status: 200,
      data: {
        message,
      },
    };
  } else {
    return {
      status: 404,
      data: {
        message: 'No message found',
      },
    };
  }
};

const getAllMessagesService = async (
  matchId: number,
): Promise<IResponseProps> => {
  const match = await Match.findOne({
    where: { id: matchId },
    include: [
      {
        model: Message,
        as: 'MatchMessages',
      },
    ],
  });

  if (match) {
    return {
      status: 200,
      data: {
        match,
      },
    };
  }
  return {
    status: 404,
    data: {
      message: 'Match not found',
    },
  };
};

const deleteMessageService: (
  id: string,
) => Promise<IResponseProps> = async id => {
  const message = await Message.findOne({ where: { id: Number(id) } });

  if (message) {
    await Message.destroy({ where: { id: Number(id) } });
    return {
      status: 200,
      data: {
        message: 'Message deleted successfully',
      },
    };
  } else {
    return {
      status: 404,
      data: {
        message: 'No message found',
      },
    };
  }
};

const editMessageService = async (
  id: number,
  newMessage: string,
): Promise<IResponseProps> => {
  const [updatedRows, [updatedMessage]] = await Message.update(
    { message: newMessage },
    { where: { id }, returning: true },
  );

  if (updatedRows) {
    return {
      status: 200,
      data: {
        message: 'Message updated successfully',
        updatedMessage,
      },
    };
  } else {
    return {
      status: 404,
      data: {
        message: 'Message not found',
      },
    };
  }
};

export {
  addMessageService,
  getMessageByIdService,
  getAllMessagesService,
  deleteMessageService,
  editMessageService,
};