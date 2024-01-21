export const rabbitMqAckMock = jest.fn();
export const RmqContextMockInstance = {
  getChannelRef: jest.fn().mockReturnValue({
    ack: rabbitMqAckMock,
  }),
  getMessage: jest.fn().mockReturnValue({}),
  getPattern: jest.fn(),
  args: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
};
