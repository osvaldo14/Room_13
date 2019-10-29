// Get the modal
var modal = document.getElementById('myModal5');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg5');
var modalImg = document.getElementById("img05");
var captionText = document.getElementById("caption5");

img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = "../banq_img/clue5.jpg";
    captionText.innerHTML = this.alt;
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close5")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}