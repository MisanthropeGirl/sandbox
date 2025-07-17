function windowSizes(){
  const w = window.innerWidth;
  const h = window.innerHeight;
  document.getElementsByName('footer')[0].innerHTML("Width:" + w + " Height:" + h);
}

window.onload = windowSizes();
window.onresize = windowSizes();
window.orientationchange = windowSizes();
