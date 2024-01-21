export const rabbitMqEmitMock = jest.fn();
rabbitMqEmitMock.prototype.publish = jest.fn();
