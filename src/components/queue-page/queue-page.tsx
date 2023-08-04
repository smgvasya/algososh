import { useState, ChangeEvent, FormEvent, useMemo, useEffect } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SUPER_SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/index";
import { Queue } from "./Queue";

type QueueType = {
  value: string;
  state: ElementStates;
  head?: string | React.ReactElement;
  tail?: string | React.ReactElement;
};

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [queueState, setQueueState] = useState<(QueueType | null)[]>([]);
  const queue = useMemo(() => new Queue<QueueType>(7), []);

  const initialQueue = {
    value: "",
    state: ElementStates.Default,
  };

  const initialQueueCircles = useMemo(
    () => queue.getElements().fill(initialQueue),
    [queue]
  );

  useEffect(() => {
    setQueueState(initialQueueCircles);
  }, [initialQueueCircles]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const clear = () => {
    queue.clear();
    setQueueState([...queue.getElements()]);
  };

  const remove = async () => {
    setIsRemoving(true);
    const head = queue.getTail();
    const tail = queue.getHead();
    if (head === tail) {
      clear();
      setIsRemoving(false);
    } else {
      const top = queue.peak();
      top!.state = ElementStates.Changing;
      setQueueState([...queue.getElements()]);
      await delay(SUPER_SHORT_DELAY_IN_MS);
      queue.dequeue();
      setQueueState([...queue.getElements()]);

      setIsRemoving(false);
    }
  };

  const add = async (value: string) => {
    setIsAdding(true);
    const container = queue.getElements();
    const head = { value: value, state: ElementStates.Changing };
    queue.enqueue(head);
    setQueueState([...container]);
    await delay(SUPER_SHORT_DELAY_IN_MS);
    const element = container[queue.getTail()];
    element!.state = ElementStates.Default;
    setQueueState([...container]);

    setIsAdding(false);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    add(value);
    setValue("");
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.control}>
            <Input
              placeholder="Введите текст"
              maxLength={4}
              isLimitText={true}
              value={value}
              onChange={onChange}
            />
            <Button
              text="Добавить"
              type="submit"
              isLoader={isAdding}
              disabled={!value || queue.length === 7}
            />
            <Button
              text="Удалить"
              type="submit"
              isLoader={isRemoving}
              onClick={remove}
              disabled={queue.isEmpty()}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            onClick={clear}
            disabled={queue.isEmpty()}
          />
        </div>
      </form>

      <ul className={styles.container_result}>
        {queueState?.map((item, index) => (
          <li key={index} className={styles.circles}>
            <Circle
              letter={item?.value || ""}
              index={index}
              state={item?.state}
              head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
              tail={index === queue.getTail() && !queue.isEmpty() ? "tail" : ""}
            ></Circle>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
