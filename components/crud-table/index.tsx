import { Fragment } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const getKeys = (data: any[]) => {
	let obj = data[0];

	if (!obj) return [];

	return Object.keys(obj).filter(Boolean);
};

const getHeaders = (data: string[]) =>
	data.map(key => {
		let header = key.split(/(?=[A-Z])/).join(' ');
		return header.charAt(0).toUpperCase() + header.slice(1);
	});

const Table = <T extends {}>({ data = [] }: { data: T[] }) => {
	let keys = getKeys(data);
	const headers = getHeaders(keys as string[]);

	return (
		<div className="container h-full flex flex-col items-center justify-start border">
			<h1 className="text-4xl text-white font-bold py-2">Any JSON CRUD</h1>
			<div
				style={{
					gridTemplateColumns: `repeat(${keys.length + 1}, minmax(200px, 1fr))`,
				}}
				className="grid text-white w-full border h-full overflow-auto"
			>
				{headers.map((header, i) => (
					<p key={i} className="font-bold border text-center sticky">
						{header}
					</p>
				))}

				<p className="font-bold border text-center sticky">Action</p>

				{data.map((item, i) => (
					<Fragment key={i}>
						{keys.map((key, j) => (
							<p
								key={j}
								className="border text-center px-4 py-2 flex items-center justify-center"
							>
								{/* @ts-ignore   */}
								{typeof item[key] === 'object' ? (
									<Table data={[item[key]]} />
								) : (
									item[key]
								)}
								{/* TODO:fix this */}{' '}
							</p>
						))}
						<p className="border text-center px-4 py-2 flex items-center justify-evenly">
							<AiFillEdit className="text-2xl" />
							<AiFillDelete className="text-2xl" />
						</p>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default Table;
