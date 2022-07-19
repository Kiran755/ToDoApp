import List from './List';
import {useState} from 'react';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth,db } from './firebase';
import { useNavigate } from 'react-router';
import {uid} from 'uid';
import {set,ref,onValue} from 'firebase/database';
import "./Todo.css";
const Todo = () => {
    const [data,setData] = useState('');
    const navigate = useNavigate();
    const[list,setList] = useState([]);
    const HandleChange = (e)=>{
      console.log(e.target.value);
        setData(e.target.value);
    }
    
  useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          if(user){
            onValue(ref(db,`/${auth.currentUser.uid}`),snapshot=>{
              setList([]);
              const data = snapshot.val();
              if(data!==null)
              {
                Object.values(data).map(item=>{
                  setList((oldArray)=>[...oldArray,item]);
                })
              }
            })
          }  
          else if(!user)
            {
                navigate("/");
            }
        })
  },[])
    const HandleClick = ()=>{
      if(data==="")
      {
        alert("write something to add !");
        return;
      }
      const ListId = uid();
      set(ref(db,`/${auth.currentUser.uid}/${ListId}`),{
        item:data,
        ListId:ListId,
        isDisabled:false,
        isEdit:false
      })
      setList([...list,{item:data,ListId:ListId,isDisabled:false,isEdit:false}]);
      setData("");
    }
    const handleSignOut = ()=>{
        auth.signOut().then(()=>{
            navigate("/ToDoApp")
        }).catch((err)=>{
            alert(err.message);
        })
    }
  return (
    <div className="App">
    <h1>To do List :</h1>
      <div className="container">
        <input type="text"
        placeholder="Type to add data"
        value={data}
        onChange={(e)=>{HandleChange(e)}}
        />
        <button onClick={HandleClick}>ADD DATA</button>
      </div>
      <div className='display_list'>
        <List listarray={list} updateList={setList} updatevalue={setData}/>
      </div>
        <button onClick={handleSignOut}>
                Log Out
        </button>

    </div>
  )
}
export default Todo;