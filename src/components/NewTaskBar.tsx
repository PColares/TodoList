import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';
import { PlusCircle } from 'phosphor-react';
import Clipboard from '../assets/Clipboard.png';
import styles from './NewTaskBar.module.css';
import Tasks from './Task';

function NewTaskBar() {
  const [taskContent, setTaskContent] = useState(['Primeira Tarefa']);
  const [newTask, setNewTask] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTaskContent([...taskContent, newTask]);
    setNewTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDeletedOne = taskContent.filter((task) => {
      return task !== taskToDelete;
    });

    setTaskContent(taskWithoutDeletedOne);
  }

  const isNewTaskEmpty = newTask.length === 0;
  const NumberOfTasksCreated = taskContent.length;
  const NumberOfTasksCompleted = taskContent.filter((task) => task.length);

  console.log(NumberOfTasksCompleted);

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
            <span className={styles.taskCompleted}>0 de {NumberOfTasksCreated}</span>
          </div>
        </div>
        {taskContent.length > 0 ? (
          <div>
            {taskContent.map((taskContent) => {
              return <Tasks key={taskContent} content={taskContent} onDeleteTask={deleteTask} />;
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

export default NewTaskBar;
