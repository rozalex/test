import React, {useEffect, useState} from 'react';
import uuid from 'react-uuid';
import {Input, Button, Icon, Checkbox} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import styles from '../style/style.module.scss';

export const Tasks = props => {
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [taskDetails, setTaskDetails] = useState("");

    let lsUsernames = localStorage.getItem("appUsernames");
    lsUsernames = lsUsernames ? JSON.parse(lsUsernames) : [];
    const [userNames] = useState(lsUsernames);

    useEffect(() => {
        let data = localStorage.getItem("appdata");
        let lsCheckedItems = localStorage.getItem("checkedItems");
        
        if (data) {
            data = JSON.parse(data);
            lsCheckedItems = JSON.parse(lsCheckedItems);

            setCheckedItems(lsCheckedItems);
            setData(data);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("appdata", JSON.stringify(data));
    },[data]);

    useEffect(() => {
        localStorage.setItem("appUsernames", JSON.stringify(userNames));
    },[userNames]);

    useEffect(() => {
        localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    },[checkedItems]);

    const handleChange = (name, checked) => {
        setCheckedItems({...checkedItems, [name]: checked});
    }

    const addTask = () => {
        const newData = {
            title: taskDetails, 
            completed: false,
            id: uuid()
        }
        setData([...data, newData]);
        setTaskDetails("");
    }
    
    const changeTaskDetails = (e) => {
        setTaskDetails(e.target.value);
    }

    const remove = (itetmId) => {
        setData([...data.filter(item => item.id !== itetmId)]);
    }

    return ( 
        <div className={styles.tasksWrapper}>
            <div className={styles.addSection}>
                <Input className={styles.newItemInput} onChange={changeTaskDetails} value={taskDetails} placeholder='New Task' />
                <Button positive onClick={addTask}>Save</Button>
            </div>
            <div className={styles.overflowContainer}>
                <div className={styles.taskItems}>
                    {data.map((item) => {
                        return (
                            <div key={item.id} className={ `${styles.card} ${checkedItems[item.id] && styles.checkedCard}`}>
                                <div className={styles.cardActions}>
                                    <Icon onClick={() => remove(item.id)} className={styles.actionIcon} name='trash' size='small' />
                                </div>
                                <div onClick={() => handleChange(item.id, !checkedItems[item.id])} className={styles.textContainer}>
                                    <Checkbox label={item.title} className={styles.cardCheckbox} name={item.id} checked={checkedItems[item.id]} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}