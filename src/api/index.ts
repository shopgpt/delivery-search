import axios, { AxiosResponse } from "axios";
import { GET_COMPANY, GET_TRACKING_INFO } from "./construct";
import { CompanyList } from "./interface";

export async function fetchCompany(): Promise<CompanyList> {
  const res = await axios.post(GET_COMPANY);
  return res.data;
}

export async function fetchTracking(
  code: string,
  invoice: string
): Promise<AxiosResponse<any>> {
  const res = await axios.get(`${GET_TRACKING_INFO}`, {
    params: {
      t_code: code,
      t_invoice: invoice,
    },
  });
  return res;
}
