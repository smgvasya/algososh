import {useState}from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {

  // const [string, setString] = useState<string>('');


  
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          maxLength={11}
          isLimitText={true}
          //value={}
          //onChange={}
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
