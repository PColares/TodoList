import { Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';
interface TaskProps {
  content: string;
  onDeleteTask: (task: string) => void;
}

function Tasks({ content, onDeleteTask }: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleDeleteTask() {
    onDeleteTask(content);
  }

  function handleCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={isChecked ? styles.taskIsChecked : undefined}>
      <div className={styles.taskContainer}>
        <div className={styles.taskContent}>
          <input
            type='checkbox'
            className={styles.taskCheckbox}
            id='checkbox'
            checked={isChecked}
            onChange={handleCheckbox}
          />
          <span className={isChecked ? styles.contentDecoration : undefined}>{content}</span>
        </div>
        <button onClick={handleDeleteTask} title='Deletar comentário'>
          <Trash size={24} color='white' />
        </button>
      </div>
    </div>
  );
}

export default Tasks;
