var dslider=document.querySelectorAll("dslider");

for (var i = 0; i < dslider.length; i++) {

  var dsliderSlide=dslider[i].querySelector('slide');
  var dsliderSlideFocus=false;
  var dsliderThumbnail=dslider[i].querySelector('thumbnail');
  var dsliderBtnLeft=dslider[i].querySelector('#left');
  var dsliderBtnRight=dslider[i].querySelector('#right');
  var dsliderimagesInSlide = dslider[i].querySelector('slide').getElementsByClassName('item');

  //check if dsliderSlideFocus FOCUS
  dslider[i].addEventListener("mouseenter", function() {
    dsliderSlideFocus=true;
  });
  dslider[i].addEventListener("mouseleave", function() {
    dsliderSlideFocus=false;
  });

  //Check IF seconds is defined
  var secondesInSlider=parseInt(dslider[i].getAttribute('seconds'));

  if (!secondesInSlider) {
    secondesInSlider=3000;
  }
  //If Focus in SLider Don't Move
  setInterval(function() {
    if (!dsliderSlideFocus) {
      if (dsliderSlide.scrollLeft==dsliderSlide.clientWidth*(dsliderimagesInSlide.length-1)) {
        dsliderSlide.scrollLeft=0;
      }
      else{
        dsliderSlide.scrollLeft+=dsliderSlide.clientWidth;
      }
    }

  }, secondesInSlider);

  //Left BTN
  dsliderBtnLeft.addEventListener("click", function(){
    if (dsliderSlide.scrollLeft==0) {
      dsliderSlide.scrollLeft=dsliderSlide.clientWidth*(dsliderimagesInSlide.length-1);
    }
    else{
      dsliderSlide.scrollLeft-=dsliderSlide.clientWidth;
    }
  });

  //Right BTN
  dsliderBtnRight.addEventListener("click", function(){
    if (dsliderSlide.scrollLeft==dsliderSlide.clientWidth*(dsliderimagesInSlide.length-1)) {
      dsliderSlide.scrollLeft=0;
    }
    else{
      dsliderSlide.scrollLeft+=dsliderSlide.clientWidth;
    }
    //console.log(dsliderimagesInSlide.length+"///"+dsliderSlide.clientWidth*(dsliderimagesInSlide.length-1));
  });

  //get all image
  for(var t = 0; t < dsliderimagesInSlide.length; t++) {
    if(dsliderimageOrientation(dsliderimagesInSlide[t].querySelector('img').src)=="landscape"){
      dsliderimagesInSlide[t].querySelector('img').style.width="100%";
      //center landscape
      var dslidermrgTop=dsliderSlide.offsetHeight-dsliderimagesInSlide[t].querySelector('img').clientHeight;
      dslidermrgTop=dslidermrgTop/2;
      dsliderimagesInSlide[t].querySelector('img').style.marginTop=dslidermrgTop+"px";
    }
    else{
      dsliderimagesInSlide[t].querySelector('img').style.height="100%";
      //center Portrait
      dsliderimagesInSlide[t].querySelector('img').style.display="block";
      dsliderimagesInSlide[t].querySelector('img').style.margin="auto";
    }
    //Create Attribute dsliderPosition
    var att = document.createAttribute("dsliderPosition");
    att.value = t*dsliderSlide.clientWidth;
    dsliderimagesInSlide[t].querySelector('img').setAttributeNode(att);

    //Creating thumbnail
    var DOM_img = document.createElement("img");
    DOM_img.src = dsliderimagesInSlide[t].querySelector('img').src;
    DOM_img.style.height = "100%";
    //Create Attribute dsliderPosition
    var att = document.createAttribute("dsliderPosition");
    att.value = t*dsliderSlide.clientWidth;
    DOM_img.setAttributeNode(att);
    //Call on click Go to Scroll Location
    DOM_img.onclick = function () {
      dsliderSlide.scrollLeft=parseInt(this.getAttribute('dsliderPosition'));
    };

    dsliderThumbnail.appendChild(DOM_img);
  }


  // Change scroll paragraph <p>Scroll:</p>
  dsliderSlide.addEventListener("scroll", function (event) {
      var scroll = dsliderSlide.scrollLeft;
      document.getElementById("scroll").innerHTML = "Scroll: "+scroll;
  });
}
function dsliderimageOrientation(a){var t=new Image;return t.src=a,t.naturalWidth>t.naturalHeight?"landscape":t.naturalWidth<t.naturalHeight?"portrait":"even"}
