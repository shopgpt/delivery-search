import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Company } from "../../api/interface";
import { fetchCompany } from "../../api";

import { StateContext, ActionContext } from "../../App";

import styles from "./Main.module.scss";

export default function Main(): React.ReactElement {
  const state = useContext(StateContext);
  const dispatch = useContext(ActionContext);
  const [companys, setCompanys] = useState<Company[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const result = value.toString();
    dispatch({ type: "GET_NUMBER", paylode: result });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const onChangeOption = (e: any) => {
    const result = e.target.value;
    dispatch({ type: "GET_CODE", paylode: result });
  };

  const fetchCompanyData = async () => {
    try {
      const res = await fetchCompany();
      setCompanys(res.Company);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className={styles.Container}>
      <div>
        <h1>택 배 조 회</h1>
      </div>
      <div className={styles.FormContainer}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <select value={state.code} onChange={onChangeOption}>
            <option>선택해주세요</option>
            {companys.map((item) => {
              return (
                <option key={item.Code} value={item.Code}>
                  {item.Name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="운송장 번호를 입력해 주세요."
            onChange={(e) => {
              onChange(e);
            }}
          />
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
  );
}
