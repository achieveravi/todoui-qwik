import { component$, useStore } from '@builder.io/qwik';
import { createTask, deleteTask, editTask } from '~/services/task-service';
import { ITask } from '../todos/todos';

export default component$((props: { state: ITask; onDelete: any }) => {
    const task = props.state;
    const store = useStore({ isEditing: false, task });
    return (
        <div className='task-container'>
            <input
                type='checkbox'
                checked={task.completed}
                onChange$={() => {
                    store.task.completed = !store.task.completed;
                    editTask(store.task._id as string, store.task);
                }}
                disabled={!store.task._id}
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
                                : createTask(store.task).then(
                                      (data) => (store.task = data.data)
                                  );
                        }
                    }}
                >
                    {store.isEditing ? 'Done' : 'Edit'}
                </button>
                <button
                    onClick$={() =>
                        deleteTask(store.task._id as string).then((data) => {
                            props.onDelete(data.data);
                        })
                    }
                >
                    Delete
                </button>
            </div>
        </div>
    );
});
