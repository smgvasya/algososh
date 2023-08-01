import { useState, ChangeEvent, FormEvent, useMemo } from "react";
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
  value: number | string;
  state: ElementStates;
};

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [stackState, setStackState] = useState<QueueType[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const stack = useMemo(() => new Queue<QueueType>(), []);

  const clear = () => {
    stack.clear();
    setStackState([]);
  };

  const remove = async () => {
    setIsRemoving(true);
    const top = stack.peak();
    top!.state = ElementStates.Changing;
    await delay(SUPER_SHORT_DELAY_IN_MS);
    stack.pop();
    setStackState([...stack.getElements()]);
    setIsRemoving(false);
  };

  const add = async (value: string) => {
    setIsAdding(true);
    const head = { value: value, state: ElementStates.Changing };
    stack.push(head);
    setStackState([...stack.getElements()]);
    await delay(SUPER_SHORT_DELAY_IN_MS);
    const top = stack.peak();
    top!.state = ElementStates.Default;
    setStackState([...stack.getElements()]);
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
              disabled={!value}
            />
            <Button
              text="Удалить"
              type="submit"
              isLoader={isRemoving}
              onClick={remove}
              disabled={!stackState.length}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            onClick={clear}
            disabled={!stackState.length}
          />
        </div>
      </form>
      {stackState && (
        <ul className={styles.container_result}>
          {stackState?.map((item, index) => (
            <li key={index} className={styles.circles}>
              <Circle
                letter={item.value || ""}
                index={index}
                state={item.state}
                head={index === stack.size() - 1 && "top"}
              ></Circle>
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
