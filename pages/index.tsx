import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Fragment } from "react";

interface User {
	firstName: string;
	lastName: string;
	favouriteWord: string;
	id: string;
}

const getKeys = (data: any[]) => {
	let obj = data[0];

	if (!obj) return [];

	return Object.keys(obj);
};

const getHeaders = (data: string[]) =>
	data.map((key) => {
		let header = key.split(/(?=[A-Z])/).join(" ");
		return header.charAt(0).toUpperCase() + header.slice(1);
	});

const Home = <T extends {}>({ data = [] }: { data: T[] }) => {
	let keys = getKeys(data);
	const headers = getHeaders(keys);

	return (
		<div className="flex min-h-screen bg-gray-800 flex-col items-center justify-start py-2">
			<Head>
				<title>Any JSON CRUD</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container h-full flex flex-col items-center justify-start border">
				<h1 className="text-4xl text-white font-bold">Any JSON CRUD</h1>
				<div
					style={{
						gridTemplateColumns: `repeat(${keys.length}, minmax(200px, 1fr))`,
					}}
					className="grid text-white w-full border h-full overflow-auto"
				>
					{headers.map((header, i) => (
						<p key={i} className="font-bold border text-center">
							{header}
						</p>
					))}

					{data.map((item, i) => (
						<Fragment key={i}>
							{keys.map((key, j) => (
								<p key={j} className="border text-center">
									{/* @ts-ignore   */}
									{item[key]}
									{/* TODO:fix this */}
								</p>
							))}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
	const API_URL = "https://622386e63af069a0f9a47530.mockapi.io/api";
	let users = [];

	try {
		const data = await axios.get(`${API_URL}/users`);
		users = data.data;
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			data: JSON.parse(JSON.stringify(users)),
		},
	};
};
