import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { delay } from "../../utils/index";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(evt.target.value));
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
    fibonacciRender(value as number);
    setValue(0);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите число"
          max={19}
          isLimitText={true}
          value={value}
          onChange={onChange}
          type="number"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!value}
        />
      </form>
      {fibonacci && (
        <ul className={styles.container}>
          {fibonacci.map((item, index) => (
            <li className={styles.circles} key={index}>
              <Circle letter={item} index={index}></Circle>
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
