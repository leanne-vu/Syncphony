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
  data.editing = null;
  selectionstars();
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
  $divRow.setAttribute('class', 'row selection-rating-row');
  $divRow.setAttribute('data-genre', render);
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
  if (event.target.className === 'fa-regular fa-plus second') {
    swapViews('genreView');
    var $specificGenre = document.querySelector('.specific-genre');
    var genreName = event.target.closest('li').textContent;
    $specificGenre.textContent = genreName;
    data.currentGenre = genreName;
    var $li = document.querySelectorAll('.entry-list-spec');
    for (var e = 0; e < $li.length; e++) {
      $li[e].remove();
    }
    entryLoop();
  }
  if (event.target.className === 'fa-solid fa-trash-can second sel-trash') {
    var $containermodal = document.querySelector('.container-modal');
    $containermodal.setAttribute('class', 'container-modal');
    genreName = event.target.closest('li').textContent;
    data.currentGenre = genreName;
  }
  var $genrate = document.querySelectorAll('.selection-rating-row');
  for (var m = 0; m < $genrate.length; m++) {
    if ($genrate[m].getAttribute('data-genre') === event.target.closest('li').getAttribute('data-genre')) {
      var $genrestars = $genrate[m].children;
      for (var x = 0; x < $genrestars.length; x++) {
        if ($genrestars[x] === event.target) {
          for (var p = 0; p < $genrestars.length; p++) {
            if (p <= x) {
              $genrestars[p].className = 'fa-solid fa-star gen-rated rated';
            } else $genrestars[p].className = 'fa-solid fa-star gen-rated';
          }
          data.genreRatings[$genrate[m].getAttribute('data-genre')] = x + 1;
        }
      }
    }
  }
}
);

function selectionstars() {
  var $genrate = document.querySelectorAll('.selection-rating-row');
  var datamodel = Object.keys(data.genreRatings);
  for (var i = 0; i < datamodel.length; i++) {
    if (datamodel[i] === $genrate[i].getAttribute('data-genre')) {
      var stars = $genrate[i].children;
      var rating = data.genreRatings[datamodel[i]];
      for (var x = 0; x < stars.length; x++) {
        if (x < rating) { stars[x].className = 'fa-solid fa-star gen-rate rated'; }
      }
    }
  }
}

