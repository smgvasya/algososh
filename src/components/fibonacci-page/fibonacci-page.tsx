import React from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          placeholder = "Введите число"
          max={19}
          isLimitText={true}
          //value={}
          //onChange={}
          type="number"
        />
        <Button
          text="Развернуть"
          type="submit"
          //isLoader={isLoading}
          disabled
        />
      </form>
    </SolutionLayout>
  );
};
