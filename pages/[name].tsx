import { useRouter } from "next/router";

const NamePage = () => {
	const router = useRouter();
	const { name } = router.query;

	return <div className="text-7xl">{name}</div>;
};

export default NamePage;
