import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { ElementStates } from "../../types/element-states";
import { StrReversType } from "../../types/types";
import { swap, delay } from "../../utils/index";


export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<number[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(evt.target.value));
  };

  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          placeholder = "Введите число"
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
    </SolutionLayout>
  );
};
