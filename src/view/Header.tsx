import styles from "./index.module.scss"

export const Header = () => {
  return (
    <div className={styles.headerRow}>
      <div>№</div>
      <div>Тип</div>
      <div>Дата установки</div>
      <div>Автоматический</div>
      <div>Текущие показания</div>
      <div>Адрес</div>
      <div>Примечание</div>
    </div>
  )
}