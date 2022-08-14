// Sound
var audioCtx;
var oscArr = [];

function playSound(name, vol){
  m = audioCtx.createBuffer(1,96e3,48e3);
  gainNode = audioCtx.createGain();
  b = m.getChannelData(0)
  for(i=96e3;i--;){ b[i]=getSound(name,i);}
  s = audioCtx.createBufferSource();
  s.buffer = m;
  s.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = vol;
  s.start();
}

getSound = function (name,i){
  var val;
  switch(name) {
  case NOISEFX:
    val = getNoise(i);
    break;
  case COINFX:
    val = getCoin(i);
    break;
  case JUMPFX:
    val = getJump(i);
    break;
  case FALLFX:
    val = getFall(i);
    break;
  case PORTALFX:
    val = getPortal(i);
    break
  case DIEFX:
    val = getDie(i);
    break
  case SHOOT:
    val = getShoot(i);
    break
  case LEVEL:
    val = levelChange(i);
    break;
  default:
    return 1;
  }
  return val;
}

function getNoise(i){
  var n=7e4;
  t=(i,n)=>(n-i)/n;
  if (i > n) return null;
  var q = t(i,n);
  return Math.sin(i*0.001*Math.sin(0.009*i)+Math.sin(i/100));
}

function getJump(i){
  var n = 1e4;
  if (i>n) return null;
  var t = (n-i)/n;
  return ((Math.pow(i,1.055)&128)?1:-1)*Math.pow(t,2);
}

function getFall(i){
  var n=5e4;
  if (i > n) return null;
  var t = (n-i)/n;
  return ((Math.pow(i,0.9)&200)?1:-1)*Math.pow(t,3);
}

function getCoin(i){
  var n=1e4;
  var c=n/3;
  if (i > n) return null;
  var t = (n-i)/n;
  var q=Math.pow(t,2.1);
  return (Math.pow(i,3)&(i<c?16:99))?q:-q;
}

function getPortal(i){
  var n=2e4;
  if (i > n) return null;
  var t = (n-i)/n;
  var q = t;
  return Math.sin(-i*0.003*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}

function getDie(i){
  var n=1e4;
  if (i > n) return null;
  var q = (n-i)/n;
  return Math.sin(i*0.01*Math.sin(0.009*i+Math.sin(i/200))+Math.sin(i/100))*q*q;
}

function getShoot(i){
  var n=2e3;
  if (i > n) return null;
  t=(i,n)=>(n-i)/n;
  var q = t(i,n);
  return (Math.pow(i*50,0.7)&33)?q:-q;
}

function levelChange(i){
  var n=2e4;
  t=(i,n)=>(n-i)/n;
  if (i > n) return null;
  var q = t(i,n);
  i=i*0.04;
  return Math.sin(-i*0.03*Math.sin(0.09*i+Math.sin(i/200))+Math.sin(i/100))*q;
}
