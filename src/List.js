import './List.css';
import {auth,db} from './firebase.js';
import { ref,remove,update } from 'firebase/database';
import {useState} from "react";

const List = ({listarray,updateList,updatevalue})=>{

const HandleChange = (index)=>{
    remove(ref(db,`/${auth.currentUser.uid}/${index}`));
    const updatedList = listarray.filter((item)=>{
        return item.ListId !== index;
        
    })
    updateList(updatedList);
}

const HandleUpdateChange = (e,Listitem)=>{
    const newdta = listarray.map(obj=>{
        if(obj===Listitem){
            return {
                ...Listitem,item:e.target.value
            };
        }
        return obj;
    });
    updateList(newdta);
}
const UpdateDatabase = (Listitem)=>{
    update(ref(db,`/${auth.currentUser.uid}/${Listitem.ListId}`),{
        item:Listitem.item,
        ListId:Listitem.ListId
    })
}
const HandleUpdate = (Listitem)=>{
    const newdta = listarray.map(obj=>{
        if(obj===Listitem){
            return {
                ...Listitem,isDisabled:!Listitem.isDisabled,isEdit:!Listitem.isEdit
            };
        }
        return obj;
    });
    updateList(newdta);
}

    return(
        <div className="list">
            {listarray.map((item,index)=>{
                return (
                <div className="listItem" key={index}>
                    {!item.isDisabled?(
                        <>
                        <input type="text" value={item.item}  disabled/> 
                        </>
                    ):(
                        <>
                            <input type="text" value={item.item} onChange={(e)=>{HandleUpdateChange(e,item)}} />
                        </>
                    )}
                    {
                        item.isEdit?(
                            <>
                             <button onClick={()=>{UpdateDatabase(item)}}>
                        confirm
                    </button>
                            </>
                        ):(
                            <>
                                
                    <button onClick={()=>{HandleUpdate(item)}}>
                        Update item
                    </button>
                            </>
                        )
                    }
                    
                    <button onClick={()=>HandleChange(item.ListId)}>
                        Delete item
                    </button>
                </div>)
            })}
        </div>
    );
}
export default List;