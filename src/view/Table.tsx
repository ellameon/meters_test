import { observer } from "mobx-react-lite";
import styles from "./index.module.scss"
import { toJS } from 'mobx'
import { MetersStore } from "../store";
import React, { useState } from "react";
import { Header } from "./Header";
import { Row } from "./Row";
import { Meter } from "../types";

type Props = {
  refetchMeters: () => void
  setOffset: React.Dispatch<React.SetStateAction<number>>
  list: Meter[]
}

export const Table = observer(function Table(
  {
    refetchMeters,
    setOffset,
    list
  }: Props) {

  const tableData = {nodes: Array.isArray(list) ? list : []};

  function fillArrayWithNumbers(end: number): number[] {
    const result: number[] = [];

    for (let i = 1; i <= end; i++) {
      result.push(i)
    }

    return result;
  }

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: toJS(MetersStore.count) / 20,
    pages: fillArrayWithNumbers(toJS(MetersStore.count) / 20)
  })

  function onPaginationChange(elem: number) {
    setPagination({
      ...pagination,
      page: elem,
    })

    setOffset(elem * 20)
    setTimeout(() => {
      refetchMeters()
    }, 50)
  }


  return (
    <div className={styles.tableClass}>
      <Header/>
      {tableData.nodes &&
        <div className={styles.content}>
          {tableData.nodes.map(el => (
            <Row item={el} key={el.id} refetch={refetchMeters}/>
          ))}
        </div>
      }
      {pagination.pages.length > 0 && <div className={styles.footer}>
        <span>
          {pagination.pages.slice(pagination.page > 1 ? pagination.page - 2 : pagination.page - 1, pagination.page + 2).map((elem) => (
            <button
              key={elem}
              type="button"
              className={styles.paginationButton}
              style={{
                background: pagination.page === elem ? "#F2F5F8" : "white",
              }}
              onClick={() => onPaginationChange(elem)}
            >
              {elem}
            </button>
          ))}
        </span>
        <button
          type="button"
          className={styles.paginationButton}
          style={{
            background: "white",
          }}
        >
          {"..."}
        </button>
        <span>
          {pagination.pages.slice(-3).map((elem) => (
            <button
              key={elem}
              type="button"
              className={styles.paginationButton}
              style={{
                background: pagination.page === elem ? "#F2F5F8" : "white",
              }}
              onClick={() => onPaginationChange(elem)}
            >
              {elem}
            </button>
          ))}
        </span>
      </div>}
    </div>
  )
})