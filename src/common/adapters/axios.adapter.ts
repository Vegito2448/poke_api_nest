import { Injectable } from "@nestjs/common";
import axios from "axios";
import { HttpAdapter } from "../interfaces";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

	private axios = axios;

	async get<T>(url: string): Promise<T> {
		try {
			const { data } = await this.axios.get<T>(url);
			return data;
		} catch (error) {
			throw new Error('This is an error - Check logs', error);
		}
	}
}



