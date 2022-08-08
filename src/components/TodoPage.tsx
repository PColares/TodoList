import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Clipboard from '../assets/Clipboard.png';
import styles from './TodoPage.module.css';
import TaskCard from './TaskCard';
import NewTaskBar from './NewTaskBar';
import { PlusCircle } from 'phosphor-react';

type TaskProps = {
  id: string;
  task: string;
  isTaskFinished: boolean;
};

function TodoPage() {
  const [taskContent, setTaskContent] = useState<TaskProps[]>([]);
  const [newTask, setNewTask] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (newTask.trim() === '') return;

    const newTodo: TaskProps = {
      id: uuidv4(),
      task: newTask,
      isTaskFinished: false,
    };

    setTaskContent([...taskContent, newTodo]);
    setNewTask('');
  }

  function handleChangeFinishedTask(id: string) {
    const updateTaskWithSameId = taskContent.map((task) => {
      if (task.id === id) {
        return { ...task, isTaskFinished: !task.isTaskFinished };
      }
      return task;
    });

    setTaskContent(updateTaskWithSameId);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  function handleDeleteTaskById(taskIdToDelete: string) {
    const taskWithoutDeletedOne = taskContent.filter((task) => task.id !== taskIdToDelete);

    setTaskContent(taskWithoutDeletedOne);
  }

  const isNewTaskEmpty = newTask.length === 0;
  const NumberOfTasksCreated = taskContent.length;
  const NumberOfTasksCompleted = taskContent.filter((task) => task.isTaskFinished).length;

  return (
    <div className={styles.main}>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input
          type='text'
          name='newTask'
          value={newTask}
          placeholder='Adicione uma nova tarefa'
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button type='submit' disabled={isNewTaskEmpty}>
          Criar <PlusCircle size={16} color='#e4dddd' weight='bold' />
        </button>
      </form>
      <section className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <span>Tarefas criadas</span>
            <span className={styles.taskCounter}>{NumberOfTasksCreated}</span>
          </div>
          <div className={styles.infoContainer}>
            <span>Concluídas</span>
            <span className={styles.taskCompleted}>
              {NumberOfTasksCompleted} de {NumberOfTasksCreated}
            </span>
          </div>
        </div>
        {taskContent.length > 0 ? (
          <div>
            {taskContent.map((taskContent) => {
              return (
                <TaskCard
                  id={taskContent.id}
                  onChangeFinishedTask={handleChangeFinishedTask}
                  onDeleteTask={handleDeleteTaskById}
                  isTaskFinished={taskContent.isTaskFinished}
                  content={taskContent.task}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <img src={Clipboard} alt='clipboard' />
            <div className={styles.emptyText}>
              <h4>Você ainda não tem tarefas cadastradas</h4>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default TodoPage;
