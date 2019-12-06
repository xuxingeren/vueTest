addEventListener('open', function (event) {
  event.send('Link Socket!');
});
addEventListener('message', function (event) {
  postMessage(event.data);
});