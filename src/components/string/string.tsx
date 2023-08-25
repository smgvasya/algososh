import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseStr } from "./utils";
import { StrReversType } from "../../types/types";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reverse, setReverse] = useState<StrReversType[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    await reverseStr(value, setReverse);
    setValue("");
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      reverseStr(value, setReverse);
    };
  }, []);

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={isLoading ? "" : value}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={value.length === 0 ? true : false}
        />
      </form>
      {reverse && (
        <ul className={styles.container}>
          {reverse.map((item, index) => (
            <li className={styles.circles} key={index}>
              <Circle letter={item.item} state={item.state}></Circle>
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
