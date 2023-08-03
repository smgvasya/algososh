import { useState, ChangeEvent, FormEvent, useMemo, useEffect } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { ElementStates } from "../../types/element-states";
import { SUPER_SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/index";

type QueueType = {
  value: string;
  state: ElementStates;
  head?: string | React.ReactElement;
  tail?: string | React.ReactElement;
};

type QueueInitType = { value: string; state: ElementStates };

export const SortingPage: React.FC = () => {
  // const [value, setValue] = useState<string>("");
  // const [isAdding, setIsAdding] = useState<boolean>(false);
  // const [isRemoving, setIsRemoving] = useState<boolean>(false);
  // const [queueState, setQueueState] = useState<(QueueType | null)[]>([]);
  // const queue = useMemo(() => new LinkedList<QueueType>(7), []);

  // const initialQueue: QueueInitType = {
  //   value: "",
  //   state: ElementStates.Default,
  // };

  // const initialQueueCircles = useMemo(
  //   () => queue.getElements().fill(initialQueue),
  //   [queue]
  // );

  // useEffect(() => {
  //   setQueueState(initialQueueCircles);
  // }, [initialQueueCircles]);

  // const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
  //   setValue(evt.target.value);
  // };

  // const clear = () => {
  //   queue.clear();
  //   setQueueState([...queue.getElements()]);
  // };

  // const remove = async () => {
  //   setIsRemoving(true);
  //   const head = queue.getTail();
  //   const tail = queue.getHead();
  //   if (head === tail) {
  //     clear();
  //     setIsRemoving(false);
  //   } else {
  //     const top = queue.peak();
  //     top!.state = ElementStates.Changing;
  //     setQueueState([...queue.getElements()]);
  //     await delay(SUPER_SHORT_DELAY_IN_MS);
  //     queue.dequeue();
  //     setQueueState([...queue.getElements()]);

  //     setIsRemoving(false);
  //   }
  // };

  // const add = async (value: string) => {
  //   setIsAdding(true);
  //   const container = queue.getElements();
  //   const head = { value: value, state: ElementStates.Changing };
  //   queue.enqueue(head);
  //   setQueueState([...container]);
  //   await delay(SUPER_SHORT_DELAY_IN_MS);
  //   const element = container[queue.getTail()];
  //   element!.state = ElementStates.Default;
  //   setQueueState([...container]);

  //   setIsAdding(false);
  // };

  // const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   add(value);
  //   setValue("");
  // };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          // onChange={}
          //checked={}
          label="Выбор"
          //disabled={}
          extraClass="pr-20"
        />
        <RadioInput
          // onChange={}
          // checked={}
          label="Пузырёк"
          // disabled={}
          extraClass="pr-25"
        />
        <Button
          //isLoader={}
          //onClick={}
          type="button"
          text="По возрастанию"
          sorting={Direction.Ascending}
          extraClass={`${styles.button} mr-6`}
        />
        <Button
          // isLoader={}
          // onClick={}
          type="button"
          text="По убыванию"
          sorting={Direction.Descending}
          extraClass={`${styles.button} mr-40`}
        />
        <Button
          // isLoader={}
          // onClick={}
          text="Новый массив"
          extraClass={styles.button}
        />
      </form>
      <ul className={styles.columns}>
        {/* {sort &&
            sort.map((item, index) => (
              <li key={index}>
                <Column index={item.value} state={item.state} />
              </li>
            ))} */}
      </ul>
    </SolutionLayout>
  );
};
