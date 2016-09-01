require('./main.scss');
const path = require('path');
import Form from './components/Form';
var img = document.createElement('img');
img.src = path.resolve('assets/images/fireworks.jpg');
document.getElementById('img').appendChild(img);

console.log('Baba Noel');
