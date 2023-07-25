import { useState, SyntheticEvent, ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../utils/constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const reverse = (str: string | number) => {
  //   const splitStr = str.toString().split("");
  //   return splitStr.reverse();
  // };

  const reverseStr = () => {
    setIsLoading(true);
    const arr = value.toString().split("");
    
    let start = 0;
    let end = arr.length - 1;
    const mid = Math.floor((end - start) / 2 + start)

    while(start < end){
      
    }
  }
  
 //функция для перестановки символов и замены цвета circle
const swap = async (
  arr: { letter: string; color: ElementStates }[],
  firstIndex: number,
  secondIndex: number,
  color: ElementStates
) => {
  const temp = arr[firstIndex];
  //изменяем цвет circle, с которыми производим действие
  arr[firstIndex].color = color;
  arr[secondIndex].color = color;
  //пауза для визуализации переключения цвета circle
  await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  if (firstIndex <= secondIndex) {
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  }
  arr[firstIndex].color = ElementStates.Modified;
  arr[secondIndex].color = ElementStates.Modified;
  return arr;
};




  const onChange = (evt: ChangeEvent<HTMLInputElement>)=> {
    setValue(evt.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          maxLength={11}
          isLimitText={true}
          value={value}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          onClick={reverseStr}
          //isLoader={isLoading}
          disabled = {value.length === 0 ? true : false}
        />
      </form>
    </SolutionLayout>
  );
};
