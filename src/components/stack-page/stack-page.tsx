import { useState, ChangeEvent, FormEvent,  useMemo } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/index";
import { Stack } from "./Stack";

type CircleType = {
  value: number | string;
  state: ElementStates;
};

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stackState, setStackState] = useState<CircleType[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const stack  = useMemo(() => new Stack<CircleType>(), []);

  const clear = () => {
    stack.clear();
    setStackState([]);
  };

  const remove = async () => {
    setIsLoading(true);
    const top = stack.peak();
    top!.state = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackState([...stack.getElements()]);
    setIsLoading(false);
  };

  const add = async (value:string) => {
    setIsLoading(true);
    const head = {value: value, state: ElementStates.Changing}
    stack.push(head);
    setStackState([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    const top = stack.peak();
    top!.state = ElementStates.Default;
    setStackState([...stack.getElements()]);
    setIsLoading(false);
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    add(value);
    setValue("");
  };


  return (
    <SolutionLayout title="Стек">
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
              isLoader={isLoading}
              disabled={!value}
            />
            <Button
              text="Удалить"
              type="submit"
              isLoader={isLoading}
              onClick={remove}
              disabled={!stackState.length}
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={isLoading}
            onClick={clear}
            disabled={!stackState.length}
          />
        </div>
      </form>
      {stackState && (
        <ul className={styles.container_result}>
          {stackState?.map((item, index) => (
            <li key={index} className={styles.circles}>
              <Circle letter={item.value || ''} index={index}> state={item.state}  head={index === stack.size() - 1 ? "top" : null} </Circle> 
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>   

  );
};
