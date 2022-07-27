import { PlusCircle } from 'phosphor-react';
import Clipboard from '../assets/Clipboard.png';
import styles from './NewTaskBar.module.css';

function NewTaskBar() {
  return (
    <div className={styles.main}>
      <div className={styles.newTask}>
        <input type='text' placeholder='Adicione uma nova tarefa' />
        <button>
          Criar <PlusCircle size={16} color='#e4dddd' weight='bold' />
        </button>
      </div>
      <section className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <span>Tarefas criadas</span>
            <span className={styles.taskCounter}>0</span>
          </div>
          <div className={styles.infoContainer}>
            <span>Concluídas</span>
            <span className={styles.taskCounter}>0</span>
          </div>
        </div>
        <div className={styles.empty}>
          <img src={Clipboard} alt='clipboard' />
          <div className={styles.emptyText}>
            <h4>Você ainda não tem tarefas cadastradas</h4>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewTaskBar;
