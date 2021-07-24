import app from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyAi-W1alU--eLPxmfBNoyH4OuFC-jjDg78",
    authDomain: "tussna-df734.firebaseapp.com",
    projectId: "tussna-df734",
    storageBucket: "tussna-df734.appspot.com",
    messagingSenderId: "477954543797",
    appId: "1:477954543797:web:444989b63009662679aefc",
    measurementId: "G-FKM4J6S6MP"
  };


  
class Firebase{
    constructor(){
          app.initializeApp(firebaseConfig)
     }
}
    
    
export default Firebase;