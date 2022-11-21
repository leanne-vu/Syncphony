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
  entryLoop();
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

$selectionList.addEventListener('click', function () {
  if (event.target.className === 'fa-regular fa-plus second') { swapViews('genreView'); }
  var $specificGenre = document.querySelector('.specific-genre');
  var genreName = event.target.closest('li').textContent;
  $specificGenre.textContent = genreName;
  data.currentGenre = genreName;
  var $li = document.querySelectorAll('.entry-list-spec');
  for (var e = 0; e < $li.length; e++) {
    $li[e].remove();
  }
  entryLoop();
// add DELETE here later //
});

document.addEventListener('DOMContentLoaded', function () {
  var $specificGenre = document.querySelector('.specific-genre');
  $specificGenre.textContent = data.currentGenre;
  var $specificGenreEntry = document.querySelector('.specific-genre-entry');
  $specificGenreEntry.textContent = data.currentGenre + ' Entry';

});

var $genreSpecific = document.querySelector('.genre-specific');
$genreSpecific.addEventListener('click', function () {
  if (event.target.className === 'fa-solid fa-list') {
    swapViews('selections');
  }
  if (event.target.className === 'fa-regular fa-pen-to-square') {
    swapViews('entry-form');
    var $specificGenreEntry = document.querySelector('.specific-genre-entry');
    $specificGenreEntry.textContent = data.currentGenre + ' Entry';
  }
});

if (data.view !== 'genreView' && data.view !== 'entry-form') {
  data.currentGenre = null;
}

var $form = document.querySelector('form');
$form.addEventListener('submit', function () {
  event.preventDefault();
  var entry = {
    url: $form.elements.url.value,
    artist: $form.elements.artist.value,
    type: $form.elements.select.value,
    title: $form.elements.title.value,
    notes: $form.elements.notes.value,
    entryID: data.entryID
  };
  var genreArray = Object.keys(data.genre);
  for (var i = 0; i < genreArray.length; i++) {
    if (genreArray[i] === data.currentGenre) {
      data.genre[genreArray[i]].unshift(entry);
      var $ul = document.querySelector('#genre-adds');
      $ul.prepend(renderEntries(entry));
    }
  }
  $form.reset();
  swapViews('genreView');
  data.entryID++;
  var $image = document.querySelector('.form-image');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});

var $imageUrl = document.querySelector('#image-url');
$imageUrl.addEventListener('input', function () {
  var $image = document.querySelector('.form-image');
  $image.setAttribute('src', event.target.value);
}
);

function renderEntries(individualGenre) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'entry-list-spec');
  $li.setAttribute('data-entry-id', individualGenre.entryID);
  var $firstRow = document.createElement('div');
  $firstRow.setAttribute('class', 'first-row-genre row');
  $li.appendChild($firstRow);
  var $firstColumnHalf = document.createElement('div');
  $firstColumnHalf.setAttribute('class', 'entry-adds column-half');
  $firstRow.appendChild($firstColumnHalf);
  var $image = document.createElement('img');
  $image.setAttribute('src', individualGenre.url);
  $firstColumnHalf.appendChild($image);
  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'entry-adds artist-title column-half');
  $firstRow.appendChild($secondColumnHalf);
  var $h3 = document.createElement('h3');
  $h3.textContent = individualGenre.artist;
  $secondColumnHalf.appendChild($h3);
  var $h4 = document.createElement('h4');
  $h4.textContent = individualGenre.type + ': ' + individualGenre.title;
  $secondColumnHalf.appendChild($h4);
  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'notes-stars row');
  $li.appendChild($secondRow);
  var $firstColumnFull = document.createElement('div');
  $firstColumnFull.setAttribute('class', 'column-full');
  $firstColumnFull.textContent = individualGenre.notes;
  $secondRow.appendChild($firstColumnFull);
  var $second2ndRow = document.createElement('div');
  $second2ndRow.setAttribute('class', 'notes-stars row');
  $li.appendChild($second2ndRow);
  var $starColumn = document.createElement('div');
  $starColumn.setAttribute('class', 'star-column column-full');
  $second2ndRow.appendChild($starColumn);
  var $star1 = document.createElement('i');
  $star1.setAttribute('class', 'fa-solid fa-star ent-star');
  $starColumn.appendChild($star1);
  var $star2 = document.createElement('i');
  $star2.setAttribute('class', 'fa-solid fa-star ent-star');
  $starColumn.appendChild($star2);
  var $star3 = document.createElement('i');
  $star3.setAttribute('class', 'fa-solid fa-star ent-star');
  $starColumn.appendChild($star3);
  var $star4 = document.createElement('i');
  $star4.setAttribute('class', 'fa-solid fa-star ent-star');
  $starColumn.appendChild($star4);
  var $star5 = document.createElement('i');
  $star5.setAttribute('class', 'fa-solid fa-star ent-star');
  $starColumn.appendChild($star5);
  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fa-solid fa-pencil');
  $starColumn.appendChild($edit);
  return $li;
}

function entryLoop() {
  var $ul = document.querySelector('#genre-adds');
  var genreArray = Object.keys(data.genre);
  for (var i = 0; i < genreArray.length; i++) {
    if (genreArray[i] === data.currentGenre) {
      for (var z = 0; z < data.genre[genreArray[i]].length; z++) {
        var all = renderEntries(data.genre[genreArray[i]][z]);
        $ul.appendChild(all);
      }
    }
  }
}

var $backButton = document.querySelector('.fa-delete-left');
$backButton.addEventListener('click', function () {
  $form.reset();
  swapViews('genreView');
  var $image = document.querySelector('.form-image');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});

var $genreAdds = document.querySelector('#genre-adds');
$genreAdds.addEventListener('click', function () {
  if (event.target.className === 'fa-solid fa-pencil') { swapViews('entry-form'); }
  var $specificGenreEntry = document.querySelector('.specific-genre-entry');
  $specificGenreEntry.textContent = 'Entry Edit';
  var listItem = event.target.closest('li');
  var entryStringNum = listItem.getAttribute('data-entry-id');
  var entryNumber = Math.floor(entryStringNum);
  for (var i = 0; i < data.genre[data.currentGenre].length; i++) {
    if (data.genre[data.currentGenre][i].entryID === entryNumber) {
      data.editing = data.genre[data.currentGenre][i];
      $form.elements.artist.value = data.genre[data.currentGenre][i].artist;
      $form.elements.select.value = data.genre[data.currentGenre][i].type;
      $form.elements.url.value = data.genre[data.currentGenre][i].url;
      $form.elements.title.value = data.genre[data.currentGenre][i].title;
      $form.elements.notes.value = data.genre[data.currentGenre][i].notes;
      var $image = document.querySelector('.form-image');
      $image.setAttribute('src', data.genre[data.currentGenre][i].url);
    }
  }
});
var $specificGenreEntry = document.querySelector('.specific-genre-entry');
if (data.view !== 'entry-form' || $specificGenreEntry.textContent !== 'Entry Edit') {
  data.editing = null;
}
