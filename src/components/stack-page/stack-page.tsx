import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/index";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const fibonacciCalc = (index: number): number => {
    if (index < 0) {
      throw new Error("число не может быть меньше нуля");
    }
    if (index === 0) {
      return 0;
    }
    if (index === 1) {
      return 1;
    }
    return fibonacciCalc(index - 1) + fibonacciCalc(index - 2);
  };

  const fibonacciRender = async (index: number) => {
    setIsLoading(true);
    const arr: number[] = [];
    for (let i = 1; i <= index + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arr.push(fibonacciCalc(i));
      setFibonacci([...arr]);
    }
    setIsLoading(false);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    fibonacciRender(Number(value));
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
              extraClass={styles.delete}
              //disabled={!value} // если длина массива стека не 0
            />
          </div>
          <Button
            text="Очистить"
            type="reset"
            isLoader={isLoading}
            //disabled={!value} // если длина массива стека не 0
          />
        </div>
      </form>
      {/* {fibonacci && (
        <ul className={styles.container_result}>
          {fibonacci.map((item, index) => (
            <li key={index} className={styles.circles}>
              <Circle letter={item} index={index}> head={head}</Circle> 
            </li>
          ))}
        </ul>
      )} */}
    </SolutionLayout>
  );
};
