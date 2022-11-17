/* exported data */
var data = {
  view: 'generator',
  genre: {}
};

var previousDataJSON = localStorage.getItem('genre-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('genre-storage', dataJSON);
});
