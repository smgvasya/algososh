import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../utils/constants/delays";
import { ElementStates } from "../../types/element-states";
import { StrReversType } from "../../types/types";
import { swap, delay } from "../../utils/index";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reverse, setReverse] = useState<StrReversType[]>([]);

  const reverseStr = async (str: string) => {
    setIsLoading(true);
    const arr = str
      .split("")
      .map((item) => ({ item, state: ElementStates.Default }));
    const { length } = arr;

    let start = 0;
    let end = length - 1;
    setReverse([...arr]);

    while (start <= end) {
      await delay(DELAY_IN_MS);

      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setReverse([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      swap(arr, start, end);

      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
      setReverse([...arr]);
      start++;
      end--;
    }
    setIsLoading(false);
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    reverseStr(value);
    setValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={value}
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
          <li className={styles.circles}>
            {reverse.map((item) => (
              <Circle letter={item.item} state={item.state}></Circle>
            ))}
          </li>
        </ul>
      )}
    </SolutionLayout>
  );
};
