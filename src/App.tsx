import './styles/app.scss'
import { useState, useEffect } from 'react'
import { List, listData } from './lib/types'
import { ListComponent, CreateForm } from './components'
import { listDataObject } from './data/list'

const App = () => {

    const [date, setDate] = useState<string>('')
    const [listData, setListData] = useState<listData>({
        completed: 0,
        uncompleted: 0,
        inProgress: 0
    })
    const [mode, setMode] = useState<boolean>(true)
    const [list, setList] = useState<Array<List>>()

    useEffect(() => {
        setTodaysDate()
        initializeLists()
        setListDataOnOpen()
    }, [])

    const setTodaysDate = () => {
        const date = new Date()

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        setDate(`${monthNames[month]}, ${day} ${year}`)
    }

    const setListDataOnOpen = () => {
        let listArray: List[] = JSON.parse(localStorage.getItem('list') as string);

        let completedArrayNumber: number = 0
        let uncompletedArrayNumber: number = 0
        let inProgressArrayNumber: number = 0
        
        if (!listArray) {
            return console.log(listArray);
        }

        for (const item of listArray) {
            if (item.isInProgress) {
                inProgressArrayNumber++
            } else if (!item.isCompleted) {
                uncompletedArrayNumber++
            } else if (item.isCompleted) {
                completedArrayNumber++
            }
        }

        setListData({ completed: completedArrayNumber, uncompleted: uncompletedArrayNumber, inProgress: inProgressArrayNumber })
    }

    const markInProgress = (id: number) => {
        if (!list) {
            return;
        }

        const array = list!.find(item => item.id === id)!;
        array.isInProgress = true;
        array.isCompleted = false;

        setListDataOnOpen()
        saveDataToStorage()
    }

    const deleteItem = (id: number) => {
        if (!list) {
            return;
        }

        const index = list!.findIndex(item => item.id === id);
        list.splice(index, 1)
        
        setListDataOnOpen()
        saveDataToStorage()
    }

    const markAsDone = (id: number) => {
        if (!list) {
            return;
        }

        const array = list!.find(item => item.id === id)!;
        array.isInProgress = false;
        array.isCompleted = true;

        setListDataOnOpen()
        saveDataToStorage()
    }

    const swapDivs = () => {
        if (mode) {
            window.document.getElementById("list")!.style.left = "-100%"
            window.document.getElementById("create-form")!.style.left = "0"
            setMode(false)
        } else {
            window.document.getElementById("list")!.style.left = "0"
            window.document.getElementById("create-form")!.style.left = "100%"
            setMode(true)
        }
    }

    const createForm = (p: List) => {
        if (!list) {
            return
        }

        const lastObject = list.pop();
        let lastNum
        
        if (lastObject) {
            lastNum = lastObject.id;
        } else {
            lastNum = -1;
        }
        
        let newObject: List ={
            name: p.name,
            category: p.category,
            isCompleted: false,
            isInProgress: false,
            fullDescription: p.fullDescription,
            emoji: p.emoji,
            id: lastNum + 1
        }

        if (lastObject) {
            list.push(lastObject)
        }
        list.push(newObject)

        setListData((prevState) => {
            return {
                ...prevState,
                uncompleted: prevState.uncompleted + 1
            }
        })

        setListDataOnOpen()
        saveDataToStorage()
    }

    const initializeLists = () => {
        const lista = JSON.parse(localStorage.getItem('list') as string)

        if (lista) {
            setList(lista)
        } else {
            setList(listDataObject)
            localStorage.setItem('list', JSON.stringify(listDataObject))
        }
    }

    const saveDataToStorage = () => {
        if (!list) {
            return;
        }

        localStorage.setItem('list', JSON.stringify(list))
    }

    return (
        <>
            <>
                <div className="main">
                    <div className="card">
                        <h2>{date}</h2>
                        <p>{listData.completed} completed, {listData.uncompleted} uncompleted, {listData.inProgress} in progress</p>
                        <div className="divider">
                            <div></div>
                        </div>
                        <div className="list">
                            <div id="list">
                                {list ? <ListComponent 
                                    List={list} 
                                    markAsDone={markAsDone}
                                    deleteItem={deleteItem}
                                    markInProgress={markInProgress}  
                                    swapDivs={swapDivs}                  
                                /> : <></>}
                            </div> 
                            <div id="create-form">
                                <CreateForm createFunction={createForm} swapDivs={swapDivs}/>
                            </div>
                        </div>
                        <div className="button-div">
                            <h3 className="button-h3" onClick={swapDivs}>{mode ? "Add new to-do!" : "Close"}</h3>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default App;