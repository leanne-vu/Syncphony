/* global data */
var $musicList = document.querySelector('#music-list');
var $exploreButton = document.querySelector('.gen-but');
function getUserData() {
  var $list = document.querySelectorAll('li');
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
    data.genre.push(genreName.textContent);
    genreName.remove();
  }
  var $selectionList = document.querySelector('#sel-list');
  for (var i = 0; i < data.genre.length; i++) {
    var $li = document.createElement('li');
    $li.textContent = data.genre[i];
    $selectionList.appendChild($li);
  }
}

document.addEventListener('DOMContentLoaded', renderSelections);
function renderSelections() {
  var $selectionList = document.querySelector('#sel-list');
  swapViews(data.view);
  for (var i = 0; i < data.genre.length; i++) {
    var $li = document.createElement('li');
    $li.textContent = data.genre[i];
    $selectionList.appendChild($li);
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
    $icon1.className = 'fa-solid fa-star';
    $divRow.appendChild($icon1);
    var $icon2 = document.createElement('i');
    $icon2.className = 'fa-solid fa-star';
    $divRow.appendChild($icon2);
    var $icon3 = document.createElement('i');
    $icon3.className = 'fa-solid fa-star';
    $divRow.appendChild($icon3);
    var $icon4 = document.createElement('i');
    $icon4.className = 'fa-solid fa-star';
    $divRow.appendChild($icon4);
    var $icon5 = document.createElement('i');
    $icon5.className = 'fa-solid fa-star';
    $divRow.appendChild($icon5);

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
});
