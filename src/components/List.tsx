import { List } from "../lib/types"
import { Button } from './Button'

interface ListProps {
    List: Array<List>;
    markInProgress: Function;
    deleteItem: Function;
    markAsDone: Function
    swapDivs: Function;
}

export const ListComponent = (props: ListProps) => {
    const list = props.List
    const { deleteItem, markAsDone, markInProgress, swapDivs } = props
    
    return (
        <>
            {list.length !== 0 ? 
            <>
                <h3>Incomplete</h3>
                {list.map((item: List, o: number) => {
                    if (!item.isCompleted && !item.isInProgress) {
                        return (
                            <div className="item" key={o}>
                                <div className="item-name">
                                    <label>{item.name}</label>
                                    <p>{item.emoji} {item.category}</p>
                                </div>
                                <div className="item-buttons">
                                    <Button theme="lightgreen" text="Done" onClick={(() => markAsDone(item.id))} />
                                    <Button theme="yellow" text="In Progress" onClick={(() => markInProgress(item.id))}/>
                                    <Button theme="red" text="Delete" onClick={(() => deleteItem(item.id))}/>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                <h3>In Progress</h3>
                {list.map((item: List, o: number) => {
                    if (item.isInProgress) {
                        return (
                            <div className="item" key={o}>
                                <div className="item-name">
                                    <label>{item.name}</label>
                                    <p>{item.emoji} {item.category}</p>
                                </div>
                                <div className="item-buttons">
                                    <Button theme="lightgreen" text="Done" onClick={(() => markAsDone(item.id))}/>
                                    <Button theme="red" text="Delete" onClick={(() => deleteItem(item.id))}/>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
                <h3>Complete</h3>
                {list.map((item: List, o: number): React.ReactNode => {
                    if (item.isCompleted) {
                        return (
                            <div className="item" key={o}>
                                <div className="item-name">
                                    <label>{item.name}</label>
                                    <p>{item.emoji} {item.category}</p>
                                </div>
                                <div className="item-buttons">
                                    <Button theme="yellow" text="In Progress" onClick={(() => markInProgress(item.id))}/>
                                    <Button theme="red" text="Delete" onClick={(() => deleteItem(item.id))}/>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </> : 
            <>
                <h2>Nothing to see here!</h2>
                <h3>Create a new To-Do!</h3>
                <div className="button-div" style={{ width: '60%' }}>
                    <h3 className="button-h3" style={{ backgroundColor: 'rgb(200, 0, 0)' }} onClick={(() => swapDivs())}>Create new To-Do</h3>
                </div>
            </>}
            </>
    )
}