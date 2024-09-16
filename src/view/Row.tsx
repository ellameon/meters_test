import { Meter } from "../types";
import styles from "./index.module.scss"
import { ReactComponent as HVS } from "../style/assets/hvs.svg";
import { ReactComponent as GVS } from "../style/assets/gvs.svg";
import { ReactComponent as Trash } from "../style/assets/trash.svg";
import dayjs from "dayjs";
import { toJS } from "mobx";
import { AddressStore } from "../store";
import { memo, useState } from "react";
import { useDeleteMeter } from "../transport/service";

type Props = {
  item: Meter
  refetch: () => void
}

export const Row = memo((
  {
    item,
    refetch
  }: Props) => {
  const [hover, setHover] = useState(false)

  const addressArray = toJS(AddressStore.results)

  const {delete: deleteMeter} = useDeleteMeter({onSuccess: refetch})

  const onDelete = () => {
    deleteMeter(item.id)
  }

  return (
    <div className={styles.row} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div>
        {item.number}
      </div>
      <div>
        {Array.isArray(item._type) && item._type[0] === "ColdWaterAreaMeter" ? <HVS/> : <GVS/>}
        {Array.isArray(item._type) && item._type[0] === "ColdWaterAreaMeter" ? "ХВС" : "ГВС"}
      </div>
      <div>
        {dayjs(item.installation_date).isValid() ? dayjs(item.installation_date).format("DD.MM.YYYY") : ""}
      </div>
      <div>
        {item.is_automatic ? "Да" : "Нет"}
      </div>
      <div>
        {Array.isArray(item.initial_values) ? item.initial_values[0] : ""}
      </div>
      <div>
        {`${addressArray.find(el => el.id === item.area.id)?.house.address} ${addressArray.find(el => el.id === item.area.id)?.str_number_full}`}
      </div>
      <div>
        {item.description}
        {hover &&
          <div className={styles.trash} onClick={onDelete}>
            <Trash/>
          </div>
        }
      </div>
    </div>
  )
})