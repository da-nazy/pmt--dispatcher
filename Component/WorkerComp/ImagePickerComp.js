import React,{useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
export default function pickImageComp({setImageUri,setImageBase64,setError,setPickImage}){
  console.log("aokyhe");
  // useEffect works when result has been gotten second called
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
     
   
   
    // first called
  const  pickImage= async () => {
    console.log("pickImage")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });
 
    //console.log(result);

    // third called
    if (!result.cancelled) {
       setImageUri(result.uri,false);
       
        // passing the uri to be encoded
      //  setImageBase64(result.base64);

        console.log(delete result.cancelled);
        console.log(result.uri);
        //parcelImageUpload(result);
     
        // console.log(result.base64.length);
        // console.log(b64);
        ////let data = await RNFS.readFile(image, 'base64').then(res => { return (res) });
    
      }else{
        setError(false,"Canclled");

      }
    };
    pickImage();
  return(null);
    
} 