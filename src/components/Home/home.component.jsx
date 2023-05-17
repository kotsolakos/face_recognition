import { useState } from 'react';
import { Navigate  } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context/user.context';
import Logo from '../Logo/logo.component';
import ImageLinkForm from '../ImageLinkForm/imageLinkForm.component'
import Rank from '../Rank/rank.component';
import FaceRecognition from '../FaceRecognition/faceRecognition.component';        


const Home = ({isSignedIn}) => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({
    topRow: 0, rightCol: 0, bottomRow: 0, leftCol: 0
  });
  const { user, setUser } = useContext(UserContext);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    fetch('https://face-recognition-api-e116.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://face-recognition-api-e116.onrender.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          setUser({...user, entries: count});
        })
        .catch(console.log)
      }
      displayFaceBox(calculateFaceLocation(response))
    })
    .catch(error => console.log('error', error));
  }



  return (
    isSignedIn?
      <div className='Home'>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
        <FaceRecognition imageUrl={imageUrl} box={box}/>
      </div>
      :<Navigate to="/" replace/>
  )
}

export default Home;

