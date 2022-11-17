/* global data */
var $musicList = document.querySelector('#music-list');
var $exploreButton = document.querySelector('.gen-but');
function getUserData() {
  var $noGenre = document.querySelector('.no-genres');
  $noGenre.className = 'hidden no-genres';
  var $list = document.querySelectorAll('.rando-li');
  for (var z = 0; z < $list.length; z++) {
    $list[z].remove();
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://binaryjazz.us/wp-json/genrenator/v1/genre/3');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      var $li = document.createElement('li');
      $li.textContent = xhr.response[i];
      $li.setAttribute('class', 'rando-li');
      $musicList.appendChild($li);
      var $icon = document.createElement('i');
      $icon.className = 'fa-regular fa-plus first';
      $li.appendChild($icon);
    }

  }); xhr.send();
}
$exploreButton.addEventListener('click', getUserData);

$musicList.addEventListener('click', addClicked);
function addClicked() {
  if (event.target.className === 'fa-regular fa-plus first') {
    var genreName = event.target.closest('li');
    data.genre[genreName.textContent] = [];
    var $selectionList = document.querySelector('#sel-list');
    $selectionList.appendChild(renderSelections(genreName.textContent));
    genreName.remove();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  swapViews(data.view);
  selectionLoop(data);
}
);

function renderSelections(render) {
  var $li = document.createElement('li');
  $li.textContent = render;
  $li.setAttribute('class', 'genreList');
  $li.setAttribute('data-genre', render);
  var $deleteBut = document.createElement('i');
  $deleteBut.className = 'fa-solid fa-trash-can second sel-trash';
  $li.appendChild($deleteBut);
  var $addBut = document.createElement('i');
  $addBut.className = 'fa-regular fa-plus second';
  $li.appendChild($addBut);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $li.appendChild($divRow);
  var $icon1 = document.createElement('i');
  $icon1.className = 'fa-solid fa-star gen-rate';
  $divRow.appendChild($icon1);
  var $icon2 = document.createElement('i');
  $icon2.className = 'fa-solid fa-star gen-rate';
  $divRow.appendChild($icon2);
  var $icon3 = document.createElement('i');
  $icon3.className = 'fa-solid fa-star gen-rate';
  $divRow.appendChild($icon3);
  var $icon4 = document.createElement('i');
  $icon4.className = 'fa-solid fa-star gen-rate';
  $divRow.appendChild($icon4);
  var $icon5 = document.createElement('i');
  $icon5.className = 'fa-solid fa-star gen-rate';
  $divRow.appendChild($icon5);
  return $li;
}
var $selectionList = document.querySelector('#sel-list');
function selectionLoop(data) {
  var genreArray = Object.keys(data.genre);
  for (var i = 0; i < genreArray.length; i++) {
    var all = renderSelections(genreArray[i]);
    $selectionList.appendChild(all);

  }
}
var $dataviews = document.querySelectorAll('.view');
function swapViews(dataview) {
  data.view = dataview;
  for (var i = 0; i < $dataviews.length; i++) {
    if ($dataviews[i].getAttribute('data-view') === dataview) {
      $dataviews[i].className = 'view';
    } else $dataviews[i].className = 'view hidden';
  }
}

var $listClicked = document.querySelector('.fa-list');
$listClicked.addEventListener('click', function () {
  swapViews('selections');
});
var $homeClicked = document.querySelector('.fa-house');
$homeClicked.addEventListener('click', function () {
  swapViews('generator');
  var $list = document.querySelectorAll('.rando-li');
  for (var z = 0; z < $list.length; z++) {
    $list[z].remove();
  }
  var $noGenre = document.querySelector('.no-genres');
  $noGenre.className = 'no-genres';
});

var $returnButton = document.querySelector('.return-but');
$returnButton.addEventListener('click', function () {
  swapViews('generator');
});
