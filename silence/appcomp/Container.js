import { StyleSheet, View,Image,Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import RNFetchBlob from 'rn-fetch-blob'
const Container = ( {image}) => {
const ImageDownload=()=>{
   const {config,fs}=RNFetchBlob;
   config({
    addAndroidDownloads:{
        useDownloadManager:true,
        notification:true,
        path:fs.dirs.DownloadDir+"/photos.jpg",
        // photo name is written in photo.jpg
        description:"file is download"
    }
   })
   .fetch("GET",image,{

   }).then((res)=>{
   console.log("the file is save", res.path());
   Alert.alert("file is download successfully !!!")
   });
   
}
  return (
    <View style={style.box}>
   
    <Image source={{uri:image}} height={200} width={"96%"} style={{margin:5,  borderRadius: 3, borderWidth:2 , borderColor:"black"}}></Image>   
    <TouchableOpacity onPress={()=>{
        ImageDownload();
    }} style={{backgroundColor:"green",width:"96%",justifyContent:"center",alignItems:"center",height:40}}>
     <Text>Download</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Container;

const style=StyleSheet.create({
    box:{
    width:"100%",
    
     display:"flex",
     backgroundColor:"lightgrey",
     flexDirection:"column",
     alignItems:"center",
    },
    container:{
      display:'flex',
      flexDirection:"row",
      flexWrap:"wrap",
      height:"100%",
      flex:1,
      margin:10,
      padding:5,
      
    }
  })