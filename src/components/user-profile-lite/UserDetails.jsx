import React, {useState, useRef, useContext} from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  FormInput,
  InputGroup,
  InputGroupAddon
} from "shards-react";

import { InfoContext } from "../../Contexts/InfoContext";

import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

import { useDownloadURL } from "react-firebase-hooks/storage"

const UserDetails = ({ ready, authorData, user }) => {

  const { dispatch : dispatchInfo } = useContext(InfoContext)


  const [file, setFile] = useState(null) //Contain Uploaded file data

  const ImageRef = firebase.storage().ref('users/' + String(user.uid)) //reference if the user Image in firebase storage by user ID
 
  const [value] = useDownloadURL(ImageRef); //Get download ulr from firebase storage

  const Viewer = useRef(null) //Reference to the img DOM object to Preview Uploaded Image


  const handleChange = (event) => {

    if(event.target.files[0]){
      setFile(event.target.files[0])
      var reader = new FileReader();
      reader.onload = function (e) {
        Viewer.current.src = e.target.result 
    };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  const [showPhotoUpdate, setShowPhotoUpdate] = useState(false) //toggle impage upload/update section


  const upload = (file) => {
      ImageRef.put(file).then(() =>{
        user.updateProfile({ photoURL : value })
        firebase.firestore().collection('authors').doc(user.uid).update({ photoURL : value })
          .then(() => dispatchInfo({ payload : { message : { message : "Image added Successfully", type:"success" } } })  )
          .catch((e) => dispatchInfo({payload : {error : e}}))
      }).catch((e) => dispatchInfo({payload : {error : e}}))
  }



  return ready && (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            ref={Viewer}
            src={user.photoURL }
            alt={user.displayName}
            width="110"
          />
        </div>
        <h4 className="mb-0">{user.displayName}</h4>
        <span className="text-muted d-block mb-2">{authorData.profession}</span>
        <Button pill outline size="sm" className="mb-2" onClick={() => setShowPhotoUpdate(!showPhotoUpdate)}>
          <i className="material-icons mr-1">photo</i> Change your Photo
        </Button>
      </CardHeader>
      {showPhotoUpdate && (<ListGroup flush>
          <ListGroupItem className="px-3">
              <strong className="text-muted d-block mb-2">
                Upload From local
              </strong>
              <div className="custom-file mb-3">
                <input type="file" onChange={handleChange} className="custom-file-input" id="customFile2" />
                <label className="custom-file-label" htmlFor="customFile2">
                  { (file && file.name) || "Choose file..."}
                </label>
              </div>
          <strong className="text-muted d-block mb-2">
                or<br />
              </strong>
          <InputGroup seamless style={{width : "80%"}} className="mb-3">
            <FormInput placeholder="Link for a photo form the web" />
            <InputGroupAddon type="append">
              <Button theme="white">Preview</Button>
            </InputGroupAddon>
          </InputGroup>
          <Button theme="danger" onClick={() => upload(file)}>Upload & Update Profile</Button>
          </ListGroupItem>
        </ListGroup>)}
      <ListGroup flush>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            {authorData.profession}
          </strong>
          <span>{authorData.description}</span>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default UserDetails;