var $modal = document.querySelector('.pop-out');
$modal.addEventListener('click', function () {
  if (event.target.className === 'pop-but confirm-but') {
    var $genrelist = document.querySelectorAll('.genreList');
    for (var z = 0; z < $genrelist.length; z++) {
      if ($genrelist[z].getAttribute('data-genre') === data.currentGenre) {
        $genrelist[z].remove();
        delete data.genre[data.currentGenre];
        delete data.genreRatings[data.currentGenre];
      }
    }
  }
  var $containermodal = document.querySelector('.container-modal');
  $containermodal.setAttribute('class', 'hidden container-modal');
  data.currentGenre = null;
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
var $entryformstar = document.querySelector('.entry-form-stars');
$entryformstar.addEventListener('click', function () {
  var $stars = document.querySelectorAll('.ent-form-stars');
  for (var i = 0; i < $stars.length; i++) {
    if (event.target === $stars[i]) {
      for (var z = 0; z <= i; z++) {
        $stars[z].setAttribute('class', 'fa-solid fa-star ent-form-stars rated-form');
      }
      for (var q = i + 1; q < $stars.length; q++) {
        $stars[q].setAttribute('class', 'fa-solid fa-star ent-form-stars');
      }
    }
  }
});
var $form = document.querySelector('form');
$form.addEventListener('submit', function () {
  event.preventDefault();
  var entry = {
    url: $form.elements.url.value,
    artist: $form.elements.artist.value,
    type: $form.elements.select.value,
    title: $form.elements.title.value,
    notes: $form.elements.notes.value,
    entryID: data.entryID,
    rating: 0
  };
  if (data.editing !== null) {
    for (var z = 0; z < data.genre[data.currentGenre].length; z++) {
      if (data.genre[data.currentGenre][z].entryID === data.editing.entryID) {
        data.editing = {
          url: $form.elements.url.value,
          artist: $form.elements.artist.value,
          type: $form.elements.select.value,
          title: $form.elements.title.value,
          notes: $form.elements.notes.value,
          entryID: data.genre[data.currentGenre][z].entryID,
          rating: 0
        };
        var $ratedstars = document.querySelectorAll('.rated-form');
        data.editing.rating = $ratedstars.length;
        data.genre[data.currentGenre][z] = data.editing;
        var $list = document.querySelectorAll('.entry-list-spec');
        for (var k = 0; k < $list.length; k++) {
          if (Math.floor($list[k].getAttribute('data-entry-id')) === data.genre[data.currentGenre][z].entryID) {
            $list[k].replaceWith(renderEntries(data.genre[data.currentGenre][z], data.genre[data.currentGenre][z].rating));
          }
        }
      }
    }
  }

  if (data.editing === null) {
    var genreArray = Object.keys(data.genre);
    for (var i = 0; i < genreArray.length; i++) {
      if (genreArray[i] === data.currentGenre) {
        $ratedstars = document.querySelectorAll('.rated-form');
        entry.rating = $ratedstars.length;
        data.genre[genreArray[i]].unshift(entry);
        var $ul = document.querySelector('#genre-adds');
        $ul.prepend(renderEntries(entry, entry.rating));
        data.entryID++;
      }
    }
  }
  resetStars();
  $form.reset();
  swapViews('genreView');
  var $image = document.querySelector('.form-image');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.editing = null;
});

function resetStars() {
  var $entrystars = document.querySelectorAll('.ent-form-stars');
  for (var i = 0; i < $entrystars.length; i++) {
    $entrystars[i].setAttribute('class', 'fa-solid fa-star ent-form-stars');
  }
}

var $imageUrl = document.querySelector('#image-url');
$imageUrl.addEventListener('input', function () {
  var $image = document.querySelector('.form-image');
  $image.setAttribute('src', event.target.value);
}
);

function renderEntries(individualGenre, number) {
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
  $starColumn.appendChild(renderEntryStars(number));
  var $deletecan = document.createElement('i');
  $deletecan.setAttribute('class', 'fa-solid fa-trash-can ent-trash');
  $starColumn.appendChild($deletecan);
  var $edit = document.createElement('i');
  $edit.setAttribute('class', 'fa-solid fa-pencil');
  $starColumn.appendChild($edit);

  return $li;
}

function renderEntryStars(number) {
  var fragment = new DocumentFragment();
  for (var z = 0; z <= 5; z++) {
    var star = document.createElement('i');
    if (z < number) {
      star.setAttribute('class', 'fa-solid fa-star ent-star rated');
    }
    if (z > number) {
      star.setAttribute('class', 'fa-solid fa-star ent-star');
    }
    fragment.appendChild(star);
  }
  return fragment;
}

function entryLoop() {
  var $ul = document.querySelector('#genre-adds');
  var genreArray = Object.keys(data.genre);
  for (var i = 0; i < genreArray.length; i++) {
    if (genreArray[i] === data.currentGenre) {
      for (var z = 0; z < data.genre[genreArray[i]].length; z++) {
        var all = renderEntries(data.genre[genreArray[i]][z], data.genre[genreArray[i]][z].rating);
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
  data.editing = null;
  resetStars();
});

var $genreAdds = document.querySelector('#genre-adds');
$genreAdds.addEventListener('click', function () {
  var listItem = event.target.closest('li');
  var entryStringNum = listItem.getAttribute('data-entry-id');
  var entryNumber = Math.floor(entryStringNum);
  for (var i = 0; i < data.genre[data.currentGenre].length; i++) {
    if (data.genre[data.currentGenre][i].entryID === entryNumber) {
      if (event.target.className === 'fa-solid fa-pencil') {
        swapViews('entry-form');
        var $specificGenreEntry = document.querySelector('.specific-genre-entry');
        $specificGenreEntry.textContent = 'Entry Edit';
        data.editing = data.genre[data.currentGenre][i];
        $form.elements.artist.value = data.genre[data.currentGenre][i].artist;
        $form.elements.select.value = data.genre[data.currentGenre][i].type;
        $form.elements.url.value = data.genre[data.currentGenre][i].url;
        $form.elements.title.value = data.genre[data.currentGenre][i].title;
        $form.elements.notes.value = data.genre[data.currentGenre][i].notes;
        var $image = document.querySelector('.form-image');
        $image.setAttribute('src', data.genre[data.currentGenre][i].url);
        editstars();
      }
      if (event.target.className === 'fa-solid fa-trash-can ent-trash') {
        var $li = document.querySelectorAll('.entry-list-spec');
        $li[i].remove();
        data.genre[data.currentGenre].splice(i, 1);
      }

    }
  }
});
var $specificGenreEntry = document.querySelector('.specific-genre-entry');
if (data.view !== 'entry-form' || $specificGenreEntry.textContent !== 'Entry Edit') {
  data.editing = null;
}
function editstars() {
  for (var i = 0; i < data.genre[data.currentGenre].length; i++) {
    var $entrystars = document.querySelectorAll('.ent-form-stars');
    if (data.editing.entryID === data.genre[data.currentGenre][i].entryID) {
      for (var k = 0; k <= data.genre[data.currentGenre][i].rating - 1; k++) {
        $entrystars[k].setAttribute('class', 'fa-solid fa-star ent-form-stars rated-form');
      }
    }
  }
}
