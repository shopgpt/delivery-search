import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Company } from "../../api/interface";
import { fetchCompany } from "../../api";
import { StateContext, ActionContext } from "../../App";
import { useHistory } from "react-router-dom";

import styles from "./Main.module.scss";

export default function Main(): React.ReactElement {
  const state = useContext(StateContext);
  const dispatch = useContext(ActionContext);
  const [companys, setCompanys] = useState<Company[]>([]);
  const [companyCode, setCompanyCode] = useState("");
  const [parcelNumber, setParcelNumber] = useState("");
  const history = useHistory();

  // 택배사 코드 선택
  const onChangeOption = (e: any) => {
    const result = e.target.value;
    setCompanyCode(result);
  };

  // 운송장번호 입력
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const result = value.toString();
    setParcelNumber(result);
  };

  // 정보를 토대로 요청하는 함수
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (companyCode === "") return alert("택배사를 선택해 주세요.");
    if (parcelNumber === "") return alert("운송장 번호를 입력해 주세요.");
    if (companyCode !== "" && parcelNumber !== "") {
      dispatch({ type: "GET_CODE", payload: companyCode });
      dispatch({
        type: "GET_NUMBER",
        payload: parcelNumber.replace(/-/g, "").trim(),
      });
      history.push(`/detail?company=${companyCode}&id=${parcelNumber}`);
    }
  };

  // 택배사 코드 받아오는 API호출 함수
  const fetchCompanyData = async () => {
    try {
      const res = await fetchCompany();
      setCompanys(res.Company);
    } catch (e) {
      console.log(e);
    }
  };

  // 렌더링시 택배사 코드 호출
  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {}, [state]);

  if (!companys) {
    return <>"Loadding...";</>;
  }

  return (
    <div className={styles.Container}>
      <div>
        <h1>택배조회 서비스</h1>
      </div>
      <div className={styles.FormContainer}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <select value={companyCode} onChange={onChangeOption}>
            <option value="">택배사를 선택해주세요.</option>
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
