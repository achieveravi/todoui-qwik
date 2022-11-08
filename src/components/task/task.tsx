import { component$, useStore } from '@builder.io/qwik';
import { createTask, deleteTask, editTask } from '~/services/task-service';
import { debounce } from '~/utils/utility';
import { ITask } from '../todos/todos';

export default component$((props: { state: ITask }) => {
    const task = props.state;
    const store = useStore({ isEditing: false, task });
    return (
        <div className='task-container'>
            <input
                type='checkbox'
                checked={task.completed}
                onChange$={(event) => {
                    store.task.completed = !store.task.completed;
                    editTask(store.task._id as string, store.task);
                }}
            ></input>
            {store.isEditing ? (
                <input
                    name={store.task._id}
                    value={store.task.title}
                    onInput$={(event) => {
                        store.task.title = (
                            event.target as HTMLInputElement
                        ).value;
                    }}
                ></input>
            ) : (
                <label>{props.state.title}</label>
            )}
            <div>
                <button
                    onClick$={() => {
                        store.isEditing = !store.isEditing;
                        if (!store.isEditing) {
                            store.task._id
                                ? editTask(store.task._id, store.task)
                                      .then((data) =>
                                          console.log('Task Updated')
                                      )
                                      .catch((er) => console.log(er))
                                : createTask(store.task);
                        }
                    }}
                >
                    {store.isEditing ? 'Done' : 'Edit'}
                </button>
                <button onClick$={() => deleteTask(store.task._id as string)}>
                    Delete
                </button>
            </div>
        </div>
    );
});
