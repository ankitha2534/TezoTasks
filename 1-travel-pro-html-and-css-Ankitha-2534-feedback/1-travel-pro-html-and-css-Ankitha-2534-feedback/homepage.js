function displayImage() {
    var element = document.getElementById('trip-image');
    if (element.style.display == 'none') {
        element.style.display = 'block';
    }
    else {
        element.style.display = 'none';
    }
}

count = 0;
function changeImage() {
    var image1 = document.getElementById('image1');
    var image2 = document.getElementById('image2');
    var image3 = document.getElementById('image3');
    var temp = document.createElement('img');
    temp.src = image1.src;
    image1.src = image2.src;
    image2.src = image3.src;
    image3.src = temp.src;
}