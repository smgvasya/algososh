import { useState, useEffect, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../utils/constants/delays";
import { delay, randomArr, swap, swapIndexState } from "../../utils/index";

type SortType = {
  value: number;
  state: ElementStates;
};

const sorting = {
  select: "select",
  bubble: "bubble",
};

export const SortingPage: React.FC = () => {
  const [sortMethod, setSortMethod] = useState(sorting.bubble);
  const [sort, setSort] = useState<SortType[]>([]);

  const [isSorting, setIsSorting] = useState<boolean>(false);

  const minLen = 3;
  const maxLen = 17;
  const maxNum = 100;

  const newArray = () => {
    setSort(randomArr(minLen, maxLen, maxNum));
  };

  useEffect(() => {
    setSort(randomArr(minLen, maxLen, maxNum));
  }, []);

  const bubbleSort = async (
    arr: SortType[],
    direction: Direction,
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    setIsSorting(true);
    const { length } = arr;
    if (arr.length === 0) {
      return arr;
    }
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        swapIndexState([arr[j], arr[j + 1]], ElementStates.Changing);
        setSort([...arr]);
        await delay(DELAY_IN_MS);
        if (
          direction === Direction.Ascending
            ? arr[j].value > arr[j + 1].value
            : arr[j].value < arr[j + 1].value
        ) {
          swap(arr, j, j + 1);
        }
        swapIndexState([arr[j], arr[j + 1]], ElementStates.Default);
        setSort([...arr]);
      }
      swapIndexState([arr[length - i - 1]], ElementStates.Modified);
      setSort([...arr]);
    }
    setIsSorting(false);
  };

  const selectionSort = async (
    arr: SortType[],
    direction: Direction,
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    setIsSorting(true);
    const { length } = arr;
    if (length === 0) {
      return arr;
    }
    for (let i = 0; i < length; i += 1) {
      let minInd = i;
      swapIndexState([arr[minInd]], ElementStates.Changing);

      for (let j = i + 1; j < length; j += 1) {
        swapIndexState([arr[j]], ElementStates.Changing);

        setSort([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          direction === Direction.Ascending
            ? arr[j].value < arr[minInd].value
            : arr[j].value > arr[minInd].value
        ) {
          minInd = j;
          swapIndexState([arr[j]], ElementStates.Changing);
          if (minInd !== i) {
            swapIndexState([arr[minInd]], ElementStates.Default);
          }
        }
        if (j !== minInd) {
          swapIndexState([arr[j]], ElementStates.Default);
        }
        setSort([...arr]);
      }
      swap(arr, i, minInd);
      swapIndexState([arr[minInd]], ElementStates.Default);
      swapIndexState([arr[i]], ElementStates.Modified);
      setSort([...arr]);
    }
    setIsSorting(false);
  };

  const asc = (evt: MouseEvent<HTMLButtonElement>) => {
    if (sortMethod === sorting.bubble) {
      bubbleSort(sort, Direction.Ascending, evt);
    }
    if (sortMethod === sorting.select) {
      selectionSort(sort, Direction.Ascending, evt);
    }
  };

  const desc = (evt: MouseEvent<HTMLButtonElement>) => {
    if (sortMethod === sorting.bubble) {
      bubbleSort(sort, Direction.Descending, evt);
    }
    if (sortMethod === sorting.select) {
      selectionSort(sort, Direction.Descending, evt);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          onChange={(event) =>
            setSortMethod((event.target as HTMLInputElement).name)
          }
          checked={sortMethod === sorting.select}
          name="select"
          label="Выбор"
          extraClass="pr-20"
          disabled={isSorting}
        />
        <RadioInput
          onChange={(event) =>
            setSortMethod((event.target as HTMLInputElement).name)
          }
          checked={sortMethod === sorting.bubble}
          label="Пузырёк"
          extraClass="pr-25"
          name="bubble"
          disabled={isSorting}
        />
        <Button
          onClick={(evt) => asc(evt)}
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={`${styles.button} mr-6`}
          isLoader={isSorting}
        />
        <Button
          onClick={(evt) => desc(evt)}
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={`${styles.button} mr-40`}
          isLoader={isSorting}
        />
        <Button
          onClick={newArray}
          text="Новый массив"
          extraClass={styles.button}
          disabled={isSorting}
        />
      </form>
      <ul className={styles.columns}>
        {sort &&
          sort.map((item, index) => (
            <li key={index}>
              <Column index={item.value} state={item.state} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
