import { Trash } from 'phosphor-react';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  id: string;
  content: string;
  isTaskFinished: boolean;
  onChangeFinishedTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

function TaskCard({
  id,
  content,
  onDeleteTask,
  isTaskFinished,
  onChangeFinishedTask,
}: TaskCardProps) {
  // const [isChecked, setIsChecked] = useState(false);

  function handleDeleteTaskById(event: React.MouseEvent<HTMLButtonElement>) {
    event?.stopPropagation();
    onDeleteTask(id);
  }

  function handleChangeFinishedTask() {
    onChangeFinishedTask(id);
  }

  // function handleCheckbox() {
  //   setIsChecked(!isChecked);
  // }

  return (
    <div className={isTaskFinished ? styles.taskIsChecked : undefined}>
      <div className={styles.taskContainer}>
        <div className={styles.taskContent}>
          <input
            type='checkbox'
            title='Concluir Tarefa'
            aria-label='Concluir tarefa'
            className={styles.taskCheckbox}
            checked={isTaskFinished}
            onChange={handleChangeFinishedTask}
          />
          <span className={isTaskFinished ? styles.contentDecoration : undefined}>{content}</span>
        </div>
        <button onClick={handleDeleteTaskById} title='Deletar comentário'>
          <Trash size={24} color='white' />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
