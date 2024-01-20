export function RMQ_CONFIG() {
  const host = process.env.RMQ_HOST || 'localhost';
  const port = parseInt(process.env.RMQ_PORT) || 5672;
  const username = process.env.RMQ_USERNAME;
  const password = process.env.RMQ_PASSWORD;

  let url = null;
  if (!username && !password) {
    url = `amqp://${host}:${port}`;
  } else {
    url = `amqp://${username}:${password}@${host}:${port}`;
  }

  return url;
}
