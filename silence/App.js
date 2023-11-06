

import React, { useEffect, useState } from 'react';
import { View,  FlatList,TouchableOpacity,Text, TextInput, Image, PermissionsAndroid, Button } from 'react-native';

import Container from './appcomp/Container';
import { request } from 'react-native-permissions';

const App = () => {
  const [name,setname]=useState("image")
  const [count,setcount]=useState(0);
  const [photo,setphoto]=useState(null);
  const [Search,setSearch]=useState("love")
  useEffect(()=>{
   handleCall();
  },[SearchTerm])
const SearchTerm=()=>{
  handleCall();
}

const IncrementPage =()=>{
   
   const con=count+1;
   setcount(con);
  
  
}
const DecrementPage=()=>{
  const con=count-1;
  setcount(con);
}
 const handleCall =async()=>{
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Storage Permission',
      message: 'App needs access to your storage to download the image.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if(granted){
    const data= await fetch(`https://api.pexels.com/v1/search?query=${Search}&page=${count}&per_page=10`,{
      method:"GET",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "5ncv9JTwID7EFWv0eTnsnFWjYnthTvhcwJdl1YIr0KFrR2uiXOALB5nh"
      }
    } );
    const result= await data.json();
  
    const img=await result.photos;
   
    const eachimg= img.map(element => {
       
       return element.src
    });
   setphoto(eachimg);
  const imgname=img.map((e)=>{

  return e.alt;
  })
   console.log(imgname);
setname(imgname);
   
  }
}

  return (
    <View  style={{backgroundColor:"lightgrey",display:"flex" ,flexDirection:"column" , height:"100%",width:"100%"}}>
    <View style={{backgroundColor:"lightblue",gap:0.1, borderColor:"grey" , borderWidth:2,borderRadius:4}}>
    <View style={{display:"flex", flexDirection:"row", margin:2, padding:1, gap:100}}>
    <Text style={{color:"blue",fontSize:15}}>Free Images download Here</Text>
    <Text style={{color:"blue",fontSize:15}}>Page: {count}</Text>
    </View>
    <TextInput style={{color:"blue",borderWidth:1,borderColor:"blue",margin:4,padding:0.5,borderRadius:4}} placeholder='Search Here' onChangeText={(item)=>{
      SearchTerm();
     setSearch(item)
   }} 
   
   onKeyPress={()=>SearchTerm()}
  //  onPressIn={()=>SearchTerm()}  
   ></TextInput>
   <TouchableOpacity onPress={()=>{
    SearchTerm();
   }} style={{backgroundColor:"blue"}}>
    <Text style={{color:"white", fontSize:18,padding:2,alignSelf:"center" }}>Search</Text>
   </TouchableOpacity>
 <View>

 <TouchableOpacity>
  <Image></Image>
 </TouchableOpacity>
 </View>

   
    </View>
  
        <FlatList  style={{flex:1,backgroundColor:"blue" ,display:"flex",flexDirection:"column", gap:3}} data={photo} renderItem={({item})=>{ 
         return  <Container image={item.landscape} name={name}/>
     }} />
  <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row", }}>
    {
      count !=0 ?  <TouchableOpacity onPress={()=>{
        DecrementPage();
  
       SearchTerm();
       }} style={{backgroundColor:"lightblue",padding:20}}>
         <Text> Pre Page</Text>
       </TouchableOpacity>:<TouchableOpacity onPress={()=>{
      ;
       }} style={{backgroundColor:"lightblue",padding:20}}>
         <Text> Button Disable</Text>
       </TouchableOpacity>
    }
     <TouchableOpacity onPress={()=>{
       IncrementPage();
       SearchTerm();
     }} style={{backgroundColor:"lightblue",padding:20}}>
       <Text> Next Page</Text>
     </TouchableOpacity>
     </View>
    </View>
  );
};

export default App;

