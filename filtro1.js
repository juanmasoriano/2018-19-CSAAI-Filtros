function main() {
  console.log("En main()....")

  //-- Acceso al objeto con la imagen
  var img = document.getElementById('imagesrc')

  //-- Acceso al objeto con el canvas
  var canvas = document.getElementById('display');

  //-- Acceso al deslizador
  deslizador = document.getElementById('deslizador')
  deslizador1 = document.getElementById('deslizador1')
  deslizador2 = document.getElementById('deslizador2')

  //-- Valor del deslizador
  range_value = document.getElementById('range_value')
  range_value1 = document.getElementById('range_value1')
  range_value2 = document.getElementById('range_value2')

  grises = document.getElementById('grises')

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Obtener el contexto del canvas para
  //-- trabajar con el
  var ctx = canvas.getContext("2d");

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  var data = imgData.data


  function filtro() {

    range_value.innerHTML = deslizador.value
    range_value1.innerHTML = deslizador1.value
    range_value2.innerHTML = deslizador2.value


    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    data = imgData.data

    umbral = deslizador.value
    umbral1 = deslizador1.value
    umbral2 = deslizador2.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbral){
        data[i] = umbral;
      }
      if (data[i + 1] > umbral1){
          data[i + 1] = umbral1;
      }
      if (data[i + 2] > umbral2){
        data[i + 2] = umbral2;
      }
    }


  }


  //-- Funcion de retrollamada del deslizador
  deslizador.oninput = () => {

    filtro()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  deslizador1.oninput = () => {

    filtro()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  deslizador2.oninput = () => {

    filtro()
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
  grises.onclick = () => {

    for (var i = 0; i < data.length; i+=4) {

      r = data[i];
      g = data[i+1];
      b = data[i+2];

      var brillo = (3 * r + 4 * g + b)/8;

      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);

  }

}
