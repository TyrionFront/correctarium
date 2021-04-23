import app from './app';

const server = app();
server.listen(3000, () => {
  console.log('Current app is listening on port 3000!');
});
