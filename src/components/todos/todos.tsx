import { component$, useServerMount$, useStore } from '@builder.io/qwik';
import { getTasks } from '~/services/task-service';
import Task from '../task/task';
export interface ITask {
    title: string;
    completed: boolean;
    _id?: string;
}

interface IState {
    tasks: ITask[];
}

export default component$(() => {
    const store = useStore<IState>({
        tasks: [],
    });

    useServerMount$(async () => {
        store.tasks = (await getTasks()).data;
    });
    return (
        <>
            <h1>Welcom to Todos</h1>
            {store.tasks.map((task) => (
                <Task state={task} />
            ))}
            <button
                onClick$={() =>
                    (store.tasks = [
                        ...store.tasks,
                        { title: '', completed: false },
                    ])
                }
            >
                Add
            </button>
        </>
    );
});
