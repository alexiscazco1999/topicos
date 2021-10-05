//https://www.eclipse.org/paho/clients/js/

function MostrarSensor1() {

  var Sensor1=document.getElementById("sensor1");//Muestra el primer valor en la etiqueta
  var HiddenSensor1=Sensor1.getAttribute("hidden");

  if(HiddenSensor1){
    Sensor1.removeAttribute("hidden");
  }else{
    Sensor1.setAttribute("hidden", "hidden");
  }

}

function MostrarSensor2(){  

  var Sensor2=document.getElementById("sensor2");//Muestra el primer valor en la etiqueta
  var HiddenSensor2=Sensor2.getAttribute("hidden");

  if(HiddenSensor2){
    Sensor2.removeAttribute("hidden");
  }else{
    Sensor2.setAttribute("hidden", "hidden");
  }
  
}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "alexiscazco31@gmail.com",
    password: "alexiscazco1999",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("alexiscazco31@gmail.com/t2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "alexiscazco31@gmail.com/t1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);//Se muestra en la consola el mensaje recibido
    
    var Mensaje=message.payloadString;//Se guarda el mensaje en una variable

    var Sensores=Mensaje.split('_');//Divide el formato en que llegan los valores a razón del espacio en blanco

    document.getElementById("sensor1").innerHTML=Sensores[0]+"- Estado: "+Sensores[1];//Muestra el primer valor en la etiqueta
    document.getElementById("sensor2").innerHTML=Sensores[0]+"- Estado: "+Sensores[2];//Muestra el segundo valor en la etiqueta 
  }
  
