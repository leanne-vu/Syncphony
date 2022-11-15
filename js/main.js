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
      $icon.className = 'fa-regular fa-plus';
      $li.appendChild($icon);
    }

  }); xhr.send();
}
$exploreButton.addEventListener('click', getUserData);
